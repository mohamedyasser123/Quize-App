import axiosInstance from "../axiosClient";

export const getAllStudentsApi = async () => {
  const { data } = await axiosInstance.get("/api/student");

  return data;
};

export const getStudentsWithoutGroupApi = async () => {
  const { data } = await axiosInstance.get(
    "/api/student/without-group"
  );

  return data;
};