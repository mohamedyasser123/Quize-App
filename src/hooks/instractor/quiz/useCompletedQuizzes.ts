"use client";

import { getCompletedQuizzesApi } from "@/src/services/instractor/quiz/quiz-api";
import { Quiz } from "@/src/types/instractor/Quiz/quiz-type";
import { useEffect, useState } from "react";

export default function useCompletedQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCompletedQuizzes = async () => {
      try {
        setIsLoading(true);

        const response = await getCompletedQuizzesApi();

        setQuizzes(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompletedQuizzes();
  }, []);

  return {
    quizzes,
    isLoading,
  };
}