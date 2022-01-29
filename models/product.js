const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    SKU: { type: String, trim: true },
    code: { type: Number },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    pictures: [{ type: String, trim: true }],
    price: { type: Number },
    currency: { type: String, trim: true },
})

module.exports = mongoose.model('Product', productSchema);