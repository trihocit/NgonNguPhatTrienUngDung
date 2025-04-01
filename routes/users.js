var express = require('express');
var router = express.Router();
let userSchema = require('../models/users');
let userController = require('../controllers/users');
let BuildQueries = require('../Utils/BuildQuery');
let { check_authentication } = require('../Utils/check_auth');
let jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Lấy danh sách người dùng
router.get('/', async function(req, res, next) {
  let queries = req.query;
  try {
    let users = await userSchema.find(BuildQueries.QueryUser(queries)).populate('role');
    res.status(200).send({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

// Lấy thông tin người dùng theo ID
router.get('/:id', async function(req, res, next) {
  try {
    let user = await userSchema.findById(req.params.id).populate('role');
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }
    res.status(200).send({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

// Đăng ký người dùng (không cần xác thực)
router.post('/register', async function(req, res, next) {
  try {
    let body = req.body;
    // Kiểm tra xem username và email có hợp lệ không
    if (!body.username || !body.password || !body.email) {
      return res.status(400).send({
        success: false,
        message: 'Username, password, and email are required.'
      });
    }

    // Kiểm tra xem username hoặc email đã tồn tại trong database chưa
    const existingUser = await userSchema.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: 'Username or email already exists.'
      });
    }

    // Kiểm tra và sử dụng mặc định 'User' nếu không có role
    let role = body.role || 'User';  // Nếu không có role, mặc định là 'User'

    let result = await userController.createUser(
      body.username,
      body.password,
      body.email,
      role
    );

    res.status(200).send({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);  // Đảm bảo xử lý lỗi đúng cách
  }
});

// Đăng nhập người dùng
router.post('/login', async function(req, res, next) {
  try {
    const { username, password } = req.body;

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await userSchema.findOne({ username });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role }, 
      'your_jwt_secret', 
      { expiresIn: '1h' } // Token hết hạn sau 1 giờ
    );

    // Trả về token cho người dùng
    res.status(200).send({
      success: true,
      message: 'Login successful',
      data: { token }
    });

  } catch (error) {
    next(error);
  }
});

// Cập nhật thông tin người dùng
router.put('/:id', async function(req, res, next) {
  try {
    let body = req.body;
    let user = await userSchema.findById(req.params.id).populate({
      path: "role",
      select: "roleName"
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }

    let allowField = [ "password", "email", "fullName", "avatarUrl"];
    for (const key of Object.keys(body)) {
      if (allowField.includes(key)) {
        user[key] = body[key];
      }
    }

    await user.save();
    res.status(200).send({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
