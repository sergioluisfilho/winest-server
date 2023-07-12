import { seeComments, createComment } from "../services/comment";

class CommentController {
  static async seeComments(req, res) {
    const postId = req.params.id;
    const { status, data } = await seeComments(postId);
    return res.status(status).send(data);
  }

  static async createComment(req, res) {
    const postId = req.params.id;
    const { id } = req.user;
    const { status, data } = await createComment(postId, id);
    return res.status(status).send(data);
  }
}

export default CommentController;
