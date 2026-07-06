"use client";

import { getCompletedQuizzesApi } from "@/src/services/instractor/quiz/quiz-api";
import { useEffect, useState } from "react";

export default function useCompletedQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
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