import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});
const hotelModel =
  mongoose.models.hotel || mongoose.model("Hotel", hotelSchema);
export default hotelModel;
