const express = require("express");
const zod = require("zod");
const { Product } = require("../model/db");
const mongoose = require("mongoose");

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
module.exports = { createProduct, updateProducts };
