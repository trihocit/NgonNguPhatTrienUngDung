
const Hotel = require('../models/hotels');

module.exports = {
  // Tạo khách sạn mới
  createHotel: async (req, res) => {
    try {
      const { name, address, contactNumber, email, rating } = req.body;

      // Kiểm tra thông tin đầu vào
      if (!name || !address || !contactNumber || !email || !rating) {
        return res.status(400).json({
          success: false,
          message: "Thông tin không đầy đủ",
        });
      }

      // Kiểm tra xem email có tồn tại trong hệ thống chưa
      const existingHotel = await Hotel.findOne({ email });
      if (existingHotel) {
        return res.status(400).json({
          success: false,
          message: "Email này đã được sử dụng cho khách sạn khác!",
        });
      }

      // Tạo mới khách sạn
      const newHotel = new Hotel({
        name,
        address,
        contactNumber,
        email,
        rating,
      });

      // Lưu khách sạn vào cơ sở dữ liệu
      await newHotel.save();

      // Trả về thông báo thành công
      return res.status(201).json({
        success: true,
        message: "Tạo khách sạn thành công!",
        data: newHotel,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  // lấy tát  cả khách sạn
  getHotels: async () => {
    try {
      const hotels = await Hotel.find();
      return hotels;
    } catch (error) {
      return error.message;
    }
  },

  // Lấy thông tin khách sạn theo ID
  getHotelById: async function (id) {
    try {
      const hotel = await Hotel.findById(id);
      if (!hotel) {
        throw new Error("Khách sạn không tồn tại!");
      }

      return {
        success: true,
        data: hotel,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Cập nhật thông tin khách sạn
  updateHotel: async function (id, hotelUpdate) {
    try {
      const hotel = await Hotel.findById(id);
      if (!hotel) {
        throw new Error("Khách sạn không tồn tại!");
      }

      const updatedHotel = await Hotel.findByIdAndUpdate(id, hotelUpdate, { new: true });

      return {
        success: true,
        message: "Cập nhật khách sạn thành công!",
        data: updatedHotel,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Xóa khách sạn
  deleteHotel: async function (id) {
    try {
      const deletedHotel = await Hotel.findByIdAndDelete(id);
      if (!deletedHotel) {
        throw new Error("Khách sạn không tồn tại!");
      }

      return {
        success: true,
        message: "Xóa khách sạn thành công!",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};
