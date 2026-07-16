"use client";

import { useEffect, useState } from "react";
import { getStudentsWithoutGroupApi } from "@/src/services/instractor/student/student-api";
import { StudentWithoutGroup } from "@/src/types/student";

export default function useStudentsWithoutGroup() {
  const [students, setStudents] = useState<StudentWithoutGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);

        const response = await getStudentsWithoutGroupApi();

        setStudents(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return {
    students,
    isLoading,
  };
}