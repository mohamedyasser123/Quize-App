"use client";

import { useState } from "react";
import { getQuizByIdApi } from "@/src/services/instractor";
import { Quiz } from "@/src/types/instractor";

export default function useViewQuiz() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const getQuiz = async (id: string) => {
    try {

      const response = await getQuizByIdApi(id);

      setQuiz(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } 
  };

  return {
    quiz,
    getQuiz,
  };
}