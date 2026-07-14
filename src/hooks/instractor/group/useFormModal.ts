"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Group,
  GroupFormData,
} from "@/src/types/instractor/group/group-type";
import toast from "react-hot-toast";

interface UseGroupFormProps {
  group?: Group | null;
  onCreateGroup: (data: GroupFormData) => Promise<void>;
  onUpdateGroup: (
    id: string,
    data: GroupFormData
  ) => Promise<void>;
}

export default function useGroupForm({
  group,
  onCreateGroup,
  onUpdateGroup,
}: UseGroupFormProps) {
  const isEdit = !!group;

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

  useEffect(() => {
    if (group) {
      reset({
        name: group.name,
        students: group.students,
      });
    } else {
      reset({
        name: "",
        students: [],
      });
    }
  }, [group, reset]);

  const onSubmit = async (data: GroupFormData) => {
    try {
      if (isEdit && group) {
        await onUpdateGroup(group._id, data);
        toast.success("Group updated successfully!");
      } else {
        await onCreateGroup(data);
        toast.success("Record created successfully");
        reset();
      }
    } catch (error: any) {
      const errorMessage = 
        error?.response?.data?.message || 
        error?.message || 
        "Something went wrong. Please try again.";
        
      toast.error(errorMessage);
      console.error("Group Form Error: ", error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
    isEdit,
  };
}