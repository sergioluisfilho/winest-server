import { createPost, listPosts, likePost } from "../services/post";

class PostController {
  static async create(req, res) {
    const { status, data } = await createPost(req.body);
    return res.status(status).send(data);
  }

  static async show(req, res) {
    const { status, data } = await listPosts(req.query);
    return res.status(status).send(data);
  }

  static async like(req, res) {
    const postId = req.params.id;
    const { status, data } = await likePost(postId);
    return res.status(status).send(data);
  }
}

export default PostController;