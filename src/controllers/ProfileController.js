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

  static async upload(req, res) {
    const { id } = req.user;
    if (!req.file) {
      return res.status(400).send("Nenhum arquivo foi enviado.");
    }
    const fileUrl = req.file.location; // Obtém a URL de acesso à imagem
    const { status, data } = await updateProfile(id, {
      profilePictureUrl: fileUrl,
    });
    return res.status(status).send(data);
  }
}

export default ProfileController;
