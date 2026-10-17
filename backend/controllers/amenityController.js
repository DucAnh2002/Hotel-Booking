const Amenity = require("../models/amenityModel");

// Lấy danh sách dịch vụ/ Spa
exports.getAllAmenities = async (req, res, next) => {
  try {
    const amenities = await Amenity.find({ isAvailable: true });
    res.status(200).json({ success: true, data: amenities });
  } catch (error) {
    next(error);
  }
};

// Tạo dịch vụ mới (Admin)

exports.createAmenity = async (req, res, next) => {
  try {
    const newAmenity = await Amenity.create(req.body);
    res.status(201).json({ success: true, data: newAmenity });
  } catch (error) {
    next(error);
  }
};
