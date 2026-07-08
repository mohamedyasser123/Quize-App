"use client";

import { useEffect, useState } from "react";
import {
  CirclePlus,
  SquarePen,
  Trash,
} from "lucide-react";

import useGetGroups from "@/src/hooks/instractor/group/useGetGroups";
import useDeleteGroup from "@/src/hooks/instractor/group/useDeleteGroup";

import {
  createGroupApi,
  updateGroupApi,
} from "@/src/services/instractor/group/group-api";

import {
  Group,
  GroupFormData,
} from "@/src/types/instractor/group/group-type";

import AddEditGroupDialog from "@/src/components/Groups/AddEditGroupDialog";
import DeleteGroupDialog from "@/src/components/Groups/DeleteGroupDialog";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export default function GroupsPage() {
  const {
    groups,
    isLoading,
    refetch,
  } = useGetGroups();

  const {
    deleteGroup,
    isDeleting,
  } = useDeleteGroup({
    onGroupsChange: refetch,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [isAddEditOpen, setIsAddEditOpen] =
    useState(false);

  const [editingGroup, setEditingGroup] =
    useState<Group | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  const [selectedGroup, setSelectedGroup] =
    useState<Group | null>(null);

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

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleAddClick = () => {
    setEditingGroup(null);

    setIsAddEditOpen(true);
  };

  const handleEditClick = (group: Group) => {
    setEditingGroup(group);

    setIsAddEditOpen(true);
  };

  const handleGroupSubmit = async (
    data: GroupFormData
  ) => {
    if (editingGroup) {
      await updateGroupApi(
        editingGroup._id,
        data
      );
    } else {
      await createGroupApi(data);
    }

    await refetch();
  };

  const handleDeleteClick = (group: Group) => {
    setSelectedGroup(group);

    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedGroup) {
      return;
    }

    await deleteGroup(selectedGroup._id);

    setIsDeleteOpen(false);

    setSelectedGroup(null);
  };

  return (
    <main className="min-h-full w-full p-8">
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={handleAddClick}
          className="flex items-center gap-2 border border-gray-800 rounded-full px-4 py-2 font-medium hover:bg-gray-50 transition"
        >
          <CirclePlus
            className="w-6 h-6"
            fill="#0B2B3B"
            color="#ffffff"
          />

          <span>Add Group</span>
        </button>
      </div>

      <div className="w-full border border-gray-300 rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-8">
          Groups List
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-lg font-semibold">
              Loading groups...
            </p>
          </div>
        ) : groups.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-gray-500 text-lg">
              No groups available
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentGroups.map(
                (group: Group) => (
                  <div
                    key={group._id}
                    className="w-full h-24 border border-gray-300 rounded-lg px-6 py-4 flex items-center justify-between"
                  >
                    <div>
                      <h2 className="text-xl font-semibold">
                        Group : {group.name}
                      </h2>

                      <p className="text-sm text-gray-600">
                        No. of students:{" "}
                        {group.students?.length || 0}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleEditClick(group)
                        }
                        aria-label={`Edit ${group.name}`}
                        className="flex items-center justify-center hover:opacity-60 transition"
                      >
                        <SquarePen className="w-5 h-5 stroke-[2.5]" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteClick(group)
                        }
                        aria-label={`Delete ${group.name}`}
                        className="flex items-center justify-center hover:opacity-60 transition"
                      >
                        <Trash className="w-5 h-5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={
                          currentPage === page
                        }
                        onClick={(event) => {
                          event.preventDefault();

                          setCurrentPage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>

      <AddEditGroupDialog
        open={isAddEditOpen}
        onOpenChange={setIsAddEditOpen}
        group={editingGroup}
        onSubmit={handleGroupSubmit}
      />

      <DeleteGroupDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        groupName={selectedGroup?.name}
      />
    </main>
  );
}