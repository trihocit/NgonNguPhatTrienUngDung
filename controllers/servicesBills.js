const ServicesBill = require('../models/servicesBill');
const Service = require('../models/services');
const Booking = require('../models/bookings');

// Tạo hóa đơn dịch vụ cho một booking
exports.createServicesBill = async (req, res) => {
  try {
    const { bookingId, customerId, services } = req.body;

    // Lấy thông tin booking và validate
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking không tồn tại!" });
    }

    // Tính toán tổng tiền dịch vụ
    let totalAmount = 0;
    for (let i = 0; i < services.length; i++) {
      const service = await Service.findById(services[i].serviceId);
      if (!service) {
        return res.status(404).json({ success: false, message: `Dịch vụ ${services[i].serviceId} không tồn tại!` });
      }

      // Tính tổng giá của dịch vụ (số lượng * giá)
      const totalPrice = services[i].quantity * service.price;
      services[i].totalPrice = totalPrice;

      // Cộng tổng tiền dịch vụ
      totalAmount += totalPrice;
    }

    // Tổng cộng (trong trường hợp không có thuế hoặc phụ phí, grandTotal = totalAmount)
    const grandTotal = totalAmount;

    // Lưu hóa đơn dịch vụ vào cơ sở dữ liệu
    const newBill = new ServicesBill({
      bookingId,
      customerId,
      services,
      totalAmount,
      grandTotal,
    });

    await newBill.save();

    // Trả kết quả
    return res.status(201).json({
      success: true,
      message: "Tạo hóa đơn dịch vụ thành công!",
      data: newBill,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
