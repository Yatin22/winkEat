const express = require("express");
const sharp = require("sharp");
const fs = require("fs");
const { ItemCategory, upload } = require("../models/itemCategory");
const { Item, itemImgUpload } = require("../models/item");

const addcategory = async (req, res, next) => {
  console.log(req.rootVendor._id);
  console.log(req.rootVendor.name);
  try {
    if (!req.file || !req.body) {
      return res.status(400).json({ error: "Please fill the data" });
    }
    const categoryExist = await ItemCategory.findOne({
      name: req.body.name,
      createdBy: req.rootVendor._id,
    });
    if (categoryExist) {
      return res.status(400).json({ error: "Category already exist" });
    }

    const itemCategory = new ItemCategory({
      name: req.body.name,
      image: req.file.filename,
      createdBy: req.rootVendor._id,
    });
    await itemCategory.save();
    res.status(201).json({ message: "Item Category Added Successfully" });
  } catch (err) {
   return  next(err);
  }
};

const item = async (req, res, next) => {
  try {
    if (!req.file || !req.body) {
      return res.status(400).json({ error: "Please fill all the data" });
    }
    const findCategory = await ItemCategory.findOne({
      name: req.body.category,
      createdBy: req.rootVendor._id,
    });
    const itemExist = await Item.findOne({
      name: req.body.name,
      createdBy: req.rootVendor._id,
      category: findCategory._id,
    });
    if (itemExist) {
      return res.status(400).json({ error: "Item already exist" });
    }

    console.log(findCategory._id);

    const item = new Item({
      name: req.body.name,
      image: req.file.filename,
      stock: req.body.stock,
      price: req.body.price,
      description: req.body.description,
      category: findCategory._id,
      createdBy: req.rootVendor._id,
    });
    await item.save();
    res.status(201).json({ message: "Item Added Successfully" });
  } catch (err) {
    return next(err);
  }
};

module.exports = { addcategory, item };
