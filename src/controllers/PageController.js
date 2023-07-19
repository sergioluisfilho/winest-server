import { getPage } from "../services/page";

class PageController {
  static async index(req, res) {
    const { id } = req.params;
    const { status, data } = await getPage(parseInt(id));
    return res.status(status).send(data);
  }
}

export default PageController;
