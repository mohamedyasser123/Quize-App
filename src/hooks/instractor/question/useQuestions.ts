"use client";


import { getAllQuestionsApi } from "@/src/services/instractor/question/question-api";
import { Question } from "@/src/types/instractor/question/question-type";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const getQuestions = async () => {
    try {
      setLoading(true);

      const data = await getAllQuestionsApi();

      setQuestions(data);
    } catch {
      toast.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return {
    questions,
    loading,
    getQuestions,
  };
}