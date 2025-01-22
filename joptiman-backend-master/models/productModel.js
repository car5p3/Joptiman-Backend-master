const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ratings: { type: Number, default: 0 },
    pic: { type: String, required: true }, // Stores the file path or URL
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
