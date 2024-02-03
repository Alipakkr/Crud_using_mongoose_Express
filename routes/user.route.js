const { UserModel } = require("../model/user.model");

const express = require("express");

const userRouter = express.Router();

// --get-users-request--

userRouter.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send({ msg: "All User's Data", users });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

// --post-users-request--
userRouter.post("/users", async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ name: req.body.name });
    if (existingUser) {
      return res.status(400).send({ msg: "User already exists" });
    }
    const user = new UserModel(req.body);
    await user.save();
    res.status(200).send({ msg: "New user has been added" });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// --update-users-request--
userRouter.put("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await UserModel.findByIdAndUpdate({ _id: userId }, req.body);
    res.status(200).send({ msg: `User with id:${userId} has been updated` });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// --delete-users-request--
userRouter.delete("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await UserModel.findByIdAndDelete({ _id: userId }, req.body);
    res.status(200).send({ msg: `User with id:${userId} has been deleted` });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = { userRouter };
