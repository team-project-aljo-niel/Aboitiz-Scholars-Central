const User = require('../models/user');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.find();
      res.json(allUsers);
    } catch (error) {
      res.status(500).send('Error getting Users');
    }
  },

  changeAccess: async (req, res) => {
    console.log(User);
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        access: req.body.access,
      });

      res.status(200).send(updateUser);
    } catch (error) {
      res.status(500).send('Error changing access');
    }
  },
};

module.exports = userController;
