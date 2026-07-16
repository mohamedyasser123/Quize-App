"use client";

import { deleteStudentApi } from "@/src/services/instractor/student/student-api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useDeleteStudent() {
  const [loading, setLoading] = useState(false);

  const deleteStudent = async (id: string) => {
    try {
      setLoading(true);

      const res = await deleteStudentApi(id);

      toast.success(res.message);

      return true;
    } catch {
      toast.error("Failed to delete Student");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteStudent,
    loading,
  };
}