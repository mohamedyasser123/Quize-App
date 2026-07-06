"use client";

import { useEffect, useState } from "react";
import {
  Group,
  GroupFormData,
} from "@/src/types/instractor/group/group-type";
import { createGroupApi, getAllGroupsApi } from "@/src/services/instractor/group/group-api";


export default function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getGroups = async () => {
    try {
      setIsLoading(true);

      const response = await getAllGroupsApi();

      setGroups(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createGroup = async (payload: GroupFormData) => {
    try {
      setIsLoading(true);

      await createGroupApi(payload);

      await getGroups();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return {
    groups,
    isLoading,
    getGroups,
    createGroup,
  };
}