"use client";

import { useState } from "react";
import { SquarePen, Trash, X, Check } from "lucide-react";
import {
  Group,
  GroupFormData,
} from "@/src/types/group/group-type";
import UpdateGroupForm from "./UpdateGroupForm";
import { updateGroupApi } from "@/src/services/group";
import useDeleteGroup from "@/src/hooks/instractor/group/useDeleteGroup";

interface GroupCardProps {
  group: Group;
  onGroupsChange: () => Promise<void>;
}

export default function GroupCard({
  group,
  onGroupsChange,
}: GroupCardProps) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { deleteGroup, isDeleting } = useDeleteGroup({
    onGroupsChange,
  });

  const handleUpdateGroup = async (
    id: string,
    data: GroupFormData
  ) => {
    await updateGroupApi(id, data);

    await onGroupsChange();
  };

  const handleDeleteGroup = async () => {
    await deleteGroup(group._id);

    setIsDeleteOpen(false);
  };

  return (
    <>
      <div className="w-full h-24 border border-gray-300 rounded-lg px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Group : {group.name}
          </h2>

          <p className="text-sm text-gray-600">
            No. of students: {group.students.length}
          </p>
        </div>

        <div className="flex items-center gap-3">
  <button
    type="button"
    onClick={() => setIsUpdateOpen(true)}
    className="flex items-center justify-center hover:opacity-60 transition"
  >
    <SquarePen className="w-5 h-5 stroke-[2.5]" />
  </button>

  <button
  type="button"
  onClick={() => setIsDeleteOpen(true)}
  className="flex items-center justify-center hover:opacity-60 transition"
>
  <Trash className="w-5 h-5 stroke-[2.5]" />
</button>
</div>
      </div>

      {isUpdateOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div className="w-full max-w-150 mx-5">
      <UpdateGroupForm
        group={group}
        onUpdateGroup={handleUpdateGroup}
        onClose={() => setIsUpdateOpen(false)}
      />
    </div>
  </div>
)}
      {isDeleteOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div className="w-full max-w-150 mx-5 bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="flex items-stretch border-b border-gray-300">
        <div className="flex-1 px-10 py-7">
          <h2 className="text-2xl font-bold">
            Delete Group
          </h2>
        </div>

        <button
          type="button"
          disabled={isDeleting}
          onClick={handleDeleteGroup}
          className="w-18 flex items-center justify-center border-l border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          <Check className="w-7 h-7 stroke-3" />
        </button>

        <button
          type="button"
          disabled={isDeleting}
          onClick={() => setIsDeleteOpen(false)}
          className="w-18 flex items-center justify-center border-l border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          <X className="w-7 h-7 stroke-3" />
        </button>
      </div>

      <div className="px-10 py-8">
        <p className="text-lg font-semibold">
          Are you sure you want to delete this group?
        </p>

        <p className="text-gray-500 mt-3">
          Group:{" "}
          <span className="font-semibold text-black">
            {group.name}
          </span>
        </p>

        <p className="text-sm text-red-500 mt-5">
          This action cannot be undone.
        </p>

        {isDeleting && (
          <p className="text-sm text-gray-500 mt-3">
            Deleting group...
          </p>
        )}
      </div>
    </div>
  </div>
)}
    </>
  );
}