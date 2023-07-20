import { prisma } from "../db/prisma";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getWines = async (offset, limit, search) => {
  try {
    let whereCondition = {
      AND: [],
    };
    if (search) {
      whereCondition.AND.push({
        title: { contains: search },
      });
    }
    // Do the same thing for any param you want to filter/search
    const wines = await prisma.wine.findMany({
      where: whereCondition,
      skip: +offset,
      take: +limit,
    });
    return {
      status: 200,
      data: wines,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: error.message,
    };
  }
};

export const getWine = async (id) => {
  try {
    const wine = await prisma.wine.findFirst({
      where: {
        id: +id,
      },
    });
    return {
      status: 200,
      data: wine,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: error,
    };
  }
};

export const getOpenAiSugestion = async (text) => {
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
    });
    console.log(chatCompletion.data.choices[0].message);
    return {
      status: 200,
      data: chatCompletion.data.choices[0].message,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: error,
    };
  }
};
