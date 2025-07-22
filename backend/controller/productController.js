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

module.exports = { products };
