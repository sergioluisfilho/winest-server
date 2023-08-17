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

export const getOpenAiSugestion = async () => {
  const text =
    "Vi aqui que sua conta não possui nenhum vinho na lista de favoritos para me ajudar. Portanto, aqui está um guia de vinhos recomendados para iniciantes.";
  const prompt = `Recomende melhores vinhos para iniciantes, utilize numeração na lista e traga alem do nome, uma breve descrição e o motivo pelo qual iniciantes costumam gostar. Inclua esse prompt no começo de todas as respostas ${text}`;
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
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
