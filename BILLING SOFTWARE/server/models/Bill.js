const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  customerName: String,
  mobileNo: String,
  email: String,
  paymentMethod: String,
  items: [
    {
      name: String,
      unitPrice: Number,
      quantity: Number,
      GST: Number,
    },
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
