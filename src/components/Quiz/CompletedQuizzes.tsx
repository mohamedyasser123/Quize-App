"use client";

import useCompletedQuizzes from "@/src/hooks/instractor/useCompletedQuizzes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash2 } from "lucide-react";
import useViewQuiz from "@/src/hooks/instractor/useViewQuiz";
import { useState } from "react";
import ViewQuizDialog from "./ViewQuizDialog";
import useDeleteQuiz from "@/src/hooks/instractor/useDelete.Quiz";
import ConfirmDeleteDialog from "../shared/DeleteConfirmation/DeleteConfirmation";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompleteQuizzes() {
  const { quizzes, isLoading } = useCompletedQuizzes();
  const { quiz, getQuiz } = useViewQuiz();

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const handleView = (id: string) => {
    setOpen(true);
    getQuiz(id);
  };

  const { deleteQuiz, isDeleting } = useDeleteQuiz(() => {
    window.location.reload();
  });

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    await deleteQuiz(deleteId);

    setOpenDelete(false);
    setDeleteId(null);
  };
  return (
    <section className="mt-10 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-[#2C1A11]">
        Completed Quizzes
      </h2>

      <div className="rounded-xl border border-[#EAD5C3] bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-[#FAF2EC]">
            <TableRow className="border-[#EAD5C3] hover:bg-transparent">
              <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                {isLoading ? (
                  <Skeleton className="h-4 w-12 bg-[#EAD5C3]/70" />
                ) : (
                  "Quiz"
                )}
              </TableHead>
              <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                {isLoading ? (
                  <Skeleton className="h-4 w-20 bg-[#EAD5C3]/70" />
                ) : (
                  "Description"
                )}
              </TableHead>
              <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                {isLoading ? (
                  <Skeleton className="h-4 w-10 bg-[#EAD5C3]/70" />
                ) : (
                  "Code"
                )}
              </TableHead>
              <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                {isLoading ? (
                  <Skeleton className="h-4 w-16 bg-[#EAD5C3]/70" />
                ) : (
                  "Difficulty"
                )}
              </TableHead>
              <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                {isLoading ? (
                  <Skeleton className="h-4 w-12 bg-[#EAD5C3]/70" />
                ) : (
                  "Status"
                )}
              </TableHead>
              <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                {isLoading ? (
                  <Skeleton className="h-4 w-16 bg-[#EAD5C3]/70" />
                ) : (
                  "Schedule"
                )}
              </TableHead>
              <TableHead className="px-6 py-4 text-center text-[#5C4636] font-bold">
                {isLoading ? (
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-14 bg-[#EAD5C3]/70" />
                  </div>
                ) : (
                  "Actions"
                )}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index} className="border-[#F4E3D4]">
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-28 bg-[#F5E6DA]/60" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-40 bg-[#F5E6DA]/60" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-5 w-16 rounded-md bg-[#F5E6DA]/60" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-5 w-20 rounded-full bg-[#F5E6DA]/60" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-5 w-16 rounded-full bg-[#F5E6DA]/60" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-24 bg-[#F5E6DA]/60" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <Skeleton className="h-4 w-4 bg-[#F5E6DA]/60" />
                        <Skeleton className="h-4 w-4 bg-[#F5E6DA]/60" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : quizzes?.map((quiz: any) => (
                  <TableRow
                    key={quiz._id}
                    className="border-[#F4E3D4] hover:bg-[#FFF9F5] transition-colors">
                    <TableCell className="px-6 py-4 font-semibold text-[#2C1A11]">
                      {quiz.title}
                    </TableCell>

                    <TableCell className="px-6 py-4 text-[#7A6453]">
                      {quiz.description || "-"}
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <span className="bg-[#F5E6DA] px-3 py-1 rounded-md text-xs font-mono text-[#5C4636] border border-[#EAD5C3]">
                        {quiz.code}
                      </span>
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          quiz.difficulty?.toLowerCase() === "easy"
                            ? "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]"
                            : quiz.difficulty?.toLowerCase() === "medium"
                              ? "bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]"
                              : "bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]"
                        }`}>
                        {quiz.difficulty?.toUpperCase()}
                      </span>
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          quiz.status?.toLowerCase() === "open"
                            ? "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]"
                            : "bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]"
                        }`}>
                        {quiz.status?.toUpperCase()}
                      </span>
                    </TableCell>

                    <TableCell className="px-6 py-4 text-[#7A6453]">
                      {quiz.schadule
                        ? new Date(quiz.schadule).toLocaleDateString("en-GB")
                        : "-"}
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleView(quiz._id)}
                          className="text-blue-600 hover:text-blue-800 transition cursor-pointer">
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleDeleteClick(quiz._id)}
                          className="text-red-500 hover:text-red-700 transition cursor-pointer">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

            {!isLoading && quizzes?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-[#7A6453]">
                  No completed quizzes found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ViewQuizDialog open={open} onOpenChange={setOpen} quiz={quiz} />

      <ConfirmDeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
    </section>
  );
}