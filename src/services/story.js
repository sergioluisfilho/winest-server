import { prisma } from "../db/prisma";

export const createStory = async (userId, storyUrl) => {
  try {
    const newStory = await prisma.story.create({
      data: {
        authorId: userId,
        imgSource: storyUrl,
      },
    });
    return {
      status: 200,
      data: newStory,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: error,
    };
  }
};

export const getStories = async (userId) => {
  try {
    const unviewedStories = await prisma.story.findMany({
      where: {
        views: {
          none: {
            viewerId: userId,
          },
        },
      },
    });
    return {
      status: 200,
      data: unviewedStories,
    };
  } catch (error) {
    return {
      statusCode: 500,
      data: error,
    };
  }
};

export const viewStory = async (userId, storyId) => {
  try {
    const viewedStory = await prisma.storyView.create({
      data: {
        storyId: +storyId,
        viewerId: userId,
      },
    });
    return {
      status: 200,
      data: viewedStory,
    };
  } catch (error) {
    return {
      status: 500,
      data: error,
    };
  }
};
