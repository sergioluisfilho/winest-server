import { createUser } from "../services/createUser";

class RegisterController {
  static async create(req, res) {
    const { status, data } = await createUser(req.body);
    return res.status(status).send(data);
  }
}

export default RegisterController;
