const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoices');

// Lấy tất cả hóa đơn
router.get('/', async (req, res) => {
  try {
    const result = await invoiceController.getInvoices();  // Không cần truyền req, res
    if (!result.success) {
      return res.status(500).json({ success: false, message: result.message });
    }
    res.status(200).json({ success: true, data: result.data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Lấy thông tin hóa đơn theo ID
router.get('/:id', async (req, res) => {
  try {
    const invoice = await invoiceController.getInvoiceById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Hóa đơn không tồn tại' });
    }
    return res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Tạo hóa đơn mới
router.post('/', async (req, res) => {
  try {
    const { bookingId, userId, items } = req.body; // Sử dụng đúng các trường cần thiết trong body
    const newInvoice = await invoiceController.createInvoice(req, res);  // Gọi đúng hàm controller với tham số req, res
    res.status(201).json({ success: true, data: newInvoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Cập nhật hóa đơn
router.put('/:id', async (req, res) => {
  try {
    const updatedInvoice = await invoiceController.updateInvoice(req.params.id, req.body); // Cập nhật hóa đơn
    if (!updatedInvoice) {
      return res.status(404).json({ success: false, message: 'Hóa đơn không tồn tại' });
    }
    res.status(200).json({ success: true, data: updatedInvoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Xóa hóa đơn
router.delete('/:id', async (req,res) => {
  try {
    const deletedInvoice = await invoiceController.deleteInvoice(req.params.id); // Xóa hóa đơn
    if (!deletedInvoice) {
      return res.status(404).json({ success: false, message: 'Hóa đơn không tồn tại' });
    }
    res.status(200).json({ success: true, message: 'Hóa đơn đã bị xóa!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
