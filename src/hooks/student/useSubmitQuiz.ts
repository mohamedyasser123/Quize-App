"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { submitQuizApi } from "@/src/services/student/learner-api";

export default function useSubmitQuiz() {
  const [loading, setLoading] = useState(false);

  const submitQuiz = async (
    quizId: string,
    answers: {
      question: string;
      answer: string;
    }[]
  ) => {
    try {
      setLoading(true);

      const response = await submitQuizApi(
        quizId,
        answers
      );

      toast.success(response.message);

      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit quiz"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitQuiz,
    loading,
  };
}