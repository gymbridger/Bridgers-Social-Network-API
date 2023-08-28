const Thought = require("../models/Thought");

const thoughtController = {
  // Get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find({}).select("-__v");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by its id
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.id }).select(
        "-__v"
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found with this id" });
        return;
      }

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Create a new thought
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a thought by its id
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found with this id" });
        return;
      }

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a thought by its id
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });

      if (!thought) {
        res.status(404).json({ message: "No thought found with this id" });
        return;
      }

      res.json({ message: "Thought deleted!" });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Add a reaction to a thought
  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found with this id" });
        return;
      }

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Remove a reaction from a thought
  removeReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = thoughtController;
