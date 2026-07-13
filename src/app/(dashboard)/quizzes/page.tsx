"use client";

import { useState } from "react";

import CompletedQuizzes from "@/src/components/Quiz/CompletedQuizzes";
import IncomingQuizzes from "@/src/components/Quiz/InComingQuizzes";
import QuizDialog from "@/src/components/Quiz/QuizDialog";
import { RiAlarmAddFill, RiLoginCircleFill, RiSafe3Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext/AuthContext";
import JoinQuizDialog from "@/src/components/Quiz/JoinDialog";
import useJoinQuiz from "@/src/hooks/student/useJoinQuiz";

export default function Quizzes() {
  const [open, setOpen] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { joinQuiz, isJoining } = useJoinQuiz(() => {
    setOpenJoin(false);
  });
  return (
    <>
      <div className="flex flex-wrap gap-6">
        {user?.role === "Instructor" ? (
          <>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex flex-col items-center justify-center gap-4 border border-[#EAD5C3] bg-white text-[#2C1A11] rounded-2xl px-10 py-8 cursor-pointer hover:bg-[#FFF9F5] hover:border-[#D6BEAA] transition-colors duration-200 shadow-sm">
              <RiAlarmAddFill size={48} className="text-[#5C4636]" />
              <span className="text-xl font-bold tracking-wide">
                Set up a new quiz
              </span>
            </button>

            <button
              onClick={() => router.push("/questions")}
              className="inline-flex flex-col items-center justify-center gap-4 border border-[#EAD5C3] bg-white text-[#2C1A11] rounded-2xl px-10 py-8 cursor-pointer hover:bg-[#FFF9F5] hover:border-[#D6BEAA] transition-colors duration-200 shadow-sm">
              <RiSafe3Fill size={48} className="text-[#5C4636]" />
              <span className="text-xl font-bold tracking-wide">
                Question Bank
              </span>
            </button>
          </>
        ) : (
          <button
            onClick={() => setOpenJoin(true)}
            className="inline-flex flex-col items-center justify-center gap-4 border border-[#EAD5C3] bg-white text-[#2C1A11] rounded-2xl px-10 py-8 cursor-pointer hover:bg-[#FFF9F5] hover:border-[#D6BEAA] transition-colors duration-200 shadow-sm">
            <RiAlarmAddFill size={48} className="text-[#5C4636]" />

            <span className="text-xl font-bold tracking-wide">Join Quiz</span>
          </button>
        )}
      </div>

      <JoinQuizDialog
        open={openJoin}
        onOpenChange={setOpenJoin}
        onJoin={joinQuiz}
        isLoading={isJoining}
      />

      {user?.role === "Instructor" && (
        <QuizDialog open={open} onOpenChange={setOpen} />
      )}

      <IncomingQuizzes />
      <CompletedQuizzes />
    </>
  );
}