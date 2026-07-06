import { CreateQuizPayload, DeleteQuizResponse, Quiz } from "@/src/types/instractor/Quiz/quiz-type";
import axiosInstance from "../../axiosClient";

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