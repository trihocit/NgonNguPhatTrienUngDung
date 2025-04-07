const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  // Tên khách sạn
      unique: true,
    },
    address: {
      type: String,
      required: true,  // Địa chỉ khách sạn
    },
    contactNumber: {
      type: String,
      required: true,  // Số điện thoại liên lạc
    },
    email: {
      type: String,
      required: true,  // Email liên lạc
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,  // Đánh giá của khách sạn (từ 1 đến 5)
    },
  },
  {
    timestamps: true,  // Tự động thêm createdAt và updatedAt
  }
);

module.exports = mongoose.model("hotel", hotelSchema);
