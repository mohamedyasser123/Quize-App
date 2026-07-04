"use client";

import { getIncomingQuizzesApi } from "@/src/services/instractor";
import { useEffect, useState } from "react";

export default function useIncomingQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setIsLoading(true);

        const response = await getIncomingQuizzesApi();

        setQuizzes(response.data);
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