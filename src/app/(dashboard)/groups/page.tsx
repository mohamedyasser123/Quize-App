"use client";

import { useState } from "react";
import { Plus, Trash2, Edit3, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import useGetGroups from "@/src/hooks/instractor/group/useGetGroups";

import { Group, GroupFormData } from "@/src/types/instractor/group/group-type";
import GroupFormModal from "@/src/components/Groups/GroupFormModal";
import {
  createGroupApi,
  updateGroupApi,
} from "@/src/services/instractor/group/group-api";
import useDeleteGroup from "@/src/hooks/instractor/group/useDeleteGroup";
import { deleteGroupApi } from "@/src/services/instractor/group/group-api";
import ConfirmDeleteDialog from "@/src/components/shared/DeleteConfirmation/DeleteConfirmation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function GroupsPage() {
  const { groups, isLoading, refetch } = useGetGroups();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(groups.length / ITEMS_PER_PAGE);
  const currentGroups = groups.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // CREAT
  const handleCreateGroup = async (data: GroupFormData) => {
    await createGroupApi(data);
    await refetch();
  };

  // UPDATE
  const handleUpdateGroup = async (id: string, data: GroupFormData) => {
    await updateGroupApi(id, data);
    await refetch();
  };

  // DELETE
  const { deleteGroup, isDeleting } = useDeleteGroup({
    onDeleteGroup: async (id) => {
      await deleteGroupApi(id);
      await refetch();
    },
  });

  return (
    <>
      <div className="flex justify-end items-center mb-8">
        <Button
          onClick={() => {
            setSelectedGroup(null);
            setIsOpen(true);
          }}
          className="bg-white hover:bg-[#FFE9D8]/30 text-[#2C1A11] border border-[#EAD5C3] rounded-full px-5 py-2 text-sm font-semibold shadow-sm flex items-center gap-1.5 h-auto cursor-pointer">
          <Plus size={16} />
          Add Group
        </Button>
      </div>

      <div className="bg-white border border-[#EAD5C3] rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-[#2C1A11] mb-6">Groups list</h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#8C6D53]" />
          </div>
        ) : groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 border border-dashed border-[#EAD5C3] rounded-xl">
            <AlertCircle size={32} />
            <p>No groups found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentGroups.map((group: Group) => (
              <div
                key={group._id}
                className="p-6 border border-[#EAD5C3] rounded-2xl bg-[#FFE9D8]/10 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Group : {group.name}</h3>

                  <p className="text-xs mt-1">
                    No. of students : {group.students?.length ?? 0}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedGroup(group);
                      setIsOpen(true);
                    }}
                    className="p-2 hover:bg-[#FFE9D8]/40 rounded-lg cursor-pointer">
                    <Edit3 size={18} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedGroupId(group._id);
                      setDeleteDialogOpen(true);
                    }}
                    className="p-2 hover:bg-red-50 rounded-lg cursor-pointer">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <GroupFormModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedGroup(null);
        }}
        group={selectedGroup}
        onCreateSuccess={handleCreateGroup}
        onUpdateSuccess={handleUpdateGroup}
      />

      {/* DELETE COFIRMATION */}
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        loading={isDeleting}
        onConfirm={async () => {
          if (!selectedGroupId) return;

          await deleteGroup(selectedGroupId);

          setDeleteDialogOpen(false);
          setSelectedGroupId(null);
        }}
      />

      {/* PAGENATION */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent className="gap-1">
            {/* زر الصفحة السابقة */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    setCurrentPage((prev) => prev - 1);
                  }
                }}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-40 text-[#BAA390]"
                    : "cursor-pointer text-[#7A6453] hover:text-[#2C1A11] hover:bg-[#FFE9D8]/30 rounded-xl transition-colors"
                }
              />
            </PaginationItem>

            {/* أرقام الصفحات */}
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              const isActive = currentPage === pageNum;

              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={isActive}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(pageNum);
                    }}
                    className={`cursor-pointer rounded-xl transition-all h-10 w-10 flex items-center justify-center font-semibold ${
                      isActive
                        ? "bg-[#2C1A11] text-white hover:bg-[#2C1A11]/90 hover:text-white border-[#2C1A11]"
                        : "text-[#7A6453] hover:text-[#2C1A11] hover:bg-[#FFE9D8]/30 border border-transparent"
                    }`}>
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* زر الصفحة التالية */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    setCurrentPage((prev) => prev + 1);
                  }
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-40 text-[#BAA390]"
                    : "cursor-pointer text-[#7A6453] hover:text-[#2C1A11] hover:bg-[#FFE9D8]/30 rounded-xl transition-colors"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}