"use client";

import { createQuizApi } from "@/src/services/instractor/quiz/quiz-api";
import { CreateQuizPayload } from "@/src/types/instractor/Quiz/quiz-type";
import { useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import toast from "react-hot-toast";

type Props = {
  form: UseFormReturn<CreateQuizPayload>;
  onSuccess?: (code: string) => void;
};
export default function useCreateQuiz({
  form,
  onSuccess,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<CreateQuizPayload> = async (data) => {
    try {
      setIsLoading(true);

      const response = await createQuizApi(data);

      toast.success(response.message || "Quiz created successfully!");

      form.reset();

      onSuccess?.(response.data.code);
    } catch (error: any) {
      const errors = error?.response?.data?.additionalInfo?.errors;

      if (errors) {
        Object.values(errors).forEach((messages: any) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg: string) => {
              toast.error(msg);
            });
          }
        });
      } else {
        toast.error(
          error?.response?.data?.message || "Something went wrong"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
    isLoading,
  };
}