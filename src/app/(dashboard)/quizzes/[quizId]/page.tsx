"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useSubmitQuiz from "@/src/hooks/student/useSubmitQuiz";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle2, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useQuizQuestions from "@/src/hooks/student/useQuizQuestions";
import { Loader2 } from "lucide-react";


export default function QuizQuestionsPage() {
  const { quizId } = useParams() as { quizId: string };
  const router = useRouter();

  const { quiz, loading } = useQuizQuestions(quizId);
  const { submitQuiz, loading: isSubmitting } = useSubmitQuiz();

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  const handleSelectAnswer = (questionId: string, optionKey: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const handleSubmitForm = async () => {
    const formattedAnswers = Object.entries(selectedAnswers).map(([questionId, answerKey]) => ({
      question: questionId,
      answer: answerKey,
    }));

    try {
      const resultData = await submitQuiz(quizId, formattedAnswers);
            setQuizResult(resultData);
      setIsResultOpen(true);
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  const handleCloseResultModal = () => {
    setIsResultOpen(false);
    router.push("/quizzes");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="mb-8 space-y-2">
          <Skeleton className="h-8 w-1/4 bg-[#FFE9D8]/40" />
          <Skeleton className="h-4 w-2/4 bg-[#FFE9D8]/30" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-8 border border-[#EAD5C3] rounded-2xl bg-[#FFE9D8]/10 space-y-4 shadow-sm">
              <Skeleton className="h-5 w-3/4 bg-[#FFE9D8]/40" />
              <div className="space-y-2.5">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} className="h-12 w-full rounded-xl bg-[#FFE9D8]/20" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-[#7A6453]">
        <AlertCircle size={40} className="text-[#BAA390]" />
        <p className="text-lg font-medium">No questions available for this quiz.</p>
      </div>
    );
  }

  const totalScore = quiz.questions_number * quiz.score_per_question;
  const score = quizResult?.score !== undefined ? quizResult.score : 0;
  const percentage = Math.min(Math.round((score / totalScore) * 100), 100);

  let performanceText = "Keep Improving!";
  let performanceDesc = "Try to study the material again and retake equivalent exercises.";

  if (percentage >= 85) {
    performanceText = "Excellent! Outstanding Performance";
    performanceDesc = "Outstanding job! You have fully mastered this topic.";
  } else if (percentage >= 65) {
    performanceText = "Good! Acceptable Performance";
    performanceDesc = "Good performance, but it can be improved with a bit more review.";
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="mb-10 border-b border-[#F4E3D4] pb-6">
        <h1 className="text-3xl font-bold text-[#2C1A11] mb-2">{quiz.title}</h1>
        <p className="text-[#7A6453] text-sm">
          {quiz.description || `Duration: ${quiz.duration} mins • ${quiz.questions_number} Questions`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {quiz.questions.map((question: any, qIndex: number) => {
          const optionsArray = Object.entries(question.options || {}).filter(
            ([key]) => key !== "_id" && ["A", "B", "C", "D"].includes(key)
          );

          return (
            <div 
              key={question._id} 
              className="p-8 border border-[#EAD5C3] rounded-2xl bg-[#FFE9D8]/20 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-[#8C6D53] tracking-wider uppercase block mb-2">
                  Question {qIndex + 1}
                </span>
                <h3 className="text-lg font-semibold text-[#2C1A11] mb-6 leading-relaxed">
                  {question.title}
                </h3>

                <div className="space-y-3.5">
                  {optionsArray.map(([key, value]) => {
                    const isSelected = selectedAnswers[question._id] === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleSelectAnswer(question._id, key)}
                        className={`w-full text-left px-5 py-4 rounded-xl border text-sm transition-all flex items-center gap-4 cursor-pointer ${
                          isSelected
                            ? "border-[#BAA390] bg-[#FFE9D8]/70 text-[#2C1A11] font-semibold shadow-sm"
                            : "border-[#EAD5C3] bg-white text-[#5C4636] hover:bg-[#FFE9D8]/40 hover:border-[#BAA390]"
                        }`}
                      >
                        <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold font-mono border transition-colors ${
                          isSelected 
                            ? "bg-[#2C1A11] text-white border-[#2C1A11]" 
                            : "bg-[#FAF2EC] text-[#5C4636] border-[#EAD5C3]"
                        }`}>
                          {key}
                        </span>
                        
                        <span className="flex-1">{value as string}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-end border-t border-[#F4E3D4] pt-6">
        <Button
          onClick={handleSubmitForm}
          disabled={isSubmitting || Object.keys(selectedAnswers).length < quiz.questions.length}
          className="bg-[#2C1A11] hover:bg-[#442c1e] text-white px-8 py-2 rounded-lg text-sm font-semibold transition-all shadow-md disabled:opacity-50 flex items-center gap-2 h-auto cursor-pointer"
        >
          <CheckCircle2 size={18} />
          {isSubmitting ? <Loader2 className="h-3 w-3 animate-spin" /> : "Submit Quiz"}
        </Button>
      </div>

      <Dialog open={isResultOpen} onOpenChange={handleCloseResultModal}>
        <DialogContent className="sm:max-w-[440px] p-6 overflow-hidden rounded-2xl border-[#EAD5C3] bg-white [&>button]:hidden shadow-2xl flex flex-col items-center">
          <DialogHeader className="w-full pb-2">
            <DialogTitle className="text-center text-2xl font-bold text-[#2C1A11]">
              Quiz Results
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 w-full">
            <div className="w-full bg-[#FFE9D8]/20 border border-[#EAD5C3] rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FFE9D8]/50 rounded-full flex items-center justify-center mb-4 border border-[#EAD5C3]">
                <ThumbsUp className="w-8 h-8 text-[#8C6D53]" />
              </div>

              <div className="text-[42px] font-black text-[#2C1A11] font-mono leading-none tracking-tight">
                {score}
                <span className="text-2xl font-medium text-[#7A6453]">/{totalScore}</span>
              </div>

              <div className="text-xl font-bold text-[#8C6D53] mt-2 font-mono">
                {percentage}%
              </div>

              <h4 className="text-lg font-bold text-[#2C1A11] mt-4">
                {performanceText}
              </h4>
              <p className="text-xs text-[#7A6453] mt-1.5 max-w-[290px] leading-relaxed">
                {performanceDesc}
              </p>
            </div>

            <div className="w-full bg-[#FAF2EC] h-2.5 rounded-full overflow-hidden border border-[#F4E3D4]">
              <div 
                className="bg-[#8C6D53] h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full pt-1">
              <button
                onClick={handleCloseResultModal}
                className="flex items-center justify-center h-12 bg-[#FFE9D8] hover:bg-[#F4E3D4] text-[#2C1A11] rounded-xl text-sm font-semibold border border-[#EAD5C3] transition cursor-pointer shadow-sm"
              >
                Join Another Quiz
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}