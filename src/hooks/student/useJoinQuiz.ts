"use client";

import { joinQuizApi } from "@/src/services/student/learner-api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useJoinQuiz(onSuccess?: () => void) {
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();

  const joinQuiz = async (code: string) => {
    try {
      setIsJoining(true);

      const response = await joinQuizApi(code);

      toast.success("Joined quiz successfully");

      onSuccess?.();

      const quizId = response.data.quiz;

      router.push(`/quizzes/${quizId}`);

      return response;
    } catch (error: any) {
      console.log(error.response);

      toast.error(
        error?.response?.data?.message || "Failed to join quiz"
      );

      throw error;
    } finally {
      setIsJoining(false);
    }
  };

  return {
    joinQuiz,
    isJoining,
  };
}