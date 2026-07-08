import { StudentsResponse } from "@/src/types/instractor/students/student-type";
import axiosInstance from "../../axiosClient";

export const getStudentsApi = async (): Promise<StudentsResponse> => {
  const { data } = await axiosInstance.get("/api/student");

  return data;
};
export const deleteStudentApi = async (id: string) => {
  const { data } = await axiosInstance.delete(`/api/student/${id}`);
  return data;
};