"use client";

import { useForm } from "react-hook-form";
import { GroupFormData } from "@/src/types/group/group-type";

interface UseCreateGroupProps {
  onCreateGroup: (data: GroupFormData) => Promise<void>;
}

export default function useCreateGroup({
  onCreateGroup,
}: UseCreateGroupProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<GroupFormData>({
    defaultValues: {
      name: "",
      students: [],
    },
  });

  const onSubmit = async (data: GroupFormData) => {
    await onCreateGroup(data);
    reset();
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
  };
}