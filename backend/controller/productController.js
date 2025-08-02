const express = require("express");
const zod = require("zod");
const { Product } = require("../model/db");

const products = async (req, res) => {
  const categoryParam = req.params.category.toUpperCase();

  if (
    !["SEASONARRIVALS", "RETRO", "SPECIALCOLLECTION"].includes(categoryParam)
  ) {
    return res.status(400).json({ msg: "Invalid category" });
  }

  const products = await Product.find({ category: categoryParam });

  return res
    .status(200)
    .json({ products, msg: "Products fetched successfully" });
};

const selectedProduct = async (req, res) => {
  const productParam = req.params.id;
  const product = await Product.findById(productParam);
  return res
    .status(200)
    .json({ product, msg: "Products fetched successfully" });
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products, msg: "Fetched successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

module.exports = { products, selectedProduct, getAllProduct };
