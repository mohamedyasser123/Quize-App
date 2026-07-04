"use client";

import { useState } from "react";

import CompletedQuizzes from "@/src/components/Quiz/CompletedQuizzes";
import IncomingQuizzes from "@/src/components/Quiz/InComingQuizzes";
import QuizDialog from "@/src/components/Quiz/QuizDialog";
import { RiAlarmAddFill, RiSafe3Fill } from "react-icons/ri";

export default function Quizzes() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-6">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex flex-col items-center justify-center gap-4 border border-[#EAD5C3] bg-white text-[#2C1A11] rounded-2xl px-10 py-8 cursor-pointer hover:bg-[#FFF9F5] hover:border-[#D6BEAA] transition-colors duration-200 shadow-sm"
        >
          <RiAlarmAddFill size={48} className="text-[#5C4636]" />
          <span className="text-xl font-bold tracking-wide">
            Set up a new quiz
          </span>
        </button>

        <button className="inline-flex flex-col items-center justify-center gap-4 border border-[#EAD5C3] bg-white text-[#2C1A11] rounded-2xl px-10 py-8 cursor-pointer hover:bg-[#FFF9F5] hover:border-[#D6BEAA] transition-colors duration-200 shadow-sm">
          <RiSafe3Fill size={48} className="text-[#5C4636]" />
          <span className="text-xl font-bold tracking-wide">
            Question Bank
          </span>
        </button>
      </div>

      <QuizDialog open={open} onOpenChange={setOpen} />

      <IncomingQuizzes />
      <CompletedQuizzes />
    </>
  );
}