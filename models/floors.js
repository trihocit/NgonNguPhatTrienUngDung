// models/floor.js
const mongoose = require("mongoose");

const floorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  // Tên tầng (ví dụ: "Tầng 1", "Tầng 2", ...)
      unique: true,
    },
    hotelId: {
      type: mongoose.Types.ObjectId,
      ref: "hotel",  // Liên kết với khách sạn
      required: false,
    },
  },
  {
    timestamps: true,  // Tự động tạo createdAt và updatedAt
  }
);

module.exports = mongoose.model("floor", floorSchema);
