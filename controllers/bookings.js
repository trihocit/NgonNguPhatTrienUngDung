const Booking = require('../models/bookings');
const Room = require('../models/rooms');

module.exports = {
    // Tạo một đặt phòng mới
    createBooking: async function(userId, roomId, checkInDate, checkOutDate) {
        try {
            // Kiểm tra xem phòng có sẵn không
            let room = await Room.findById(roomId);
            if (!room || !room.isAvailable) {
                throw new Error('Phòng không còn khả dụng');
            }

            // Tính toán tổng giá
            const diffTime = new Date(checkOutDate) - new Date(checkInDate);
            const days = diffTime / (1000 * 3600 * 24);  // Tính số ngày
            const totalPrice = room.price * days;

            // Tạo đặt phòng
            const newBooking = new Booking({
                roomId,
                userId,
                checkInDate,
                checkOutDate,
                totalPrice,
                status: "pending"  // Đặt phòng mới mặc định là "pending"
            });

            await newBooking.save();
            return newBooking;
        } catch (error) {
            throw error;
        }
    },
    

    // Lấy tất cả đặt phòng của người dùng
    getUserBookings: async function(userId) {
        return await Booking.find({ userId }).populate('roomId');
    },

    // Hủy đặt phòng
    cancelBooking: async function(bookingId) {
        let booking = await Booking.findById(bookingId);
        if (!booking) {
            throw new Error("Đặt phòng không tồn tại");
        }

        booking.status = "cancelled";
        await booking.save();
        return booking;
    }
};
// Cập nhật thông tin đặt phòng theo ID
async function updateBooking(bookingId, updateData) {
    try {
      // Tìm đặt phòng theo ID và cập nhật thông tin
      const updatedBooking = await bookingSchema.findByIdAndUpdate(bookingId, updateData, { new: true }).populate("roomId userId");
      if (!updatedBooking) {
        throw new Error("Booking not found");
      }
      return updatedBooking;
    } catch (error) {
      throw error;
    }
  }
