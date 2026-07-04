"use client";

import { createQuizApi } from "@/src/services/instractor";
import { useState } from "react";
import toast from "react-hot-toast";


export default function useCreateQuiz() {
  const [isLoading, setIsLoading] = useState(false);

  const createQuiz = async () => {
    try {
      setIsLoading(true);

      const response = await createQuizApi();

      toast.success(response.message);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createQuiz,
    isLoading,
  };
}