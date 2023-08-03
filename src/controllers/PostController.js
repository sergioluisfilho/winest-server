import { createPost, listPosts } from "../services/post";

class PostController {
  static async create(req, res) {
    const { id } = req.user;
    const { status, data } = await createPost(id, req.body, req.file?.location);
    return res.status(status).send(data);
  }

  static async show(req, res) {
    const { status, data } = await listPosts(req.query);
    return res.status(status).send(data);
  }
}

export default PostController;
