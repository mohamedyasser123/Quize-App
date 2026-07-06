import axiosInstance from "../axiosClient";
import { GroupFormData } from "@/src/types/group/group-type";

export const getAllGroupsApi = async () => {
  const { data } = await axiosInstance.get("/api/group");

  return data;
};

export const getGroupByIdApi = async (id: string) => {
  const { data } = await axiosInstance.get(`/api/group/${id}`);

  return data;
};

export const createGroupApi = async (payload: GroupFormData) => {
  const body = {
    name: payload.name,
    students: payload.students,
  };

  const { data } = await axiosInstance.post("/api/group", body);

  return data;
};

export const updateGroupApi = async (
  id: string,
  payload: GroupFormData
) => {
  const body = {
    name: payload.name,
    students: payload.students,
  };

  const { data } = await axiosInstance.put(`/api/group/${id}`, body);

  return data;
};

export const deleteGroupApi = async (id: string) => {
  const { data } = await axiosInstance.delete(`/api/group/${id}`);

  return data;
};