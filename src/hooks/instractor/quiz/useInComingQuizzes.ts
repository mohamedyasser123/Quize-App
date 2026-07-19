"use client";

import { getIncomingQuizzesApi } from "@/src/services/instractor/quiz/quiz-api";
import { Quiz } from "@/src/types/instractor/Quiz/quiz-type";
import { useEffect, useState } from "react";

export default function useinComingQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setIsLoading(true);

        const response = await getIncomingQuizzesApi();
        setQuizzes(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return {
    quizzes,
    isLoading,
  };
}