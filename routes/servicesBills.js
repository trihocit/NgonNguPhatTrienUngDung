const express = require("express");
const router = express.Router();
const servicesBillController = require("../controllers/servicesBills");

// Lấy danh sách tất cả hóa đơn dịch vụ
router.get("/", async (req, res) => {
    try {
        const bills = await servicesBillController.getAllServicesBills();
        res.status(200).json({ success: true, data: bills });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Lấy thông tin chi tiết hóa đơn dịch vụ theo ID
router.get("/:id", async (req, res) => {
    try {
        const bill = await servicesBillController.getServicesBillById(req.params.id);
        if (!bill) {
            return res.status(404).json({ success: false, message: "Hóa đơn dịch vụ không tồn tại" });
        }
        res.status(200).json({ success: true, data: bill });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Tạo hóa đơn dịch vụ mới
router.post("/", async (req, res) => {
    try {
        const { bookingId, userId, services } = req.body;
        const newBill = await servicesBillController.createServicesBill(bookingId, userId, services);
        res.status(201).json({ success: true, data: newBill });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Cập nhật hóa đơn dịch vụ
router.put("/:id", async (req, res) => {
    try {
        const updatedBill = await servicesBillController.updateServicesBill(req.params.id, req.body);
        if (!updatedBill) {
            return res.status(404).json({ success: false, message: "Hóa đơn dịch vụ không tồn tại" });
        }
        res.status(200).json({ success: true, data: updatedBill });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Xóa hóa đơn dịch vụ
router.delete("/:id", async (req, res) => {
    try {
        const deletedBill = await servicesBillController.deleteServicesBill(req.params.id);
        if (!deletedBill) {
            return res.status(404).json({ success: false, message: "Hóa đơn dịch vụ không tồn tại" });
        }
        res.status(200).json({ success: true, message: "Hóa đơn dịch vụ đã được xoá", data: deletedBill });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
