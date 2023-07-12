import { likePost, unLikePost } from "../services/like";

class LikeController {
  static async like(req, res) {
    const postId = req.params.id;
    const { id } = req.user;
    const { status, data } = await likePost(postId, id);
    return res.status(status).send(data);
  }

  static async unlike(req, res) {
    const postId = req.params.id;
    const { id } = req.user;
    const { status, data } = await unLikePost(postId, id);
    return res.status(status).send(data);
  }
}

export default LikeController;
