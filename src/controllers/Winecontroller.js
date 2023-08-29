import { getWines, getWine, getOpenAiSugestion } from "../services/wine";
import { favorites } from "../services/favoriteWine";

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

  static async sugest(req, res) {
    const { id } = req.user;
    const { data: favoriteWines } = await favorites(id);
    const { status, data } = await getOpenAiSugestion(id, favoriteWines);
    return res.status(status).send(data);
  }
}
export default WineController;
