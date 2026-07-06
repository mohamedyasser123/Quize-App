"use client";

import { useEffect, useState } from "react";
import { Student } from "@/src/types/student/student-type";
import { getStudentsWithoutGroupApi } from "@/src/services/student";

export default function useStudentsWithoutGroup() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);

  const getStudents = async () => {
    try {
      setIsLoadingStudents(true);

      const response = await getStudentsWithoutGroupApi();

      setStudents(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return {
    students,
    isLoadingStudents,
    getStudents,
  };
}