const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const billingSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Unique ID
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  GST: { type: Number, required: true }
});

const BillingCollection = mongoose.model('BillingCollection', billingSchema);

module.exports = BillingCollection;
