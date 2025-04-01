const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookings");

// Tạo đặt phòng
router.post("/", async (req, res) => {
    try {
        const { userId, roomId, checkInDate, checkOutDate } = req.body;
        const newBooking = await bookingController.createBooking(userId, roomId, checkInDate, checkOutDate);
        res.status(201).json({ success: true, data: newBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Lấy tất cả đặt phòng của người dùng
router.get("/", async (req, res) => {
    try {
        const bookings = await bookingController.getUserBookings(req.params.userId);
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Hủy đặt phòng
router.delete("/:id", async (req, res) => {
    try {
        const canceledBooking = await bookingController.cancelBooking(req.params.bookingId);
        res.status(200).json({ success: true, message: "Đặt phòng đã bị hủy", data: canceledBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Cập nhật thông tin đặt phòng theo ID
router.put("/:id", async (req, res) => {
    try {
        const { bookingId } = req.params;
        const updateData = req.body;

        // Cập nhật thông tin đặt phòng
        const updatedBooking = await bookingController.updateBooking(bookingId, updateData);
        res.status(200).json({ success: true, data: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
