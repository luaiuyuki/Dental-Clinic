async function run() {
  try {
    const loginRes = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenDangNhap: 'admin', matKhau: '123456' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;

    const res1 = await fetch('http://localhost:5001/api/bacSi', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('bacSi Status:', res1.status, await res1.text());

    const res2 = await fetch('http://localhost:5001/api/caLamViec', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('caLamViec Status:', res2.status, await res2.text());
  } catch (err) {
    console.log('Error:', err.message);
  }
}
run();
