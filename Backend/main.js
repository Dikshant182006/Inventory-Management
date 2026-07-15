const express = require('express');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(3000);
