import { searchUsers } from "../services/user";

class Usercontroller {
  static async show(req, res) {
    const { term } = req.query;
    const { status, data } = await searchUsers(term);
    return res.status(status).send(data);
  }
}

export default Usercontroller;
