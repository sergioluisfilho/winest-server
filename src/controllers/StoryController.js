import { getStories, createStory, viewStory } from "../services/story";

class StoryController {
  static async show(req, res) {
    const userId = req.user.id;
    const { status, data } = await getStories(userId);
    return res.status(status).send(data);
  }

  static async index(req, res) {
    const userId = req.user.id;
    const storyId = req.params.id;
    const { status, data } = await viewStory(userId, storyId);
    return res.status(status).send(data);
  }

  static async create(req, res) {
    const userId = req.user.id;
    const storyUrl = req.file?.location;
    if (!storyUrl) {
      return res.status(400).send({ data: "Upload Failed" });
    }
    const { status, data } = await createStory(userId, storyUrl);
    return res.status(status).send(data);
  }
}

export default StoryController;
