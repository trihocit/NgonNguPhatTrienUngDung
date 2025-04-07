// models/servicesBill.js
const mongoose = require('mongoose');

const servicesBillSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'booking', // Liên kết với bảng Booking
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Liên kết với bảng User (Khách hàng)
    required: true,
  },
  services: [
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service', // Liên kết với bảng Service
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('servicesBill', servicesBillSchema);
