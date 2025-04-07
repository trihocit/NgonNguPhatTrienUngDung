const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    }, // Single, Double, Suite...
    price: {
      type: Number,
      min: 0,
      default: 100,
    },
    amenities: {
      type: [String],
      default: [],
    }, // WiFi, Điều hòa, TV...
    hotelId: {
      type: mongoose.Types.ObjectId,
      ref: "hotel",
      required: true, // Mỗi phòng phải thuộc một khách sạn
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    floorId: {
      type: mongoose.Types.ObjectId,
      ref: "floor", // Liên kết với model Floor
      required: true, // Mỗi phòng phải thuộc một tầng
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

module.exports = mongoose.model("room", roomSchema);
