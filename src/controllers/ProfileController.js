import { getProfile, updateProfile } from "../services/profile";

class ProfileController {
  static async index(req, res) {
    const { id } = req.user;
    const { status, data } = await getProfile(id);
    return res.status(status).send(data);
  }

  static async update(req, res) {
    const { id } = req.user;
    const { body } = req;
    const { status, data } = await updateProfile(id, body);
    return res.status(status).send(data);
  }
}

export default ProfileController;
