const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

MONGODB = process.env.MONGODB_URI;

mongoose.connect(MONGODB);

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6, maxLength: 30 },
});

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  ProductImgUrl: { type: String, required: true },
  category: {
    type: String,
    enum: ["SEASONARRIVALS", "RETRO", "SPECIALCOLLECTION"],
    required: true,
  },
  stock: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

module.exports = { User, Product };
