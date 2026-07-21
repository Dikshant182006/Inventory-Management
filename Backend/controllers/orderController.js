const prisma = require("../prisma/client");

// Create Order
const createOrder = async (req, res) => {
  try {
    const { customerName, status } = req.body;

    const productId = Number(req.body.productId);
    const quantity = Number(req.body.quantity);
    const price = Number(req.body.price);
    const totalAmount = Number(req.body.totalAmount);

    const stock = await prisma.stock.findUnique({
      where: {
        productId: Number(productId),
      },
    });

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    if (stock.quantity < quantity) {
      return res.status(400).json({ message: "Insuffient stock" });
    }

    // creates order
    const order = await prisma.order.create({
      data: {
        customerName,
        totalAmount,
        status,
      },
    });

    // orderItem
    const orderItem = await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId,
        quantity,
        price,
      },
    });

    // decrease stock
    await prisma.stock.update({
      where: {
        productId: productId,
      },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });

    // create orderHistory
    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await prisma.stockHistory.create({
      data: {
        productId: Number(productId),
        productName: product.name,
        type: "ORDER_CREATED",
        quantity: quantity,
      },
    });

    return res.status(201).json({
      message: "Order created Successfully!",
      order,
      orderItem,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get Order History
const getOrderHistory = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: {
          in: ["SHIPPED", "DELIVERED", "CANCELLED"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// get all Order
const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: true,
      },
    });

    res.status(200).json({ message: "Orders fetched Successfully!", orders });
  } catch (error) {
    console.log(error);
  }
};

// get Single Order
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Order ID:", id);

    const order = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return res.status(200).json({ message: "Get the single order!", order });
  } catch (error) {
    console.log(error);
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    return res
      .status(200)
      .json({ message: "Status updated Successfully", order });
  } catch (error) {
    console.log(error);
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // find all products in the order
    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId: Number(id),
      },
      include: {
        product: true,
      },
    });

    // restore stock
    for (const item of orderItems) {
      await prisma.stock.update({
        where: {
          productId: item.productId,
        },
        data: {
          quantity: {
            increment: item.quantity,
          },
        },
      });

      // create history
      await prisma.stockHistory.create({
        data: {
          productId: item.productId,
          productName: item.product.name,
          type: "ORDER_REMOVED",
          quantity: item.quantity,
        },
      });
    }

    // delete order Item
    await prisma.orderItem.deleteMany({
      where: {
        orderId: Number(id),
      },
    });

    // Delete the order
    await prisma.order.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({ message: "Order deleted Successfully!" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createOrder,
  getOrderHistory,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
