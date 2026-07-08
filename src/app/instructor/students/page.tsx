
"use client";

import { AlertCircle, ChevronRight } from "lucide-react";
import useStudents from "@/src/hooks/instractor/student/useStudent";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useEffect, useState } from "react";




export default function Students() {
  const { students, isLoading } = useStudents(false);
  const skeletonCards = Array(6).fill(null);

  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const safeStudents = students ?? [];

  const totalItems = safeStudents.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  const currentItems = safeStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [students]);
  return (
    <div className="w-full min-h-screen bg-gray-50/50 p-4 md:p-8 text-[#2C1A11]">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[#2C1A11]">Students list</h1>
      </div>

      <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            skeletonCards.map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-white animate-pulse"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-14 h-14 rounded-lg bg-gray-200 shrink-0" />
                  <div className="w-full space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0" />
              </div>
            ))
          ) : (
            currentItems?.map((student: any) => (
              <div
                key={student._id}
                className="flex items-center justify-between p-3.5 border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition duration-200 bg-white"
              >
                <div className="flex items-center gap-4 min-w-0 w-full">
                  <img
                    src={student.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                    alt={`${student.first_name || 'student'}`}
                    className="w-14 h-14 rounded-lg object-cover bg-sky-200 shrink-0 border border-gray-100"
                  />

                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="text-base font-bold text-gray-900 truncate">
                      {student.first_name} {student.last_name}
                    </h3>

                    <p className="text-xs text-gray-500 font-medium flex items-center flex-wrap gap-y-1">
                      {student.rank && (
                        <span className="inline-flex items-center">
                          Class rank: <span className="text-gray-700 font-semibold ml-1">{student.rank}</span>
                          <span className="mx-2 text-gray-300">|</span>
                        </span>
                      )}
                      <span>
                        Average score: <span className="text-gray-700 font-semibold">{student.avg_score}%</span>
                      </span>
                    </p>

                    {student?.group?.name && (
                      <div className="pt-0.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200/60">
                          {student.group.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button className="p-2 hover:bg-gray-100 rounded-full transition text-[#111827] shrink-0 cursor-pointer active:scale-90 ml-2">
                  <div className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center">
                    <ChevronRight size={14} className="stroke-[3]" />
                  </div>
                </button>
              </div>
            ))
          )}
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
                    className={`text-[#5C4636] hover:bg-[#FAF2EC] hover:text-[#2C1A11] transition-colors cursor-pointer ${currentPage === 1 ? "pointer-events-none opacity-40" : ""
                      }`}
                  />
                </PaginationItem>

                {Array.from(
                  { length: Math.min(totalPages, 5) },
                  (_, index) => {
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
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={`text-[#5C4636] hover:bg-[#FAF2EC] hover:text-[#2C1A11] transition-colors cursor-pointer ${currentPage === totalPages ? "pointer-events-none opacity-40" : ""
                      }`}
                  />
                </PaginationItem>

              </PaginationContent>
            </Pagination>
          </div>
        )}



      </div>
    </div>
  );
}