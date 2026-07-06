"use client";


import { createQuestionApi } from "@/src/services/instractor/question/question-api";
import { CreateQuestionData } from "@/src/types/instractor/question/question-type";
import { useState } from "react";
import toast from "react-hot-toast";


export default function useCreateQuestion() {
  const [loading, setLoading] = useState(false);

  const createQuestion = async (data: CreateQuestionData) => {
    try {
      setLoading(true);

      const res = await createQuestionApi(data);

      toast.success(res.message);
      return true;
    } catch {
      toast.error("Failed to create question");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createQuestion,
    loading,
  };
}