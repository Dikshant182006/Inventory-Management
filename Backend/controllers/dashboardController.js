const prisma = require('../prisma/client');

const getDashboardStats = async(req, res) => {
    try{
        const totalProducts = await prisma.product.count();

        const totalOrders = await prisma.order.count();

        const pendingOrder = await prisma.order.count({
            where:{
                status: "PENDING",
            }
        });

        const stock = await prisma.stock.aggregate({
            _sum: {
                quantity: true,
            }
        })

        res.status(200).json({
            totalProducts,
            totalOrders,
            pendingOrder,
            stock: stock._sum.quantity || 0,
        })
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    getDashboardStats
}
