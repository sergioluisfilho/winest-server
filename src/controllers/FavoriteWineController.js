import { favorites, favorite, unfavorite } from "../services/favoriteWine";

class FavoriteWineController {
  static async show(req, res) {
    const { id } = req.user;
    const { status, data } = await favorites(id);
    return res.status(status).send(data);
  }
  static async create(req, res) {
    const wineId = req.params.id;
    const userId = req.user.id;
    const { status, data } = await favorite(wineId, userId);
    return res.status(status).send(data);
  }
  static async remove(req, res) {
    const wineId = req.params.id;
    const userId = req.user.id;
    const { status, data } = await unfavorite(wineId, userId);
    return res.status(status).send(data);
  }
}

export default FavoriteWineController;
