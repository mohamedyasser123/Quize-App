"use client";

import { searchQuestionsApi } from "@/src/services/instractor";
import { Question, SearchQuestionParams } from "@/src/types/instractor";
import { useState } from "react";
import toast from "react-hot-toast";


export default function useSearchQuestion() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const searchQuestions = async (params: SearchQuestionParams) => {
    try {
      setLoading(true);

      const data = await searchQuestionsApi(params);

      setQuestions(data);
    } catch {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    questions,
    loading,
    searchQuestions,
  };
}