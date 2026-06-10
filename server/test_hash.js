import bcrypt from 'bcryptjs';

const hash = '$2b$10$IXpj1j0J3NoVyIRLluLTdeyWpuqUrAqCW8y2BWT4mCGV1EkSSYIR.';
const common = ['admin', '123456', '12345678', '123456789', 'admin123', 'admin@123', 'password', '123'];

for (const p of common) {
    if (bcrypt.compareSync(p, hash)) {
        console.log('MATCHED:', p);
    }
}
