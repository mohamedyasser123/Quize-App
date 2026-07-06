import { CreateQuestionData, Question, SearchQuestionParams } from "@/src/types/instractor/question/question-type";
import axiosInstance from "../../axiosClient";

export const getAllQuestionsApi = async (): Promise<Question[]> => {
  const { data } = await axiosInstance.get("/api/question");
  return data;
};

export const getQuestionByIdApi = async (
  id: string
): Promise<Question> => {
  const { data } = await axiosInstance.get(`/api/question/${id}`);
  return data;
};

export const createQuestionApi = async (
  body: CreateQuestionData
) => {
  const { data } = await axiosInstance.post("/api/question", body);
  return data;
};

export const updateQuestionApi = async (
  id: string,
  body: CreateQuestionData
) => {
  const { data } = await axiosInstance.put(`/api/question/${id}`, body);
  return data;
};

export const deleteQuestionApi = async (id: string) => {
  const { data } = await axiosInstance.delete(`/api/question/${id}`);
  return data;
};

export const searchQuestionsApi = async (
  params: SearchQuestionParams
): Promise<Question[]> => {
  const { data } = await axiosInstance.get("/api/question/search", {
    params,
  });

  return data;
};