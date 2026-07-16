const prisma = require('../prisma/client');

// Create Product 
const createProduct = async (req, res) => {
    try{
        
        const {name, price, description, sku, image, category} = req.body;
    
        const product = await prisma.product.create({
            data: {
                name,
                price,
                description,
                sku,
                image,
                category,
            }
        })
        console.log(product);

        return res.status(201).json({message: "Product Created Successfully"});
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// Get All Products
const getProducts = async(req, res) => {
    try{
        const products = await prisma.product.findMany();
        return res.status(200).json({message: "Get all products", products});
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// Get single Product
const getProduct = async(req, res) => {
    try{
        const { id } = req.params;

        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json(product);
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// Update the product
const updateProduct = async(req,res) => {
    try{
        const {id} = req.params;
    
        const product = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: req.body
        })
    
        res.json(200).json({message: "The Product is updated", product});
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// Delete the product
const deleteProduct = async(req,res) => {
    try{
        const {id} = req.params;
    
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })
    
        return res.status(200).json({message: "Product Deleted"});
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
}
