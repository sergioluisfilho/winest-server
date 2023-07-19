import { sendMessage } from "../services/message";
import { handleSendMessage } from "../utils/messageEmitter";

class MessageController {
  static async create(req, res) {
    const senderId = req.user.id;
    const destinataryId = parseInt(req.params.id);
    const { text } = req.body;
    const { status, data } = await sendMessage(senderId, destinataryId, text);
    handleSendMessage(destinataryId, senderId, { message: data });
    return res.status(status).json(data);
  }
}

export default MessageController;
