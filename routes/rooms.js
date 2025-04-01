const express = require("express");
const router = express.Router();
const roomController = require("../controllers/rooms");

// Lấy danh sách tất cả phòng
router.get("/", async (req, res) => {
    try {
        const rooms = await roomController.getAllRooms();
        res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Lấy thông tin chi tiết phòng theo ID
router.get("/:id", async (req, res) => {
    try {
        const room = await roomController.getRoomById(req.params.id);
        if (!room) {
            return res.status(404).json({ success: false, message: "Phòng không tồn tại" });
        }
        res.status(200).json({ success: true, data: room });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Tạo phòng mới
router.post("/", async (req, res) => {
    try {
        const { name, type, price, amenities, hotelId, isAvailable } = req.body;
        const newRoom = await roomController.createRoom(name, type, price, amenities, hotelId, isAvailable);
        res.status(201).json({ success: true, data: newRoom });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Cập nhật phòng
router.put("/:id", async (req, res) => {
    try {
        const updatedRoom = await roomController.updateRoom(req.params.id, req.body);
        if (!updatedRoom) {
            return res.status(404).json({ success: false, message: "Phòng không tồn tại" });
        }
        res.status(200).json({ success: true, data: updatedRoom });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Xóa phòng (soft delete)
router.delete("/:id", async (req, res) => {
    try {
        const deletedRoom = await roomController.deleteRoom(req.params.id);
        if (!deletedRoom) {
            return res.status(404).json({ success: false, message: "Phòng không tồn tại" });
        }
        res.status(200).json({ success: true, message: "Phòng Đã được xoá rồi nè huhu!!!", data: deletedRoom });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
