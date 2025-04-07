const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking", // Liên kết với booking mà hóa đơn này liên quan
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Liên kết với khách hàng
      required: true,
    },
    items: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "service", // Dịch vụ mà khách hàng đã sử dụng
          required: true,
        },
        description: {
          type: String, // Mô tả dịch vụ
          required: true,
        },
        quantity: {
          type: Number, // Số lượng dịch vụ
          required: true,
        },
        unitPrice: {
          type: Number, // Giá mỗi dịch vụ
          required: true,
        },
        totalPrice: {
          type: Number, // Tổng giá của dịch vụ (quantity * unitPrice)
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number, // Tổng tiền của hóa đơn
      required: true,
    },
    grandTotal: {
      type: Number, // Tổng cộng (bao gồm tất cả dịch vụ, không tính thuế)
      required: true,
    },
    status: {
      type: String,
      enum: ["unpaid", "paid", "canceled"], // Trạng thái hóa đơn
      default: "unpaid",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Tự động tạo createdAt và updatedAt
  }
);

module.exports = mongoose.model("invoice", invoiceSchema);
