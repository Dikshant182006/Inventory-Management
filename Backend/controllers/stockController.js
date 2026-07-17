const prisma = require('../prisma/client');

// Add stock
const addStock = async(req, res) => {
    try{
        const {productId, quantity} = req.body;
        
        // Validation
        if(!productId || !quantity) {
            return res.status(400).json({message: "productId and quantity are required"});
        }
    
        if(quantity <= 0) {
            return res.status(400).json({message: "Quantity is must greater than 0"})
        }

        console.log(prisma);
    
        // Check product exists
        const existingProduct = await prisma.Product.findUnique({
            where: {
                id: Number(productId)
            }
        })
    
        if(!existingProduct) {
            return res.status(404).json({message: "Product not found"});
        }
    
        // Check stock exists
        const exisitingStock = await prisma.stock.findUnique({
            where: {
                productId: Number(productId)
            }
        })
    
        // If stock exists -> Update
        if(exisitingStock) {
            const updatedStock = await prisma.stock.update({
                where: {
                    productId: Number(productId)
                },
                data: {
                    quantity: exisitingStock.quantity + quantity
                }
            });
    
            // If stock does not exists -> Create
            return res.status(200).json({message: "Stock updated Successfully",
                stock: updatedStock
            });
        }
    
        // if stock does not exists -> Create
            const newStock = await prisma.stock.create({
                data: {
                    productId: Number(productId),
                    quantity
                }
            })
            return res.status(201).json({message: "Stock created Successfully", stock: newStock })
    
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// remove stock
const removeStock = async(req, res) => {
    try{
        const {productId, quantity} = req.body;
    
        // Search for the stock
        const findStock = await prisma.stock.findUnique({
            where: {
                productId: Number(productId)
            }
        })
    
        if(!findStock) {
            return res.status(404).json({message: "Stock not found"});
        }
    
        // stockQuantity is not greater than the available quantity
        if(findStock.quantity < quantity) {
            return res.status(400).json({message: "Insuffient Stock"});
        }
    
        const updatedStock = await prisma.stock.update({
            where: {
                productId: Number(productId)
            },
            data: {
                quantity : findStock.quantity - quantity
            }
        })
    
        return res.status(200).json({message: "Removal is allowed", stock: updatedStock});
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// Get stock
const getStock = async(req, res) => {
    try{
        const {productId} = req.body;
    
        if(!productId) {
            return res.status(400).json({message: "ProductId is required"});
        }
    
        // Find stock using product
        const stock = await prisma.stock.findUnique({
            where: {
                productId: Number(productId)
            }
        })
    
        if(!stock) {
            return res.status(404).json({message: "Stock not found"});
        }
    
        return res.status(200).json({message: "Stock found", stock})
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// All stocks
const allStock = async(req, res) => {
    try{
        const stocks = await prisma.stock.findMany({
            include: {
                product: true,
            }
        });

        return res.status(200).json({message: "All stocks fetched Successfully", stocks});
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    addStock,
    removeStock,
    getStock,
    allStock,
}
