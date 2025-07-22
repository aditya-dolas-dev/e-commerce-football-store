const express = require("express");
const zod = require("zod");
const { Product } = require("../model/db");
const mongoose = require("mongoose");
const { Admin } = require("../model/db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// *******admin signup schema***************************************/

const signupSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  email: zod.string().email("Invalid Email format"),
  password: zod
    .string()
    .min(6, "minimum password length atleast 6 characters")
    .max(30, "maximum password length should not exceed 30 character"),
});

//**>>>>>>>>>>>>>>>>>>>>>>>>>> admin login >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>* */

const signup = async (req, res) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(403)
      .json({ msg: "Validation Failed", errors: result.error.format() });
  }

  const { firstname, lastname, email, password } = result.data;

  // check 1 --> email exist

  const existingEmail = await Admin.findOne({ email });

  if (existingEmail) {
    return res.status(403).json({ message: "Email already exist" });
  }

  const newAdmin = await Admin.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
  });

  const token = jwt.sign(
    {
      userId: newAdmin._id,
      role: "user",
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  return res
    .status(200)
    .json({ newAdmin, message: "Admin created succesfully" });
};

/************************ LOGIN SCHEMA*************************************** */
const loginSchema = zod.object({
  email: zod.string(),
  password: zod.string(),
});

///***********************Login POST METHOD******************8 */

const login = async (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(403)
      .json({ msg: "Validation Failed", errors: result.error.format() });
  }

  const { email, password } = result.data;

  const admin = await Admin.findOne({ email });

  // if user exist or not  -- > check

  if (!admin) {
    return res
      .status(403)
      .json({ message: "email does not exist, please signup" });
  }

  // check if password is correct

  if (admin.password !== password) {
    return res.status(403).json({ message: "Incorrect password" });
  }

  const token = jwt.sign(
    {
      userId: admin._id,
      role: "admin",
    },
    JWT_SECRET,
    { expiresIn: "2d" }
  );

  return res
    .status(200)
    .json({ token, message: "admin logged in succesfully" });
};

//************  creating product              ************************************************8

const createProductSchema = zod.object({
  productName: zod.string().min(1, "Product name is required"),
  description: zod.string().min(1, "Description is required"),
  price: zod
    .number({ invalid_type_error: "Price must be a number" })
    .nonnegative(),
  ProductImgUrl: zod.string().min(1, "Image URL is required"),
  category: zod.enum(["SEASONARRIVALS", "RETRO", "SPECIALCOLLECTION"], {
    errorMap: () => ({
      message: "Category must be one of: season arrivals, retro, special",
    }),
  }),
  stock: zod
    .number({ invalid_type_error: "Stock must be a number" })
    .nonnegative(),
});

const createProduct = async (req, res) => {
  const result = createProductSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(403).json({
      msg: "Validation Failed",
      errors: result.error.format(),
    });
  }

  const { productName, description, price, category, ProductImgUrl, stock } =
    result.data;

  const product = await Product.create({
    productName,
    description,
    price,
    category,
    ProductImgUrl,
    stock,
  });

  return res.status(201).json({
    msg: "Product created successfully",
    product,
  });
};

// ********************* updating the product*****************************

const updateProductSchema = zod.object({
  productName: zod.string().min(1, "Product name is required").optional(),
  description: zod.string().min(1, "Description is required").optional(),
  price: zod
    .number({ invalid_type_error: "Price must be a number" })
    .nonnegative()
    .optional(),
  ProductImgUrl: zod.string().min(1, "Image URL is required").optional(),
  category: zod.enum(["SEASONARRIVALS", "RETRO", "SPECIALCOLLECTION"], {
    errorMap: () =>
      ({
        message: "Category must be one of: season arrivals, retro, special",
      }.optional()),
  }),
  stock: zod
    .number({ invalid_type_error: "Stock must be a number" })
    .nonnegative()
    .optional(),
});

const updateProducts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid product ID" });
  }

  const result = updateProductSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(403).json({
      msg: "Validation Failed",
      errors: result.error.format(),
    });
  }
  const { productName, description, price, category, ProductImgUrl, stock } =
    result.data;

  const updateProduct = await Product.findByIdAndUpdate(
    id,
    {
      ...(productName && { productName }),
      ...(description && { description }),
      ...(price !== undefined && { price }),
      ...(category && { category }),
      ...(ProductImgUrl && { ProductImgUrl }),
      ...(stock !== undefined && { stock }),
    },
    { new: true }
  );

  return res.status(200).json({
    msg: "Product updated successfully",
    updateProduct,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid product ID" });
  }

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    return res.status(404).json({ msg: "Product not found" });
  }
  return res.status(200).json({ msg: "Product deleted successfully" });
};

module.exports = {
  createProduct,
  updateProducts,
  deleteProduct,
  signup,
  login,
};
