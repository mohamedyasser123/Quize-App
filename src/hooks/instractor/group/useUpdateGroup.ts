"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Group, GroupFormData } from "@/src/types/instractor/group/group-type";

interface UseUpdateGroupProps {
  group: Group;
  onUpdateGroup: (
    id: string,
    data: GroupFormData
  ) => Promise<void>;
}

export default function useUpdateGroup({
  group,
  onUpdateGroup,
}: UseUpdateGroupProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<GroupFormData>({
    defaultValues: {
      name: group.name,
      students: group.students,
    },
  });

  useEffect(() => {
    reset({
      name: group.name,
      students: group.students,
    });
  }, [group, reset]);

  const onSubmit = async (data: GroupFormData) => {
    await onUpdateGroup(group._id, data);
  };

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    onSubmit,
  };
}