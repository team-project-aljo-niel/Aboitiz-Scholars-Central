const User = require('../models/user');

const userController = {
  // Endpoint to get all Users
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.find();
      res.json(allUsers);
    } catch (error) {
      res.status(500).send('Error getting Users');
    }
  },

  // Endpoint to change access of user based on Id
  changeAccess: async (req, res) => {
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        access: req.body.access,
      });

      res.status(200).send('User Access changed succesfully');
    } catch (error) {
      res.status(500).send('Error changing access');
    }
  },
};

module.exports = userController;
