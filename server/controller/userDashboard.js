const express = require("express");
const { Item } = require("../models/item");
const Cart = require("../models/Cart");

const addtocart = async (req, res, next) => {
  try {
    const { itemId, quantity, price } = req.body;
    if (!itemId || !quantity || !price) {
      return res.status(400).json({ error: "Please fill all the data" });
    }
    const itemExist = await Item.findOne({ _id: itemId });
    if (!itemExist) {
      return res.status(400).json({ error: "Item not found" });
    }
    const cartExist = await Cart.findOne({
      customerId: req.rootUser._id,
      productStatus: "Pending",
    });
    if (cartExist) {
      const itemExistInCart = cartExist.items.find(
        (item) => item.itemId == itemId
      );
      if (itemExistInCart) {
        itemExistInCart.quantity = quantity;
        itemExistInCart.price = price;
        cartExist.total = cartExist.total + price;
        await cartExist.save();
        return res.status(201).json({ message: "Item Updated Successfully" });
      } else {
        cartExist.items.push({ itemId, quantity, price });
        cartExist.total = cartExist.total + price;
        await cartExist.save();
        return res.status(201).json({ message: "Item Added Successfully" });
      }
    } else {
      const cart = new Cart({
        customerId: req.rootUser._id,
        items: [{ itemId, quantity, price }],
        total: price,
        productStatus: "Pending",
        paymentStatus: "Pending",
      });
      await cart.save();
      return res.status(201).json({ message: "Item Added Successfully" });
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = { addtocart };
