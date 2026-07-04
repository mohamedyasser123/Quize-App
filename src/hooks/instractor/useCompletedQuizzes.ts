"use client";

import { useEffect, useState } from "react";
import { getCompletedQuizzesApi } from "@/src/services/instractor";

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