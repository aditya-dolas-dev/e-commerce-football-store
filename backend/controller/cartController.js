const { Product, Cart } = require("../model/db");

const createCart = async (req, res) => {
  const { productId, quantity, size, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "No Product found" });

    // determine if user or guest

    let cart = await getCart(userId, guestId);

    // if cart exist
    if (cart) {
      const productIndex = cart.product.findIndex(
        (p) => p.productId.toString() === productId && p.size === size
      );

      if (productIndex > -1) {
        cart.product[productIndex].quantity += quantity;
      } else {
        cart.product.push({
          productId,
          name: product.name,
          price: product.price,
          size,
          quantity,
        });
      }
      cart.totalPrice = cart.product.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // create new cart for guest /user

      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        product: [
          {
            productId,
            name: product.name,
            price: product.price,
            size,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getCart = async (userId, guestId) => {
  if (userId) return await Cart.findOne({ user: userId });
  else if (guestId) return await Cart.findOne({ guestId });
  else return null;
};

/// Cart update method -->>> PUT METHOD

const cartUpdate = async (req, res) => {
  const { productId, quantity, userId, guestId, size } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ msg: "product not found " });
    }

    const productIndex = cart.product.findIndex(
      (p) => p.productId.toString() === productId && p.size === size
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.product[productIndex].quantity = quantity;
      } else {
        cart.product.splice(productIndex, 1); // removing product if quantity reached 0
      }

      cart.totalPrice = cart.product.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(201).json(cart);
    } else {
      return res.status(404).json({ msg: "No products found in cart " });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const cartDelete = async (req, res) => {
  const { productId, size, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);

    if (!cart) {
      return res.status(404).json({ msg: "product not found " });
    }

    const productIndex = cart.product.findIndex(
      (p) => p.productId.toString() === productId && p.size === size
    );

    if (productIndex > -1) {
      cart.product.splice(productIndex, 1);

      cart.totalPrice = cart.product.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(201).json(cart);
    } else {
      return res.status(404).json({ msg: "No products found in cart " });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const cartFetch = async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    const cart = await getCart(userId, guestId);

    if (cart) {
      res.json(cart);
    } else {
      return res.status(404).json({ msg: "No products found in cart " });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const cartMerge = async (req, res) => {
  const { guestId } = req.body;
  if (!req.user || !req.user.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: user not authenticated" });
  }

  try {
    const guestCart = await Cart.findOne({ guestId });

    const userCart = await Cart.findOne({ user: req.user.userId });

    if (guestCart) {
      if (guestCart.product.length === 0) {
        return res.status(400).json({ message: "Guest Cart is empty" });
      }
      if (userCart) {
        guestCart.product.forEach((guestItem) => {
          const productIndex = userCart.product.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId &&
              item.size === guestItem.size
          );
          if (productIndex > -1) {
            userCart.product[productIndex].quantity += guestItem.quantity;
          } else {
            userCart.product.push(guestItem);
          }
        });
        userCart.totalPrice = userCart.product.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();

        // Removing the guest cart after merging

        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting guest cart:", error);
        }
        res.satus(200).json(userCart);
      } else {
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();
        res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        return res.status(200).json(userCart);
      }
      res.status(404).json({ msg: "Guest cart not found" });
    }
  } catch (error) {
    console.error("Cart merge error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createCart, cartUpdate, cartDelete, cartFetch, cartMerge };
