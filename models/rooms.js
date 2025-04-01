const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
            name: {
                type: String,
                required: true,
                unique: true
            },
            type: {
                type: String,
                required: true
            }, // Single, Double, Suite...
            price: {
                type: Number,
                min: 0,
                default: 100
            },
            amenities: {
                type: [String],
                default: []
            }, // WiFi, Điều hòa, TV...
            hotelId: {
                type: mongoose.Types.ObjectId,
                ref: "Hotel",
                required: false
            },
            isAvailable: {
                type: Boolean,
                default: true
            }
        },
        {
        timestamps: true // Tự động thêm createdAt và updatedAt
    }
);

module.exports = mongoose.model("room", roomSchema);
