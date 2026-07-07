"use client";

import { useEffect, useState } from "react";
import { getResultApi } from "@/src/services/instractor/result/result-api";
import { QuizResult } from "@/src/types/instractor/result/result-type";

export default function useQuizResults() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getResults = async () => {
    try {
      setIsLoading(true);

      const response = await getResultApi();

      setResults(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  return {
    results,
    isLoading,
    getResults,
  };
}