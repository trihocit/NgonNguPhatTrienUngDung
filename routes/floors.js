// routes/floorRoutes.js
const express = require("express");
const router = express.Router();
const floorController = require("../controllers/floors");

// Lấy danh sách tất cả tầng
router.get("/", async (req, res) => {
    try {
        const floors = await floorController.getFloors();
        res.status(200).json({ success: true, data: floors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Lấy thông tin chi tiết tầng theo ID
router.get("/:id", async (req, res) => {
    try {
        const floor = await floorController.getFloorById(req.params.id);
        if (!floor) {
            return res.status(404).json({ success: false, message: "Tầng không tồn tại" });
        }
        res.status(200).json({ success: true, data: floor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Tạo tầng mới
router.post("/", async (req, res) => {
    try {
        const { name, hotelId } = req.body;
        const newFloor = await floorController.createFloor(name, hotelId);
        res.status(201).json({ success: true, data: newFloor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Cập nhật thông tin tầng
router.put("/:id", async (req, res) => {
    try {
        const updatedFloor = await floorController.updateFloor(req.params.id, req.body);
        if (!updatedFloor) {
            return res.status(404).json({ success: false, message: "Tầng không tồn tại" });
        }
        res.status(200).json({ success: true, data: updatedFloor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Xóa tầng (soft delete)
router.delete("/:id", async (req, res) => {
    try {
        const deletedFloor = await floorController.deleteFloor(req.params.id);
        if (!deletedFloor) {
            return res.status(404).json({ success: false, message: "Tầng không tồn tại" });
        }
        res.status(200).json({ success: true, message: "Tầng đã được xoá", data: deletedFloor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
