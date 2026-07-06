"use client";

import { updateQuestionApi } from "@/src/services/instractor";
import { CreateQuestionData } from "@/src/types/instractor";
import { useState } from "react";
import toast from "react-hot-toast";


export default function useUpdateQuestion() {
  const [loading, setLoading] = useState(false);

  const updateQuestion = async (
    id: string,
    data: CreateQuestionData
  ) => {
    try {
      setLoading(true);

      const res = await updateQuestionApi(id, data);

      toast.success(res.message);
      return true;
    } catch {
      toast.error("Failed to update question");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateQuestion,
    loading,
  };
}