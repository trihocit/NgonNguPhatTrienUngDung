const jwt = require('jsonwebtoken');
const constants = require('../Utils/constants');
const userController = require('../controllers/users');

function checkAuthAndRole(...roles) {
    return async function (req, res, next) {
        // Kiểm tra xem header Authorization có tồn tại không
        if (req.headers.authorization) {
            let tokenAuthorization = req.headers.authorization;
            
            // Kiểm tra token có đúng định dạng "Bearer token" không
            if (tokenAuthorization.startsWith("Bearer")) {
                let token = tokenAuthorization.split(" ")[1];
                
                try {
                    // Kiểm tra token
                    let verifiedToken = jwt.verify(token, constants.SECRET_KEY);
                    
                    if (verifiedToken) {
                        // Lấy thông tin người dùng từ token
                        let user = await userController.getUserById(verifiedToken.id);
                        
                        if (!user) {
                            return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });
                        }
                        
                        // Gán thông tin người dùng vào req.user
                        req.user = user;
                        
                        // Kiểm tra vai trò của người dùng
                        const userRole = req.user?.role;
                        if (!userRole || !roles.includes(userRole)) {
                            return res.status(403).json({ success: false, message: "Không có quyền truy cập" });
                        }

                        // Nếu tất cả các điều kiện đều hợp lệ, tiếp tục xử lý request
                        return next();
                    } else {
                        return res.status(401).json({ success: false, message: "Token không hợp lệ" });
                    }
                } catch (error) {
                    return res.status(401).json({ success: false, message: "Token không hợp lệ" });
                }
            } else {
                return res.status(400).json({ success: false, message: "Token không hợp lệ" });
            }
        } else {
            return res.status(401).json({ success: false, message: "Bạn chưa đăng nhập" });
        }
    };
}

module.exports = { checkAuthAndRole };
