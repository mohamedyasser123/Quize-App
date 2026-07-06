"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { deleteQuizApi } from "@/src/services/instractor";

export default function useDeleteQuiz(onSuccess?: () => void) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteQuiz = async (id: string) => {
    try {
      setIsDeleting(true);
      setError(null);

      const response = await deleteQuizApi(id);

      toast.success(response.message || "Quiz deleted successfully!");

      onSuccess?.();

      return response;
    } catch (err: any) {
      console.error(err);

      setError(err?.response?.data?.message || "Something went wrong");

      toast.error(
        err?.response?.data?.message || "Failed to delete quiz."
      );

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