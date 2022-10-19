const mongoose = require("mongoose");

const order = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    productStatus: { type: String, required: true },
    paymentStatus: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", order);

module.exports = Order;
