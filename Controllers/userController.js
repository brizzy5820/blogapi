const bcrypt = require('bcryptjs');
const userModel = require('../src/model/userModel');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
        // check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role:role||'user'
        })
        res.status(201).json({ message: 'Registered Sucessfully' })
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(400).json({ message: "Invalid Password" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
        res.json({ message: "Login Successful", user, token })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        const user = await userModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getUser = async (req, res) => {
    res.status(200).json({ message: "User data" , user: req.user})
}
module.exports = {
    registerUser, loginUser, getUser, deleteUser
}
