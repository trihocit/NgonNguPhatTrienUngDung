const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/services");

// Lấy danh sách tất cả dịch vụ
router.get("/", async (req, res) => {
    try {
        const services = await serviceController.getAllServices();
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Lấy thông tin chi tiết dịch vụ theo ID
router.get("/:id", async (req, res) => {
    try {
        const service = await serviceController.getServiceById(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, message: "Dịch vụ không tồn tại" });
        }
        res.status(200).json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Tạo dịch vụ mới
router.post("/", async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const newService = await serviceController.createService(name, price, description);
        res.status(201).json({ success: true, data: newService });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Cập nhật dịch vụ
router.put("/:id", async (req, res) => {
    try {
        const updatedService = await serviceController.updateService(req.params.id, req.body);
        if (!updatedService) {
            return res.status(404).json({ success: false, message: "Dịch vụ không tồn tại" });
        }
        res.status(200).json({ success: true, data: updatedService });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Xóa dịch vụ
router.delete("/:id", async (req, res) => {
    try {
        const deletedService = await serviceController.deleteService(req.params.id);
        if (!deletedService) {
            return res.status(404).json({ success: false, message: "Dịch vụ không tồn tại" });
        }
        res.status(200).json({ success: true, message: "Dịch vụ đã được xoá", data: deletedService });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
