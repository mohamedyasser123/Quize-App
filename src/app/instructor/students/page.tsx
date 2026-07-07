
"use client";

import { ChevronRight } from "lucide-react";
import useStudents from "@/src/hooks/instractor/student/useStudent";




export default function Students() {
  const { students, isLoading } = useStudents(false);
  const skeletonCards = Array(6).fill(null);

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
            students?.map((student: any) => (
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

        {!isLoading && (
          <div className="flex justify-start items-center gap-2 mt-8 text-sm font-medium text-gray-500 select-none">
            <span className="cursor-pointer hover:text-black transition">...</span>
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-black font-bold">1</button>
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100">2</button>
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100">3</button>
            <span className="cursor-pointer hover:text-black transition">...</span>
          </div>
        )}

      </div>
    </div>
  );
}