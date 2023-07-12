import {
  createNotification,
  getNotifications,
  updateNotification,
} from "../services/notification";

class NotificationController {
  static async show(req, res) {
    const { id } = req.user;
    const { status, data } = await getNotifications(id);
    return res.status(status).send(data);
  }

  static async create(req, res) {
    const { status, data } = await createNotification(req.body);
    return res.status(status).send(data);
  }

  static async update(req, res) {
    const { id } = req.params;
    const { status, data } = await updateNotification(id);
    return res.status(status).send(data);
  }
}

export default NotificationController;
