import { CreateQuestionData, CreateQuizPayload, DeleteQuizResponse, Question, Quiz, SearchQuestionParams } from "@/src/types/instractor";
import axiosInstance from "../axiosClient";

// GET INCOMING QUIZZES
export const getIncomingQuizzesApi = async (): Promise<Quiz[]> => {
  const { data } = await axiosInstance.get<Quiz[]>("/api/quiz/incomming");

  return data;
};

// GET COMPLETED QUIZZES
export const getCompletedQuizzesApi = async (): Promise<Quiz[]> => {
  const { data } = await axiosInstance.get<Quiz[]>("/api/quiz/completed");

  return data;
};

// CREATE QUIZ
export const createQuizApi = async (payload: CreateQuizPayload) => {
  const { data } = await axiosInstance.post("/api/quiz", payload);

  return data;
};

// DELETE
export const deleteQuizApi = async (
  id: string
): Promise<DeleteQuizResponse> => {
  const { data } = await axiosInstance.delete<DeleteQuizResponse>(
    `/api/quiz/${id}`
  );

  return data;
};

//  GET QUIZ BY ID
export const getQuizByIdApi = async (
  id: string
): Promise<Quiz> => {
  const { data } = await axiosInstance.get<Quiz>(`/api/quiz/${id}`);

  return data;
};



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