"use client";

import { useEffect, useState } from "react";
import { getQuizWithoutAnswersApi } from "@/src/services/student/learner-api";
import toast from "react-hot-toast";

export default function useQuizQuestions(quizId: string) {
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getQuizQuestions = async () => {
    try {
      setLoading(true);

      const response = await getQuizWithoutAnswersApi(quizId);

      setQuiz(response.data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to load quiz"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizId) getQuizQuestions();
  }, [quizId]);

  return {
    quiz,
    loading,
  };
}