import axiosInstance from "../../axiosClient";

export const getResultApi = async () => {
  const { data } = await axiosInstance.get("/api/quiz/result");

  return data;
};