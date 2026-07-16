import { StudentsResponse } from "@/src/types/instractor/students/student-type";
import axiosInstance from "../../axiosClient";
import { StudentWithoutGroup } from "@/src/types/student";

export const getStudentsApi = async (): Promise<StudentsResponse> => {
  const { data } = await axiosInstance.get("/api/student");

  return data;
};
export const deleteStudentApi = async (id: string) => {
  const { data } = await axiosInstance.delete(`/api/student/${id}`);
  return data;
};




export const getStudentsWithoutGroupApi = async (): Promise<StudentWithoutGroup[]> => {
  const { data } = await axiosInstance.get<StudentWithoutGroup[]>(
    "/api/student/without-group"
  );

  return data;
};