import { hashSync } from 'bcryptjs'
import { Router } from 'express'
import { verifyToken, verifyRole } from '../middleware/auth.js'
import db from '../db.js'
const router = Router()
router.use(verifyToken)
router.use(verifyRole(['admin']))
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT id, tenDangNhap, vaiTro, bacSiId, trangThai, createdAt FROM taiKhoan ORDER BY createdAt DESC').all()
  res.json(rows)
})
router.post('/', (req, res) => {
  const { tenDangNhap, matKhau, vaiTro, bacSiId } = req.body
  if (!tenDangNhap || !matKhau || !vaiTro) return res.status(400).json({ error: 'Thiếu Trường Bắt Buộc' })
  if (tenDangNhap.length < 3 || tenDangNhap.length > 20) return res.status(400).json({ error: 'Tên Đăng Nhập Phải Từ 3 Đến 20 Ký Tự' })
  if (!/^[a-zA-Z0-9_]+$/.test(tenDangNhap)) return res.status(400).json({ error: 'Tên Đăng Nhập Không Chứa Ký Tự Đặc Biệt Hay Khoảng Trắng' })
  if (matKhau.length < 6) return res.status(400).json({ error: 'Mật Khẩu Phải Có Tối Thiểu 6 Ký Tự' })
  const exists = db.prepare('SELECT id FROM taiKhoan WHERE tenDangNhap = ?').get(tenDangNhap)
  if (exists) return res.status(400).json({ error: 'Tên Đăng Nhập Đã Tồn Tại' })
  if (bacSiId) {
    const linked = db.prepare('SELECT id FROM taiKhoan WHERE bacSiId = ?').get(bacSiId)
    if (linked) return res.status(400).json({ error: 'Hồ Sơ Nhân Viên Này Đã Được Liên Kết Với Tài Khoản Khác' })
  }
  const hash = hashSync(matKhau, 10)
  const result = db.prepare('INSERT INTO taiKhoan (tenDangNhap, matKhau, vaiTro, bacSiId) VALUES (?, ?, ?, ?)').run(tenDangNhap, hash, vaiTro, bacSiId || null)
  res.json({ success: true, id: result.lastInsertRowid })
})
router.put('/:id', (req, res) => {
  const { tenDangNhap, matKhau, vaiTro, bacSiId, trangThai } = req.body
  
  if (!tenDangNhap || !vaiTro) return res.status(400).json({ error: 'Thiếu Trường Bắt Buộc' })
  if (tenDangNhap.length < 3 || tenDangNhap.length > 20) return res.status(400).json({ error: 'Tên Đăng Nhập Phải Từ 3 Đến 20 Ký Tự' })
  if (!/^[a-zA-Z0-9_]+$/.test(tenDangNhap)) return res.status(400).json({ error: 'Tên Đăng Nhập Không Chứa Ký Tự Đặc Biệt Hay Khoảng Trắng' })

  const existing = db.prepare('SELECT * FROM taiKhoan WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Tài Khoản Không Tồn Tại' })
  let newHash = existing.matKhau
  if (matKhau && matKhau.trim() !== '') {
    if (matKhau.length < 6) return res.status(400).json({ error: 'Mật Khẩu Phải Có Tối Thiểu 6 Ký Tự' })
    newHash = hashSync(matKhau, 10)
  }
  const checkDuplicate = db.prepare('SELECT id FROM taiKhoan WHERE tenDangNhap = ? AND id != ?').get(tenDangNhap, req.params.id)
  if (checkDuplicate) return res.status(400).json({ error: 'Tên Đăng Nhập Đã Tồn Tại' })
  if (bacSiId) {
    const linked = db.prepare('SELECT id FROM taiKhoan WHERE bacSiId = ? AND id != ?').get(bacSiId, req.params.id)
    if (linked) return res.status(400).json({ error: 'Hồ Sơ Nhân Viên Này Đã Được Liên Kết Với Tài Khoản Khác' })
  }
  db.prepare('UPDATE taiKhoan SET tenDangNhap=?, matKhau=?, vaiTro=?, bacSiId=?, trangThai=? WHERE id=?')
    .run(tenDangNhap, newHash, vaiTro, bacSiId || null, trangThai, req.params.id)
  res.json({ success: true })
})
router.delete('/:id', (req, res) => {
  if (req.params.id == req.user.id) return res.status(400).json({ error: 'Không Thể Vô Hiệu Hóa Tài Khoản Đang Đăng Nhập' })
  const target = db.prepare('SELECT tenDangNhap FROM taiKhoan WHERE id = ?').get(req.params.id)
  if (target?.tenDangNhap === 'admin') return res.status(403).json({ error: 'Không Thể Vô Hiệu Hóa Tài Khoản Admin' })
  db.prepare("UPDATE taiKhoan SET trangThai = 'ngungHoatDong' WHERE id = ?").run(req.params.id)
  res.json({ success: true })
})
export default router