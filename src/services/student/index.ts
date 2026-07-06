 feature/groups-crud
import axiosInstance from "../axiosClient";

export const getAllStudentsApi = async () => {
  const { data } = await axiosInstance.get("/api/student");

  return data;
};

export const getStudentsWithoutGroupApi = async () => {
  const { data } = await axiosInstance.get(
    "/api/student/without-group"
  );

import { StudentsResponse } from "@/src/types/student";
import axiosInstance from "../axiosClient";


export const getStudentsApi = async (): Promise<StudentsResponse> => {
  const { data } = await axiosInstance.get("/api/student");
 develop

  return data;
};