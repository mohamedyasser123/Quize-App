import axiosInstance from "../axiosClient";


export const getIncomingQuizzesApi = async () => {
  const { data } = await axiosInstance.get("/api/quiz/incomming");
  return data;
};
