const { PrivateResultType } = require("@prisma/client/runtime/library");
const prisma = require("../prisma/client");

// Create Order
const createOrder = async (req, res) => {
  try {
    const { customerName, totalAmount, productId, quantity, price, status } =
      req.body;

    const order = await prisma.order.create({
      data: {
        customerName,
        totalAmount,
        status,
      },
    });

    const orderItem = await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId,
        quantity,
        price,
      },
    });

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

    await prisma.orderItems.deleteMany({
      where: {
        orderId: Number(order.id),
      },
    });

    await prisma.order.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({ message: "Order deleted Successfully!" });
  } catch (error) {
    console.log(error);
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
