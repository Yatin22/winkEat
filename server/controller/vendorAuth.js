const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();

require("../database/conn");
const Vendor = require("../models/Vendor");

const signup = async (req, res, next) => {
  const { name, phone, password, cpassword } = req.body;
  if (!name || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill the field properly" });
  }
  try {
    const vendorExist = await Vendor.findOne({ phone: phone });
    if (vendorExist) {
      return res.status(422).json({ error: "Phone number already exist" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password are not matching" });
    } else {
      const vendor = new Vendor({ name, phone, password, cpassword });
      await vendor.save();
      res.status(201).json({ message: "Vendor registered successfully" });
    }
  } catch (err) {
   return  next(err);
  }
};

const signin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ error: "Please fill the data" });
    }
    const vendorLogin = await Vendor.findOne({ phone: phone });
    // console.log(vendorLogin);
    if (vendorLogin) {
      const isMatch = await bcrypt.compare(password, vendorLogin.password);
      const token = await vendorLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.json({ message: "Vendor Signin Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    return next(err);
  }
};

const signout = async (req, res) => {
  try {
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("Vendor Signout Successfully");
  } catch (err) {
    return next(err);
  }
};

module.exports = { signup, signin, signout };
