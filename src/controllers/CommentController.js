import { createComment } from "../services/comment";

class CommentController {
  // static async seeComments(req, res) { // Não precisa pois a rota post já traz todos por enquanto
  //   const postId = req.params.id;
  //   const { status, data } = await seeComments(postId);
  //   return res.status(status).send(data);
  // }

  static async createComment(req, res) {
    const postId = req.params.id;
    const { id } = req.user;
    const { content } = req.body;
    const { status, data } = await createComment(content, postId, id);
    return res.status(status).send(data);
  }
}

export default CommentController;
