"use client";

import { getStudentsApi } from "@/src/services/instractor/student-api";
import { Student } from "@/src/types/instractor/students/student-type";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [topStudents, setTopStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStudents = async () => {
    try {
      setIsLoading(true);

      const response = await getStudentsApi();

      setStudents(response);

      const topFive = [...response]
        .sort((a, b) => b.avg_score - a.avg_score)
        .slice(0, 5);

      setTopStudents(topFive);
    } catch {
      toast.error("Failed to load students");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return {
    students,
    topStudents,
    isLoading,
    refetch: getStudents,
  };
}