const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotels');

// Lấy danh sách tất cả các khách sạn
router.get('/', async (req, res) => {
  try {
    const hotels = await hotelController.getHotels(); // Không cần tham số
    res.status(200).json({ success: true, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Lấy thông tin khách sạn theo ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await hotelController.getHotelById(req.params.id); // Truyền ID từ params
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Khách sạn không tồn tại' });
    }
    res.status(200).json({ success: true, data: hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Tạo khách sạn mới
router.post('/', async (req, res) => {
  try {
    const { name, address, contactNumber, email, rating } = req.body; // Lấy thông tin từ body
    const newHotel = await hotelController.createHotel(req,res); // Gọi hàm với đối số
    res.status(201).json({ success: true, data: newHotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cập nhật khách sạn
router.put('/:id', async (req, res) => {
  try {
    const updatedHotel = await hotelController.updateHotel(req.params.id, req.body); // Truyền ID và body
    if (!updatedHotel) {
      return res.status(404).json({ success: false, message: 'Khách sạn không tồn tại' });
    }
    res.status(200).json({ success: true, data: updatedHotel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Xóa khách sạn
router.delete('/:id', async (req, res) => {
  try {
    const deletedHotel = await hotelController.deleteHotel(req.params.id); // Truyền ID từ params
    if (!deletedHotel) {
      return res.status(404).json({ success: false, message: 'Khách sạn không tồn tại' });
    }
    res.status(200).json({ success: true, message: 'Khách sạn đã bị xóa!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
