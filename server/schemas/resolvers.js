const { User, Recipe } = require("../models");

const resolvers = {
  Query: {
    recipes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Recipe.find(params).sort({ createdAt: -1 });
    },
    // place this inside of the `Query` nested object right after `recipes`
    recipe: async (parent, { _id }) => {
      return Recipe.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("recipes");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("recipes");
    },
  },
};

module.exports = resolvers;
