"use client";

import { getStudentsApi } from "@/src/services/student/student-api";
import { Student } from "@/src/types/instractor/students/student-type";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useStudents(topOnly = false) {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStudents = async () => {
    try {
      setIsLoading(true);

      const response = await getStudentsApi();

      if (topOnly) {
        const topFive = [...response]
          .sort((a, b) => b.avg_score - a.avg_score)
          .slice(0, 5);

        setStudents(topFive);
      } else {
        setStudents(response);
      }
    } catch {
      toast.error("Failed to load students");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, [topOnly]);

  return {
    students,
    isLoading,
    refetch: getStudents,
  };
}