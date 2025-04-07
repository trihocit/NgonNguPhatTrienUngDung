const Invoice = require("../models/invoices");
const Service = require("../models/services");

// Tạo hóa đơn mới
exports.createInvoice = async (req, res) => {
  try {
    const { bookingId, userId, items } = req.body;

    if (!bookingId || !userId || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Thông tin không đầy đủ" });
    }

    let totalAmount = 0;
    let totalItems = [];

    for (let item of items) {
      const service = await Service.findById(item.serviceId);
      if (!service) {
        return res.status(404).json({ success: false, message: `Dịch vụ ${item.serviceId} không tồn tại!` });
      }

      const totalPrice = item.quantity * service.price;
      item.totalPrice = totalPrice;
      totalAmount += totalPrice;

      totalItems.push({
        serviceId: item.serviceId,
        description: service.name,
        quantity: item.quantity,
        unitPrice: service.price,
        totalPrice,
      });
    }

    const grandTotal = totalAmount;

    const newInvoice = new Invoice({
      bookingId,
      userId,
      items: totalItems,
      totalAmount,
      grandTotal,
    });

    await newInvoice.save();

    res.status(201).json({
      success: true,
      message: "Tạo hóa đơn thành công!",
      data: newInvoice,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy tất cả hóa đơn
exports.getInvoices = async () => {
  try {
    const invoices = await Invoice.find()
      .populate("bookingId", "checkInDate checkOutDate")
      .populate("userId", "name email")
      .populate("items.serviceId", "name price");

    return { success: true, data: invoices };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Cập nhật hóa đơn
exports.updateInvoice = async (id, invoiceUpdate) => {
  try {
    const { bookingId, userId, items, totalAmount, grandTotal, status } = invoiceUpdate;

    // Tìm hóa đơn theo ID
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return { success: false, message: 'Hóa đơn không tồn tại' };
    }

    // Cập nhật thông tin hóa đơn
    invoice.bookingId = bookingId || invoice.bookingId;
    invoice.userId = userId || invoice.userId;
    invoice.items = items || invoice.items;
    invoice.totalAmount = totalAmount || invoice.totalAmount;
    invoice.grandTotal = grandTotal || invoice.grandTotal;
    invoice.status = status || invoice.status;

    // Tính lại tổng tiền
    let totalAmountUpdated = 0;
    let totalItemsUpdated = [];

    for (let item of invoice.items) {
      const service = await Service.findById(item.serviceId);
      if (!service) {
        return { success: false, message: `Dịch vụ ${item.serviceId} không tồn tại!` };
      }

      const totalPrice = item.quantity * service.price;
      item.totalPrice = totalPrice;
      totalAmountUpdated += totalPrice;

      totalItemsUpdated.push({
        serviceId: item.serviceId,
        description: service.name,
        quantity: item.quantity,
        unitPrice: service.price,
        totalPrice,
      });
    }

    // Cập nhật tổng số tiền và tổng tiền của hóa đơn
    invoice.totalAmount = totalAmountUpdated;
    invoice.grandTotal = totalAmountUpdated;

    // Lưu hóa đơn đã cập nhật
    await invoice.save();

    return { success: true, message: 'Cập nhật hóa đơn thành công!', data: invoice };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


// Xóa hóa đơn
exports.deleteInvoice = async (id) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    if (!deletedInvoice) {
      return 'Hóa đơn không tồn tại' ;
    }
    return 'Hóa đơn đã bị xóa!' ;
  } catch (error) {
    throw new Error("Lỗi  Rồi ní Ơi");
  }
};

// Lấy hóa đơn theo ID
exports.getInvoiceById = async ( id) => {
  try {
    const invoice = await Invoice.findById(id)
      .populate("bookingId", "checkInDate checkOutDate")
      .populate("userId", "name email")
      .populate("items.serviceId", "name price");

    if (!invoice) {
      return "Hóa đơn không tồn tại";
    }
    return invoice;
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
