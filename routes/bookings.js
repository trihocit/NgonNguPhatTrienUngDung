const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookings");

// 🏨 Lấy danh sách tất cả đặt phòng
router.get("/", async (req, res) => {
    try {
        const userId = req.query.userId; // Lấy userId từ query params
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }
        const bookings = await bookingController.getUserBookings(userId);
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 🏨 Tạo đặt phòng mới
router.post("/", async (req, res) => {
    try {
        const { userId, roomId, checkInDate, checkOutDate } = req.body;
        const newBooking = await bookingController.createBooking(userId, roomId, checkInDate, checkOutDate);
        res.status(201).json({ success: true, data: newBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 📋 Lấy thông tin chi tiết đặt phòng theo ID
router.get("/:id", async (req, res) => {
    try {
        const booking = await bookingController.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Đặt phòng không tồn tại" });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ✏ Cập nhật thông tin đặt phòng theo ID
router.put("/:id", async (req, res) => {
    try {
        const updatedBooking = await bookingController.updateBooking(req.params.id, req.body);
        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: "Đặt phòng không tồn tại" });
        }
        res.status(200).json({ success: true, data: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ❌ Hủy đặt phòng
router.delete("/:id", async (req, res) => {
    try {
        const canceledBooking = await bookingController.cancelBooking(req.params.id);
        if (!canceledBooking) {
            return res.status(404).json({ success: false, message: "Đặt phòng không tồn tại" });
        }
        res.status(200).json({ success: true, message: "Đặt phòng đã bị hủy", data: canceledBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
