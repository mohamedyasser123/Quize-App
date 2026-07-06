"use client";

import { getQuestionByIdApi } from "@/src/services/instractor";
import { Question } from "@/src/types/instractor";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function useQuestion(id: string) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(false);

  const getQuestion = async () => {
    try {
      setLoading(true);

      const data = await getQuestionByIdApi(id);

      setQuestion(data);
    } catch {
      toast.error("Failed to load question");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getQuestion();
    }
  }, [id]);

  return {
    question,
    loading,
    getQuestion,
  };
}