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

const User = mongoose.model("User", userSchema);

module.exports = { User };
