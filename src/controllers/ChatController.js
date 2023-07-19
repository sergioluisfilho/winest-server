import { getChats, getChatData } from "../services/chat";

class ChatController {
  static async show(req, res) {
    const { status, data } = await getChats(req.user.id);
    return res.status(status).json(data);
  }

  static async index(req, res) {
    const { status, data } = await getChatData(+req.params.id);
    return res.status(status).json(data);
  }
}

export default ChatController;
