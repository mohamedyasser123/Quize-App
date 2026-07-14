"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface UseDeleteGroupProps {
  onDeleteGroup: (id: string) => Promise<void>;
}

export default function useDeleteGroup({
  onDeleteGroup,
}: UseDeleteGroupProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteGroup = async (id: string) => {
    try {
      setIsDeleting(true);

      await onDeleteGroup(id);

      toast.success("Group deleted successfully!");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete group."
      );

      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteGroup,
    isDeleting,
  };
}