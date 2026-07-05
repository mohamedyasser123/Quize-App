"use client";

import { deleteQuestionApi } from "@/src/services/instractor";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useDeleteQuestion() {
  const [loading, setLoading] = useState(false);

  const deleteQuestion = async (id: string) => {
    try {
      setLoading(true);

      const res = await deleteQuestionApi(id);

      toast.success(res.message);

      return true;
    } catch {
      toast.error("Failed to delete question");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteQuestion,
    loading,
  };
}