//hien thi thog bao
function hienThiThongBao(noiDung) {
  let ThongBao = document.getElementById(`thongbao`);
  ThongBao.innerHTML = noiDung;
}

//ham dang ky
function MINH(event) {
  event.preventDefault(); // Prevent form submission
  //lay du lieu trong form dang ky
  let username = document.getElementById(`user`).value;
  let password = document.getElementById(`pass`).value;
  let confirmPassword = document.getElementById(`confirmpass`).value;

  //kiem tra basic
  if (!username || !password || !confirmPassword) {
    hienThiThongBao(`Missing details, please fill it in!`);
    return;
  }

  if (password !== confirmPassword) {
    hienThiThongBao(`Password not indentical!`);
    return;
  }

  //lay danh sach ng dung (don gain nhat)
  let users = JSON.parse(localStorage.getItem(`users`) || `[]`);

  //kiem tra ten da ton tai
  let daTonTai = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      daTonTai = true;
      break;
    }
  }
  if (daTonTai) {
    hienThiThongBao(`User already exist!`);
    return;
  }
  //them ng dung moi
  users.push({ username: username, password: password });
  localStorage.setItem(`users`, JSON.stringify(users));

  hienThiThongBao(`Sign up successful!`);
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1500);
}

// Xử lý đăng nhập
function handleLogin(event) {
  event.preventDefault(); // Ngăn form submit mặc định
  
  // Lấy thông tin đăng nhập
  let username = document.getElementById('loginUser').value;
  let password = document.getElementById('loginPass').value;

  // Kiểm tra dữ liệu nhập
  if (!username || !password) {
    hienThiThongBao('Please enter both username and password!');
    return false;
  }

  // Lấy danh sách người dùng từ localStorage
  let users = JSON.parse(localStorage.getItem('users') || '[]');

  // Tìm người dùng
  let userFound = users.find(user => user.username === username && user.password === password);

  if (userFound) {
    // Đăng nhập thành công
    hienThiThongBao('Login successful!');
    // Lưu trạng thái đăng nhập
    localStorage.setItem('currentUser', username);
    // Chuyển hướng đến trang chính sau 1.5 giây
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  } else {
    // Đăng nhập thất bại
    hienThiThongBao('Invalid username or password!');
  }
  return false;
}
