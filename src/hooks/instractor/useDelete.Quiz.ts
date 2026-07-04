"use client";

import { useState } from "react";
import { deleteQuizApi } from "@/src/services/instractor";

export default function useDeleteQuiz(onSuccess?: () => void) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteQuiz = async (id: string) => {
    try {
      setIsDeleting(true);
      setError(null);

      const response = await deleteQuizApi(id);

      onSuccess?.(); 
      

      return response;
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong");
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteQuiz,
    isDeleting,
    error,
  };
}