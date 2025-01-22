const Product = require('../models/productModel');

// Create a new product with image upload
exports.createProduct = async (req, res) => {
    try {
        const { name, price, ratings, quantity, description } = req.body;
        const pic = req.file ? req.file.path : null;

        if (!pic) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const product = await Product.create({
            name,
            price,
            ratings,
            pic,
            quantity,
            description,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all products with sorting and filtering
exports.getProducts = async (req, res) => {
    try {
        let query = {};
        const { sort, priceRange, search } = req.query;

        // Filters
        if (priceRange) {
            const ranges = {
                under50: { $lt: 50 },
                '50-100': { $gte: 50, $lt: 100 },
                '100-200': { $gte: 100, $lt: 200 },
                '200-300': { $gte: 200, $lt: 300 },
                above300: { $gte: 300 },
            };
            query.price = ranges[priceRange];
        }

        // Search
        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
        }

        // Sorting
        let sortQuery = {};
        if (sort) {
            const sortOptions = {
                'low-to-high': { price: 1 },
                'high-to-low': { price: -1 },
                'a-z': { name: 1 },
                'z-a': { name: -1 },
            };
            sortQuery = sortOptions[sort];
        }

        const products = await Product.find(query).sort(sortQuery);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
