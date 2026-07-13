import { StudentsResponse } from "@/src/types/instractor/students/student-type";
import axiosInstance from "../axiosClient";

export const getStudentsApi = async (): Promise<StudentsResponse> => {
  const { data } = await axiosInstance.get("/api/student");

  return data;
};

export const joinQuizApi = async (code: string) => {
  const { data } = await axiosInstance.post("/api/quiz/join", {
    code,
  });


  return data;
};


export const getQuizWithoutAnswersApi = async (quizId: string) => {
  const { data } = await axiosInstance.get(
    `/api/quiz/without-answers/${quizId}`
  );

  return data;
};



export const submitQuizApi = async (
  quizId: string,
  answers: {
    question: string;
    answer: string;
  }[]
) => {
  const { data } = await axiosInstance.post(
    `/api/quiz/submit/${quizId}`,
    {
      answers,
    }
  );

  return data;
};