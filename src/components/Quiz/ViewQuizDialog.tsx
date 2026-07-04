"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Quiz } from "@/src/types/instractor";
import { X, Clock, Award, HelpCircle, Calendar, BookOpen } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quiz: Quiz | null;
};

export default function ViewQuizDialog({ open, onOpenChange, quiz }: Props) {
  // لو مفيش كويز لسه (أو لسه الداتا بتيجي) مش هيعرض حاجة لحد ما تجهز
  if (!quiz) return null;

  const totalScore =
    (quiz.questions_number || 0) * (quiz.score_per_question || 5);

  // أخذ أول 5 أسئلة فقط المتاحة من مصفوفة الأسئلة
  const displayedQuestions = quiz.questions?.slice(0, 5) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-y-auto max-h-[90vh] bg-white border border-[#EAD5C3] shadow-2xl rounded-2xl [&>button]:hidden font-sans">
        {/* هيدر المودال */}
        <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-[#F4E3D4]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#2C1A11]">
              Quiz Details
            </DialogTitle>
          </DialogHeader>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-lg bg-[#FAF2EC] text-[#7A6453] hover:bg-[#F5E6DA] hover:text-[#2C1A11] transition-colors cursor-pointer"
          >
            <X size={18} className="stroke-[2.5]" />
          </button>
        </div>

        {/* الكارد العلوي */}
        <div className="mx-6 mt-4 p-6 bg-[#FAF2EC] border border-[#EAD5C3] rounded-2xl shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-2">
              <BookOpen size={22} className="text-[#5C4636]" />
              <h2 className="text-2xl font-bold tracking-wide capitalize text-[#2C1A11]">
                {quiz.title}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="bg-[#F5E6DA] px-3 py-1 rounded-md text-xs font-mono text-[#5C4636] border border-[#EAD5C3]">
                Quiz Code: {quiz.code}
              </span>
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider ${
                  quiz.difficulty?.toLowerCase() === "easy"
                    ? "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]"
                    : quiz.difficulty?.toLowerCase() === "medium"
                    ? "bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]"
                    : "bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]"
                }`}
              >
                {quiz.difficulty || "medium"}
              </span>
            </div>
          </div>
        </div>

        {/* باقي محتويات وتفاصيل الكويز والأسئلة */}
        <div className="p-6 space-y-6">
          {/* كروت الإحصائيات */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#FFF9F5] border border-[#F4E3D4] rounded-xl p-4 flex items-center gap-3">
              <div className="p-2.5 bg-white border border-[#EAD5C3] rounded-lg text-[#5C4636] shadow-sm">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#7A6453] uppercase">
                  Duration
                </p>
                <p className="text-sm font-extrabold text-[#2C1A11]">
                  {quiz.duration} minutes
                </p>
              </div>
            </div>

            <div className="bg-[#FFF9F5] border border-[#F4E3D4] rounded-xl p-4 flex items-center gap-3">
              <div className="p-2.5 bg-white border border-[#EAD5C3] rounded-lg text-[#5C4636] shadow-sm">
                <Award size={20} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#7A6453] uppercase">
                  Total Score
                </p>
                <p className="text-sm font-extrabold text-[#2C1A11]">
                  {totalScore} points
                </p>
              </div>
            </div>

            <div className="bg-[#FFF9F5] border border-[#F4E3D4] rounded-xl p-4 flex items-center gap-3">
              <div className="p-2.5 bg-white border border-[#EAD5C3] rounded-lg text-[#5C4636] shadow-sm">
                <HelpCircle size={20} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#7A6453] uppercase">
                  Questions
                </p>
                <p className="text-sm font-extrabold text-[#2C1A11]">
                  {quiz.questions_number}
                </p>
              </div>
            </div>
          </div>

          {/* البادجات السفلية */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${
                quiz.status?.toLowerCase() === "open"
                  ? "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]"
                  : "bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]"
              }`}
            >
              {quiz.status}
            </span>
            <span className="px-3 py-1 bg-[#F5E6DA] text-[#5C4636] border border-[#EAD5C3] rounded-full text-xs font-bold">
              Type: {quiz.type}
            </span>
          </div>

          {/* تاريخ وجدولة الكويز */}
          <div className="bg-[#FAF2EC] border border-[#EAD5C3] rounded-xl p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7A6453]">
              <Calendar size={15} />
              <span>Scheduled Date & Time</span>
            </div>
            <p className="text-sm font-semibold text-[#2C1A11] mt-1">
              {new Date(quiz.schadule).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="border-t border-[#F4E3D4] pt-5">
            <h3 className="font-extrabold text-base mb-4 text-[#2C1A11] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span>Questions List</span>
                <span className="bg-[#FAF2EC] text-[#5C4636] px-2 py-0.5 rounded text-xs border border-[#EAD5C3]">
                  Showing {displayedQuestions.length} of {quiz.questions_number || displayedQuestions.length}
                </span>
              </div>
            </h3>

            <div className="space-y-4">
              {displayedQuestions.map((question, index) => (
                <div
                  key={question._id}
                  className="rounded-xl border border-[#EAD5C3] bg-white overflow-hidden shadow-sm"
                >
                  <div className="p-4 flex gap-3 items-start border-b border-[#FAF2EC] bg-[#FFF9F5]/20">
                    <div className="w-6 h-6 rounded-full bg-[#5C4636] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="font-bold text-[#2C1A11] text-sm md:text-base pt-0.5">
                      {question.title}
                    </p>
                  </div>

                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2.5 bg-[#FFF9F5]/40">
                    {Object.entries(question.options).map(([key, value]) => {
                      if (key === "_id") return null;
                      return (
                        <div
                          key={key}
                          className="flex items-center gap-2 text-sm text-[#5C4636] bg-white border border-[#F4E3D4] rounded-lg px-3 py-2.5 hover:bg-[#FFF9F5] transition-colors"
                        >
                          <span className="font-bold text-[#7A6453] font-sans">
                            {key}.
                          </span>
                          <span className="font-medium text-[#2C1A11]">
                            {value as string}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}