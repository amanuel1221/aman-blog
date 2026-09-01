require('dotenv').config();

const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const mongoose = require("mongoose");
const generateToken = require("../utils/generateToken.js");
const { validateRegisterInput, validateLoginInput } = require("../validators/auth.validator.js");
const { sendWelcomeEmail } = require("./emailService.js");

const registerUser = async (userData) => {


    const { name, email, password } = userData;
    validateRegisterInput({ name, email, password });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    await sendWelcomeEmail(user.name, user.email);



    const token = generateToken(user._id);


    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,

            role: user.role,
        },
        token,
    };
};


const loginUser = async (email, password) => {
    validateLoginInput(email, password);
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("Invalid credentials");
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }


    const token = generateToken(user._id);

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,

            role: user.role,
        },
        token,
    };
};


const getProfile = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("User not found");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
};