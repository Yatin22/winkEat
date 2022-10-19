const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      validator(value) {
        if (value.length === 10) {
          throw new Error("Phone number must be 10 digits");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validator(value) {
        if (value.length < 6) {
          throw new Error("Password must be greater than 6 characters");
        }
      },
    },
    cpassword: {
      type: String,
      required: true,
      validator(value) {
        if (value.length < 6) {
          throw new Error("Password must be greater than 6 characters");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// we are hashing the password
vendorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// we are generating the token
vendorSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

// we are storing the message
const Vendor = mongoose.model("VENDOR", vendorSchema);

module.exports = Vendor;
