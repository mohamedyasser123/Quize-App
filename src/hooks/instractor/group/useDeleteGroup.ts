"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { deleteGroupApi } from "@/src/services/group";

interface UseDeleteGroupProps {
  onGroupsChange: () => Promise<void>;
}

export default function useDeleteGroup({
  onGroupsChange,
}: UseDeleteGroupProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteGroup = async (id: string) => {
    try {
      setIsDeleting(true);

      await deleteGroupApi(id);

      await onGroupsChange();

      toast.success("Group deleted successfully");
    } catch (error) {
      console.error("Error deleting group:", error);

      toast.error("Failed to delete group");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteGroup,
    isDeleting,
  };
}