const express = require("express");
const zod = require("zod");
const { Review } = require("../model/review");
const { Product } = require("../model/db");

const reviewSchema = zod.object({
  productId: zod.string().nonempty("Product ID is required"),
  rating: zod.number().min(1).max(5, "Rating must be between 1 and 5"),
  comment: zod.string().nonempty("Comment is required"),
});

const createReview = async (req, res) => {
  const result = reviewSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: result.error.format() });
  }

  try {
    const { productId, rating, comment } = result.data;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyReviewed = await Review.findOne({
      user: req.user.userId,
      product: productId,
    });

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You already reviewed this product" });
    }

    const review = await Review.create({
      user: req.user.userId,
      product: productId,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review created successfully",
      review,
      userId: req.user.userId,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createReview };
