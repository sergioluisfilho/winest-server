const createUser = require("../services/createUser");

class RegisterController {
  static async create(req, res) {
    const { user } = req.body;
    try {
      const userId = await createUser(user);
      return res.status(201).send(`User ${userId} created successfully`);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
}

module.exports = RegisterController;
