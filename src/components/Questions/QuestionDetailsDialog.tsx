"use client";

import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Question } from "@/src/types/instractor";

interface QuestionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question | null;
}

export default function QuestionDetailsDialog({
  open,
  onOpenChange,
  question,
}: QuestionDetailsDialogProps) {
  if (!question) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl p-6 text-black border border-gray-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Eye className="w-5 h-5 text-orange-500" />
            <span>Question Details</span>
          </DialogTitle>

          <DialogDescription className="text-sm text-gray-400 pt-1">
            Full overview of the selected question from the bank.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4 border-t border-gray-100 pt-4 text-sm">
          <div className="grid grid-cols-3 gap-2">
            <span className="font-semibold text-gray-500">Title:</span>
            <span className="col-span-2 font-bold text-gray-900">
              {question.title}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <span className="font-semibold text-gray-500">Description:</span>
            <span className="col-span-2 text-gray-700">
              {question.description}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <span className="font-semibold text-gray-500">Difficulty:</span>

            <span className="col-span-2">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize
                ${question.difficulty === "hard" ? "bg-red-50 text-red-600" : ""}
                ${question.difficulty === "medium" ? "bg-orange-50 text-orange-600" : ""}
                ${question.difficulty === "easy" ? "bg-green-50 text-green-600" : ""}
              `}
              >
                {question.difficulty}
              </span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <span className="font-semibold text-gray-500">Instructor:</span>

            <span className="col-span-2 font-medium text-gray-800">
              {question.instructor || "Not assigned"}
            </span>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <span className="font-semibold text-gray-500 block mb-2">
              Answer Options:
            </span>

            <div className="space-y-2">
              {Object.entries(question.options)
                .filter(([key]) => key !== "_id")
                .map(([key, value]) => {
                  const isCorrect = key === question.answer;

                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-between p-3 rounded-xl border text-sm
                        ${
                          isCorrect
                            ? "bg-green-50 border-green-200 text-green-900 font-semibold"
                            : "bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                            ${
                              isCorrect
                                ? "bg-green-600 text-white"
                                : "bg-white border border-gray-300 text-gray-500"
                            }`}
                        >
                          {key}
                        </span>

                        <span>{String(value)}</span>
                      </div>

                      {isCorrect && (
                        <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-md">
                          Correct
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => onOpenChange(false)}
            className="bg-[#0B1220] hover:bg-opacity-90 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
          >
            Close Window
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}