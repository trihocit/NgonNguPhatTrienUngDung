var express = require('express');
var router = express.Router();
let userController = require('../controllers/users');
const { check_authentication } = require('../Utils/check_auth');

// Route đăng ký người dùng
router.post('/register', async function(req, res, next) {
  try {
      let body = req.body;
      
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
      next(error); // Xử lý lỗi thông qua middleware lỗi chung
  }
});

// Route đăng nhập
router.post('/login', async function(req, res, next) {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let result = await userController.checkLogin(username, password);
        res.status(200).send({
            success: true,
            data: result
        });
    } catch (error) {
        next(error); // Xử lý lỗi thông qua middleware lỗi chung
    }
});

// Route lấy thông tin người dùng hiện tại (yêu cầu đã đăng nhập)
router.get('/me', check_authentication, async function(req, res, next){
    try {
        // Trả về thông tin người dùng đã đăng nhập
        res.status(200).send({
            success: true,
            data: req.user
        });
    } catch (error) {
        next(error); // Xử lý lỗi nếu có
    }
});

module.exports = router;
