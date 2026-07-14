const bcrypt = require('bcrypt');
const prisma = require('../Backend/prisma/client');

const signup = async(req, res) => {
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

    return res.json({message: "User created"})
}
