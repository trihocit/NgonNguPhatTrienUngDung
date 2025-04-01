const Room = require("../models/rooms");

module.exports = {
    // Lấy danh sách tất cả phòng
    getAllRooms: async function () {
        return await Room.find();
    },

    // Lấy thông tin chi tiết một phòng theo ID
    getRoomById: async function (id) {
        return await Room.findById(id);
    },

    // Tạo phòng mới
    createRoom: async function (name, type, price, amenities, hotelId, isAvailable) {
        let newRoom = new Room({
            name,
            type,
            price,
            amenities,
            hotelId,
            isAvailable
        });

        await newRoom.save();
        return newRoom;
    },

    // Cập nhật thông tin phòng
    updateRoom: async function (id, updateData) {
        return await Room.findByIdAndUpdate(id, updateData, { new: true });
    },

    // Xóa  cứng
    deleteRoom: async function(id) {
        try {
            // Xóa phòng khỏi cơ sở dữ liệu
            const room = await Room.findByIdAndDelete(id);
            return room;  // Trả về phòng đã xóa
        } catch (error) {
            throw new Error("Lỗi trong quá trình xóa phòng");
        }
    }
};
