import { StudentsResponse } from "@/src/types/student";
import axiosInstance from "../axiosClient";


export const getStudentsApi = async (): Promise<StudentsResponse> => {
  const { data } = await axiosInstance.get("/api/student");

  return data;
};