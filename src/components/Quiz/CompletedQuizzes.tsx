"use client";

import useCompletedQuizzes from "@/src/hooks/instractor/quiz/useCompletedQuizzes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash2, Calendar, Code, AlertCircle } from "lucide-react";
import useViewQuiz from "@/src/hooks/instractor/quiz/useViewQuiz";
import { useState } from "react";
import ViewQuizDialog from "./ViewQuizDialog";
import useDeleteQuiz from "@/src/hooks/instractor/quiz/useDeleteQuiz";
import ConfirmDeleteDialog from "../shared/DeleteConfirmation/DeleteConfirmation";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/src/context/AuthContext/AuthContext";

export default function CompleteQuizzes() {
  const { quizzes, isLoading } = useCompletedQuizzes();
  const { quiz, getQuiz } = useViewQuiz();

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const { user } = useAuth();
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

  const getDifficultyStyles = (difficulty: string = "") => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]";
      case "medium":
        return "bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]";
      default:
        return "bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]";
    }
  };

  return (
    <section className="mt-10 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-[#2C1A11]">
        Completed Quizzes
      </h2>

      {isLoading && (
        <>
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="p-5 border border-[#EAD5C3] rounded-xl bg-white space-y-3">
                <Skeleton className="h-5 w-2/3 bg-[#F5E6DA]/60" />
                <Skeleton className="h-4 w-full bg-[#F5E6DA]/60" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full bg-[#F5E6DA]/60" />
                  <Skeleton className="h-6 w-16 rounded-full bg-[#F5E6DA]/60" />
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block rounded-xl border border-[#EAD5C3] bg-white overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-[#FAF2EC]">
                <TableRow className="border-[#EAD5C3] hover:bg-transparent">
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                    <Skeleton className="h-4 w-12 bg-[#EAD5C3]/70" />
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                    <Skeleton className="h-4 w-20 bg-[#EAD5C3]/70" />
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                    <Skeleton className="h-4 w-10 bg-[#EAD5C3]/70" />
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                    <Skeleton className="h-4 w-16 bg-[#EAD5C3]/70" />
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                    <Skeleton className="h-4 w-12 bg-[#EAD5C3]/70" />
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                    <Skeleton className="h-4 w-16 bg-[#EAD5C3]/70" />
                  </TableHead>
                  <TableHead className="px-6 py-4 text-center text-[#5C4636] font-bold">
                    <Skeleton className="h-4 w-14 bg-[#EAD5C3]/70" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 4 }).map((_, index) => (
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
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {!isLoading && (
        <>
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {quizzes?.map((quiz: any) => (
              <div
                key={quiz._id}
                className="p-5 border border-[#EAD5C3] rounded-xl bg-white shadow-sm flex flex-col justify-between space-y-4 hover:border-[#D9C1AC] transition-all">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <h3 className="font-bold text-[#2C1A11] text-base leading-tight">
                      {quiz.title}
                    </h3>
                    <span className="bg-[#F5E6DA] px-2 py-0.5 rounded text-[11px] font-mono text-[#5C4636] border border-[#EAD5C3] whitespace-nowrap">
                      {quiz.code}
                    </span>
                  </div>

                  <p className="text-sm text-[#7A6453] line-clamp-2 mb-3">
                    {quiz.description || "No description provided."}
                  </p>

                  <div className="flex flex-wrap gap-2 items-center text-xs">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getDifficultyStyles(quiz.difficulty)}`}>
                      {quiz.difficulty?.toUpperCase()}
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        quiz.status?.toLowerCase() === "open"
                          ? "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]"
                          : "bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]"
                      }`}>
                      {quiz.status?.toUpperCase()}
                    </span>

                    <div className="flex items-center gap-1 text-[#7A6453] ml-auto text-[11px]">
                      <Calendar size={13} />
                      <span>
                        {quiz.schadule
                          ? new Date(quiz.schadule).toLocaleDateString("en-GB")
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#F4E3D4]">
                  <button
                    onClick={() => handleView(quiz._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 text-xs font-semibold transition cursor-pointer">
                    <Eye size={15} />
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteClick(quiz._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 text-xs font-semibold transition cursor-pointer">
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block rounded-xl border border-[#EAD5C3] bg-white overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-[#FAF2EC]">
                <TableRow className="border-[#EAD5C3] hover:bg-transparent">
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                    Quiz
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                    Description
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                    Code
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                    Difficulty
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                    Status
                  </TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">
                    Schedule
                  </TableHead>
                  {user?.role === "Instructor" && (
                    <TableHead className="px-6 py-4 text-center text-[#5C4636] font-bold">
                      Actions
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {quizzes?.map((quiz: any) => (
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
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyStyles(quiz.difficulty)}`}>
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

                    {user?.role === "Instructor" && (
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
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {quizzes?.length === 0 && (
            <div className="text-center py-12 border border-dashed border-[#EAD5C3] rounded-xl bg-[#FAF2EC]/30 text-[#7A6453] flex flex-col items-center justify-center gap-2">
              <AlertCircle size={28} className="text-[#BAA390]" />
              <p className="font-medium">No completed quizzes found.</p>
            </div>
          )}
        </>
      )}

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