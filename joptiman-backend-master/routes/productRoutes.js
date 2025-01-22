const express = require('express');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const upload = require('../utils/upload');

const router = express.Router();

// CRUD Routes
router.route('/').post(upload.single('pic'), createProduct).get(getProducts);
router
    .route('/:id')
    .get(getProductById)
    .put(upload.single('pic'), updateProduct) // Handle file updates
    .delete(deleteProduct);

module.exports = router;
