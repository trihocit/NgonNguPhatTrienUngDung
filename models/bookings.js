const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        roomId: {
            type: mongoose.Types.ObjectId,
            ref: "room",
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true, // Liên kết với người dùng
        },
        checkInDate: {
            type: Date,
            required: true,
        },
        checkOutDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },
        totalPrice: {
            type: Number,
            required: false,
        }
    },
    {
        timestamps: true, // Tự động tạo createdAt và updatedAt
    }
);

module.exports = mongoose.model("booking", bookingSchema);
