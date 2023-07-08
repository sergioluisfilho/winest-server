import { createUser } from "../services/createUser";

class RegisterController {
  static async create(req, res) {
    try {
      const userId = await createUser(req.body);
      return res.status(201).send(`User ${userId} created successfully`);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
}

export default RegisterController;
