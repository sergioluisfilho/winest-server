import { login } from "../services/auth";

class LoginController {
  static async auth(req, res) {
    const { email, password } = req.body;
    const { status, data } = await login({ email, password });
    return res.status(status).send(data);
  }
}

export default LoginController;
