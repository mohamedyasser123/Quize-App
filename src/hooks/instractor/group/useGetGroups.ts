"use client";

import { getAllGroupsApi } from "@/src/services/instractor/group/group-api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useGetGroups() {
  const [groups, setGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getGroups = async () => {
    try {
      setIsLoading(true);

      const response = await getAllGroupsApi();

      setGroups(response?.data || response || []);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load groups"
      );
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
    refetch: getGroups,
  };
}