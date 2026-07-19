# Order Management System

A full-stack Order Management System designed to simplify product management, inventory tracking, and order processing. The application provides a complete workflow for managing products, stocks, orders, users, and real-time inventory activities.

The system helps businesses maintain accurate stock records, track order operations, and monitor inventory changes through a centralized dashboard.

## Features

## Authentication & Authorization

- User registration and login
- Secure password encryption
- JWT-based authentication
- Protected API routes
- User authorization system
- Secure access to application resources

## Dashboard

- Overview of business activities
- Total products count
- Total available stock
- Total orders
- Pending orders
- Recent order activity

## Product Management

- Add new products
- View all products
- View individual product details
- Update product information
- Delete products
- Manage product categories and details

## Inventory Management

- Add stock to products
- Remove stock from inventory
- Automatically update stock quantity
- Prevent insufficient stock operations
- Maintain accurate inventory records

## Order Management

- Create new orders
- Select products dynamically
- Automatically reduce stock after order placement
- Track order status
- View complete order details
- Manage order history

## Stock History Tracking

The system maintains complete inventory activity logs.

Tracks:

- Stock Added
- Stock Removed
- Products Sold through Orders

Each history record contains:

- Product name
- Product ID
- Quantity
- Action type
- Created timestamp

# Tech Stack

## Frontend

- Next.js
- React.js
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- Prisma ORM

## Database

- MySQL

# Project Architecture

```
Order Management System

├── Frontend
│   ├── Pages
│   ├── Components
│   ├── API Integration
│   └── UI Styling
│
├── Backend
│   ├── Controllers
│   ├── Routes
│   ├── Middleware
│   ├── Prisma
│   └── Server Configuration
│
└── Database
    ├── Users
    ├── Products
    ├── Stocks
    ├── Orders
    └── Stock History
```

# Database Models

## User

Handles authentication data:

- Name
- Email
- Password
- User information

## Product

Stores product details:

- Product name
- Price
- Description
- Category
- SKU

## Stock

Maintains current inventory:

- Product reference
- Available quantity

## Order

Stores customer order information:

- Customer name
- Total amount
- Order status
- Order date

## Order Item

Stores products inside an order:

- Product reference
- Quantity
- Price

## Stock History

Maintains inventory activity:

- Product details
- Stock action type
- Quantity changes
- Timestamp

# API Endpoints

## Authentication

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/profile
```

## Product

```
POST    /api/product
GET     /api/product
GET     /api/product/:id
PUT     /api/product/:id
DELETE  /api/product/:id
```

## Stock

```
POST    /api/stock
GET     /api/stock
DELETE  /api/stock
GET     /api/stock/:productId
```

## Orders

```
POST    /api/order
GET     /api/order
GET     /api/order/history
GET     /api/order/:id
PUT     /api/order/:id
DELETE  /api/order/:id
```

## History

```
GET /api/history
GET /api/history/:productId
```

# Installation & Setup

## Clone Repository

```bash
git clone <repository-url>
```

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```
DATABASE_URL="your_database_url"
JWT_SECRET="your_secret_key"
```

Run database migration:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start application:

```bash
npm run dev
```

# Application Workflow

1. User creates an account and logs in.
2. Authorized users can manage products.
3. Stock is added for available products.
4. Customers place orders.
5. Inventory automatically updates after orders.
6. Every stock movement is recorded.
7. Dashboard displays updated business information.

# Security Features

- Password hashing
- JWT authentication
- Protected routes
- Input validation
- Secure API communication

# Future Enhancements

- Role-based permission management
- Invoice generation
- Payment integration
- Email notifications
- Advanced analytics
- Product image management

# License

This project is open-source and available for learning, development, and customization.
