"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import GroupCard from "./GroupCard";
import AddGroupForm from "./AddGroupForm";
import { Group, GroupFormData } from "@/src/types/group/group-type";
import { createGroupApi } from "@/src/services/group";

interface GroupsListProps {
  groups: Group[];
  isLoading: boolean;
  onGroupsChange: () => Promise<void>;
}

export default function GroupsList({
  groups,
  isLoading,
  onGroupsChange,
}: GroupsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);

  const groupsPerPage = 6;

  const totalPages = Math.ceil(
    groups.length / groupsPerPage
  );

  const startIndex =
    (currentPage - 1) * groupsPerPage;

  const currentGroups = groups.slice(
    startIndex,
    startIndex + groupsPerPage
  );

  const handleCreateGroup = async (
    data: GroupFormData
  ) => {
    await createGroupApi(data);
    await onGroupsChange();
  };

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (isLoading) {
    return <p>Loading groups...</p>;
  }

  return (
  <>
    <div className="w-full">
     <div className="flex justify-end mb-4">
  <button
    type="button"
    onClick={() => setIsAddGroupOpen(true)}
    className="flex items-center gap-2 border border-gray-400 rounded-full px-3 py-1.5 text-lg font-medium hover:bg-gray-50 transition"
  >
    <span className="w-6 h-6 rounded-full bg-[#1E293B] flex items-center justify-center">
      <Plus className="w-4 h-4 text-white stroke-4" />
    </span>

    <span>Add Group</span>
  </button>
</div>

      <div className="border border-gray-300 rounded-lg p-5">
        <h2 className="text-xl font-semibold mb-5">
          Groups List
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentGroups.map((group) => (
            <GroupCard
              key={group._id}
              group={group}
              onGroupsChange={onGroupsChange}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-5 text-lg">
            <span>...</span>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "font-bold underline"
                    : "font-normal"
                }
              >
                {page}
              </button>
            ))}

            <span>...</span>
          </div>
        )}
      </div>
    </div>

    {isAddGroupOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="w-full max-w-150 mx-5">
          <AddGroupForm
            onCreateGroup={async (data) => {
              await handleCreateGroup(data);
              setIsAddGroupOpen(false);
            }}
            onClose={() => setIsAddGroupOpen(false)}
          />
        </div>
      </div>
    )}
  </>
);
}