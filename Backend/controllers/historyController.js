const prisma = require('../prisma/client');

const getAllHistory = async (req, res) => {
    try{
        const history = await prisma.stockHistory.findMany({
            orderBy:{
                createdAt: "desc",
            },
        });
    
        return res.status(200).json({message: "History fetched Successfully", history});
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// Get history of the specific product -> used whwn we want one information
const getHistoryByProduct = async(req, res) => {
    try{
        const {productId} = req.body;
    
        const history = await prisma.stockHistory.findMany({
            where:{
                productId: Number(productId)
            },
            orderBy: {
                createdAt: "desc",
            }
        })
    
        if(history.length === 0 ) {
            return res.status(404).json({ message: "No history found for this product" })
        }
    
        return res.status(200).json({message: "No history found", history});
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }

}

module.exports = {
    getAllHistory,
    getHistoryByProduct,
}
