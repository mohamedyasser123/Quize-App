"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ThumbsUp, CheckCircle, RotateCcw } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: any;
  totalScore?: number;
}

export default function QuizResultDialog({
  open,
  onOpenChange,
  result,
  totalScore = 10,
}: Props) {
  const router = useRouter();

  if (!result) return null;

  const score = result.score || 0;
  const percentage = Math.min(Math.round((score / totalScore) * 100), 100);

  let performanceText = "Keep Improving!";
  let performanceDesc =
    "Try to study the material again and retake equivalent exercises.";

  if (percentage >= 85) {
    performanceText = "Excellent! Outstanding Performance";
    performanceDesc = "Outstanding job! You have fully mastered this topic.";
  } else if (percentage >= 65) {
    performanceText = "Good! Acceptable Performance";
    performanceDesc =
      "Good performance, but it can be improved with a bit more review.";
  }

  const handleNavigateToResults = () => {
    onOpenChange(false);
    router.push("/quizzes");
    router.refresh();
  };

  const handleJoinAnother = () => {
    onOpenChange(false);
    router.push("/quizzes");
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 overflow-hidden rounded-2xl border-[#EAD5C3] bg-white [&>button]:hidden shadow-2xl">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-center text-2xl font-bold text-[#2C1A11]">
            Quiz Results
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-[#FFE9D8]/30 border border-[#EAD5C3] rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#FFE9D8]/70 rounded-full flex items-center justify-center mb-4 border border-[#EAD5C3]">
              <ThumbsUp className="w-7 h-7 text-[#8C6D53]" />
            </div>

            <div className="text-4xl font-black text-[#2C1A11] font-mono leading-none">
              {score}
              <span className="text-xl font-normal text-[#7A6453] ml-1">
                /{totalScore}
              </span>
            </div>

            <div className="text-lg font-bold text-[#8C6D53] mt-1.5 font-mono">
              {percentage}%
            </div>

            <h4 className="text-base font-bold text-[#2C1A11] mt-4">
              {performanceText}
            </h4>

            <p className="text-xs text-[#7A6453] mt-2 max-w-[280px] leading-relaxed">
              {performanceDesc}
            </p>
          </div>

          <div className="w-full bg-[#FAF2EC] h-2.5 rounded-full overflow-hidden border border-[#F4E3D4]">
            <div
              className="bg-[#8C6D53] h-full rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={handleNavigateToResults}
              className="flex items-center justify-center gap-2 h-12 bg-[#2C1A11] hover:bg-[#442c1e] text-white rounded-xl text-sm font-semibold transition cursor-pointer shadow-sm">
              <CheckCircle className="w-4 h-4" />
              Go to Results
            </button>

            <button
              onClick={handleJoinAnother}
              className="flex items-center justify-center gap-2 h-12 bg-[#FFE9D8] hover:bg-[#F4E3D4] text-[#2C1A11] rounded-xl text-sm font-semibold border border-[#EAD5C3] transition cursor-pointer shadow-sm">
              <RotateCcw className="w-4 h-4" />
              Join Another
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
