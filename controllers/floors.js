const Floor = require('../models/floors');

module.exports = {
  // Tạo tầng mới
  createFloor: async function (name, level, hotelId) {
    const newFloor = new Floor({
      name,
      hotelId
    });
  
    await newFloor.save();
    return newFloor;
  },

  // Lấy danh sách tất cả các tầng
  getFloors: async ()=> {
    try {
      const floors = await Floor.find();
      return  floors;
      
    } catch (error) {
      return error.message;
    }
    
  },


  // Lấy thông tin tầng theo ID
  getFloorById: async function (id) {
    try {
      const floor = await Floor.findById(id);
      if (!floor) {
        throw new Error('Tầng không tồn tại!');
      }

      return {
        success: true,
        data: floor,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Cập nhật thông tin tầng
updateFloor: async function (id, floorUpdate) {
  try {
    // Kiểm tra nếu floorUpdate không phải là đối tượng hợp lệ
    if (!floorUpdate || typeof floorUpdate !== 'object') {
      throw new Error('Dữ liệu cập nhật không hợp lệ!');
    }

    // Cập nhật tầng và trả về tầng đã được cập nhật
    const updatedFloor = await Floor.findByIdAndUpdate(id, floorUpdate, { new: true });

    if (!updatedFloor) {
      throw new Error('Tầng không tồn tại!');
    }

    return {
      success: true,
      message: 'Cập nhật tầng thành công!',
      data: updatedFloor,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
},

  // Xóa tầng
  deleteFloor: async function (id) {
    try {
      const deletedFloor = await Floor.findByIdAndDelete(id);

      if (!deletedFloor) {
        throw new Error('Tầng không tồn tại!');
      }

      return {
        success: true,
        message: 'Xóa tầng thành công!',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};
