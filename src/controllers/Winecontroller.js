import { getWines, getWine } from "../services/wine";

class WineController {
  static async index(req, res) {
    const { id } = req.params;
    const { status, data } = await getWine(id);
    return res.status(status).send(data);
  }
  static async show(req, res) {
    const { offset, limit, search } = req.query;
    const { status, data } = await getWines(offset, limit, search);
    return res.status(status).send(data);
  }
}
export default WineController;
