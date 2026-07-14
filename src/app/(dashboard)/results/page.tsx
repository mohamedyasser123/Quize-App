"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import useQuizResults from "@/src/hooks/instractor/result/useGetResult";
import { AlertCircle, Clock } from "lucide-react";
import CompletedQuizzes from "@/src/components/Quiz/CompletedQuizzes";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAuth } from "@/src/context/AuthContext/AuthContext";

export default function QuizResults() {
  const { results, isLoading } = useQuizResults();
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3; // 

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

  const safeResults = Array.isArray(results) ? results : [];
  const totalItems = safeResults.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = safeResults.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

    const { user } = useAuth();

  const isStudent = user?.role === "Student";

  if (isStudent) {
    return <CompletedQuizzes />;
  }

  return (
    <section className="mt-10 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-[#2C1A11]">
        Quiz Results
      </h2>

      {isLoading && (
        <>
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-5 border border-[#EAD5C3] rounded-xl bg-white space-y-3">
                <Skeleton className="h-5 w-2/3 bg-[#F5E6DA]/60" />
                <Skeleton className="h-4 w-full bg-[#F5E6DA]/60" />
                <div className="flex gap-2 pt-2">
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
                  {Array.from({ length: 7 }).map((_, i) => (
                    <TableHead key={i} className="px-6 py-4">
                      <Skeleton className="h-4 w-16 bg-[#EAD5C3]/70" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index} className="border-[#F4E3D4]">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <TableCell key={i} className="px-6 py-4">
                        <Skeleton className="h-4 w-20 bg-[#F5E6DA]/60" />
                      </TableCell>
                    ))}
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
            {currentItems.map((item: any) => {
              const quiz = item?.quiz;
              if (!quiz) return null;

              return (
                <div
                  key={quiz._id}
                  className="p-5 border border-[#EAD5C3] rounded-xl bg-white shadow-sm flex flex-col justify-between space-y-4 hover:border-[#D9C1AC] transition-all"
                >
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
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getDifficultyStyles(quiz.difficulty)}`}>
                        {quiz.difficulty?.toUpperCase()}
                      </span>

                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        quiz.status?.toLowerCase() === "open"
                          ? "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]"
                          : "bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]"
                      }`}>
                        {quiz.status?.toUpperCase()}
                      </span>

                      <span className="bg-[#FAF2EC] text-[#5C4636] border border-[#EAD5C3] px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1">
                        Type: {quiz.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-[#F4E3D4] text-[11px] text-[#7A6453]">
                    <div className="flex items-center gap-1">
                      <Clock size={13} />
                      <span>{quiz.duration} Mins</span>
                    </div>
                    <div className="font-bold text-[#2C1A11] bg-[#FFF9F5] px-2 py-1 rounded border border-[#F4E3D4]">
                      Total: {(quiz.questions_number ?? 0) * (quiz.score_per_question ?? 0)} Pts
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden md:block rounded-xl border border-[#EAD5C3] bg-white overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-[#FAF2EC]">
                <TableRow className="border-[#EAD5C3] hover:bg-transparent">
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">Title</TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">Description</TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">Difficulty</TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">Type</TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">Status</TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">Duration</TableHead>
                  <TableHead className="px-6 py-4 text-[#5C4636] font-bold">Score</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {currentItems.map((item: any) => {
                  const quiz = item?.quiz;
                  if (!quiz) return null;

                  const totalScore = (quiz.questions_number ?? 0) * (quiz.score_per_question ?? 0);

                  return (
                    <TableRow
                      key={quiz._id}
                      className="border-[#F4E3D4] hover:bg-[#FFF9F5] transition-colors">
                      <TableCell className="px-6 py-4 font-semibold text-[#2C1A11]">
                        {quiz.title}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-[#7A6453] max-w-[200px] truncate">
                        {quiz.description || "-"}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyStyles(quiz.difficulty)}`}>
                          {quiz.difficulty?.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 font-mono text-xs text-[#5C4636]">
                        {quiz.type}
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
                      <TableCell className="px-6 py-4 text-[#7A6453] font-medium">
                        {quiz.duration} mins
                      </TableCell>
                      <TableCell className="px-6 py-4 font-bold text-[#2C1A11]">
                        {(quiz.questions_number ?? 0) *
                          (quiz.score_per_question ?? 0)}{" "}
                        pts
                      </TableCell>{" "}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent className="border border-[#EAD5C3] bg-white rounded-lg p-1 shadow-sm">
                  
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }}
                      className={`text-[#5C4636] hover:bg-[#FAF2EC] hover:text-[#2C1A11] transition-colors cursor-pointer ${
                        currentPage === 1 ? "pointer-events-none opacity-40" : ""
                      }`}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNum);
                          }}
                          isActive={currentPage === pageNum}
                          className={`rounded-md transition-all cursor-pointer ${
                            currentPage === pageNum
                              ? "bg-[#2C1A11] text-white hover:bg-[#2C1A11] hover:text-white font-bold"
                              : "text-[#5C4636] hover:bg-[#FAF2EC] hover:text-[#2C1A11]"
                          }`}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                      }}
                      className={`text-[#5C4636] hover:bg-[#FAF2EC] hover:text-[#2C1A11] transition-colors cursor-pointer ${
                        currentPage === totalPages ? "pointer-events-none opacity-40" : ""
                      }`}
                    />
                  </PaginationItem>

                </PaginationContent>
              </Pagination>
            </div>
          )}

          {totalItems === 0 && (
            <div className="text-center py-12 border border-dashed border-[#EAD5C3] rounded-xl bg-[#FAF2EC]/30 text-[#7A6453] flex flex-col items-center justify-center gap-2">
              <AlertCircle size={28} className="text-[#BAA390]" />
              <p className="font-medium">No quiz results found.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}