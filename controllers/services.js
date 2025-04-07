const Service = require("../models/services");

// Lấy tất cả dịch vụ
exports.getAllServices = async () => {
    return await Service.find();
};

// Lấy dịch vụ theo ID
exports.getServiceById = async (id) => {
    return await Service.findById(id);
};

// Tạo dịch vụ mới
exports.createService = async (name, price, description) => {
    const newService = new Service({ name, price, description });
    return await newService.save();
};

// Cập nhật dịch vụ
exports.updateService = async (id, data) => {
    return await Service.findByIdAndUpdate(id, data, { new: true });
};

// Xóa dịch vụ
exports.deleteService = async (id) => {
    return await Service.findByIdAndDelete(id);
};
