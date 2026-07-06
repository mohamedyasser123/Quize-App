
"use client";

import { useState } from "react";
import {  ChevronRight } from "lucide-react";
import useStudents from "@/src/hooks/instractor/student/useStudent";
import useGetGroups from "@/src/hooks/instractor/group/useGetGroups";



export default function Students() {
const { students, isLoading } = useStudents(false);
    const {groups}=useGetGroups()
  
  const [activeGroup, setActiveGroup] = useState("Group 1");
const skeletonCards = Array(6).fill(null);
 return (
    <div className="w-full min-h-screen bg-gray-50/50 p-4 md:p-8 text-[#2C1A11]">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[#2C1A11]">Students list</h1>      
      </div>

      <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        
        <div className="flex flex-wrap gap-3 mb-8">
  {isLoading ? (
    Array(3).fill(null).map((_, index) => (
      <div
        key={`group-skeleton-${index}`}
        className="w-24 h-9 bg-gray-200 rounded-full animate-pulse"
      />
    ))
  ) : (
    groups?.map((group: any) => (
      <button
        key={group}
        onClick={() => setActiveGroup(group)}
        className={`px-6 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
          activeGroup === group
            ? "bg-[#111827] text-white border-[#111827] shadow-sm"
            : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
        }`}
      >
        {group}
      </button>
    ))
  )}
</div>

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
            students?.map((student: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:shadow-md transition duration-200 bg-white"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={student.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                    alt={student.name || "student"}
                    className="w-14 h-14 rounded-lg object-cover bg-sky-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-gray-900 truncate">
                      {student.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mt-0.5 flex items-center">
                      {student.rank && (
                        <>
                          <span>Class rank: <span className="text-gray-700 font-semibold">{student.rank}</span></span>
                          <span className="mx-2 text-gray-300">|</span>
                        </>
                      )}
                      <span>Average score: <span className="text-gray-700 font-semibold">{student.avg_score}%</span></span>
                    </p>
                  </div>
                </div>

                <button className="p-2 hover:bg-gray-100 rounded-full transition text-[#111827] shrink-0 cursor-pointer active:scale-90">
                  <div className="w-6 h-6 border-2 border-black rounded-full flex items-center justify-center">
                    <ChevronRight size={16} className="stroke-[3]" />
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