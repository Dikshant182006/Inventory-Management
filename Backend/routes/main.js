const express = require('express');
const authRoutes = require('./authRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = 3000;

const app = express();

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
}))

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
