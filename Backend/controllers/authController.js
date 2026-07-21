require("dotenv").config();
const bcrypt = require('bcrypt');
const prisma = require('../prisma/client')
const jwt = require('jsonwebtoken');

const signup = async(req, res) => {
    try{
        const {name, email, password} = req.body;
    
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
        if(existingUser) {
            return res.status(409).json({message: "User already exists"});
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,  
                password: hashedPassword,
            }
        })
    
        return res.status(200).json({message: "User created"});
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

const login = async(req,res) => {
    try{
        const { email, password } = req.body;
        console.log(req.body);
        
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message: "Invalid password"});
        }
    
        // jwt.sign(payload, secretKey, options);
        const token = jwt.sign(
            { id: user.id, email: user.email}, process.env.JWT_SECRET, {
                expiresIn: "7d",
            }
        )
    
        // This means save the cookie
        res.cookie("token", token, {
            httpOnly: true,
        })
    
        return res.status(200).json({ message: "Login successful" });
    } catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// exports data
module.exports = {
    signup,
    login
}
