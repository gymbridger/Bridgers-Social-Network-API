const User = require("../models/User");

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({})
        .select("-__v")
        .populate("friends")
        .populate("thoughts");
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user by its id
  getUserById: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");

      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a user by its id
  updateUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a user by its id
  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Add a friend to a user's friend list
  addFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      ).populate("friends");

      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Remove a friend from a user's friend list
  removeFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      ).populate("friends");

      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = userController;
