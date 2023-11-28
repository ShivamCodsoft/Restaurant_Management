const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const router = require('express').Router()
const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user", // Set the default role to "user"
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

loginSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id.toString(), role: this.role }, "This is restaurant website");
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.error("Error is", error);
    throw error;
  }
};

loginSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Login = mongoose.model("Login", loginSchema);
module.exports = Login;