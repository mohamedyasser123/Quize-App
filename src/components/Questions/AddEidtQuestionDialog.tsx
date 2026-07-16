"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Check, X, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCreateQuestion from "@/src/hooks/instractor/question/useCreateQuestion";
import useUpdateQuestion from "@/src/hooks/instractor/question/useUpdateQuestion";
import { CreateQuestionData, Question } from "@/src/types/instractor/question/question-type";



interface AddQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitAction?: () => void;
  question?: Question | null;
}

export default function QuestionDialog({  open,
  onOpenChange,
  onSubmitAction,
  question,}: AddQuestionDialogProps) {
  const { createQuestion } = useCreateQuestion();
  const { updateQuestion } = useUpdateQuestion();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateQuestionData>({
    defaultValues: {
      title: "",
      description: "",
   options: {
      A: "",
      B: "",
      C: "",
      D: "",
    },
      answer: "A",
       difficulty: "easy",
    type: "FE",
    },
  });
useEffect(() => {
  if (question) {
    reset({
      title: question.title,
      description: question.description,
      options: {
        A: question.options.A,
        B: question.options.B,
        C: question.options.C,
        D: question.options.D,
      },
      answer: question.answer,
      difficulty: question.difficulty,
      type: question.type,
    });
  } else {
    reset({
      title: "",
      description: "",
      options: {
        A: "",
        B: "",
        C: "",
        D: "",
      },
      answer: "A",
      difficulty: "easy",
      type: "FE",
    });
  }
}, [question, reset]);
const onSubmit = async (data: CreateQuestionData) => {
  let success = false;

  if (question) {
    success = await updateQuestion(question._id, data);
  } else {
    success = await createQuestion(data);
  }

  if (success) {
    reset();
    onOpenChange(false);
    onSubmitAction?.();
  }
};
return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) reset();
      onOpenChange(val);
    }}>
      <DialogContent className="sm:max-w-3xl w-[95vw] p-0 overflow-hidden bg-white border border-[#EAD5C3] shadow-xl [&>button]:hidden text-black select-none max-h-[90vh] flex flex-col">
        
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col max-h-[90vh]">
          
          <div className="flex justify-between items-center px-6 py-4 bg-[#FAF2EC] border-b-2 border-sky-500 shrink-0">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-[#2C1A11]">
               {question ? "Edit Question" : "Set up a new question"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex items-center border-l border-[#EAD5C3] pl-4 gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Check size={22} className="stroke-[3]" />
              </button>
              <button
                type="button"
                onClick={() => { reset(); onOpenChange(false); }}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer active:scale-95"
              >
                <X size={22} className="stroke-[3]" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4 text-[#5C4636] overflow-y-auto flex-1">
            <h4 className="text-sm font-bold text-[#2C1A11] mb-1">Details</h4>

            <div className="space-y-1">
              <div className={`flex items-center border rounded-lg overflow-hidden h-11 bg-white shadow-sm transition-colors ${errors.title ? 'border-red-500 bg-red-50/10' : 'border-[#EAD5C3]'}`}>
                <span className="bg-[#FAF2EC] px-5 h-full flex items-center font-bold text-sm border-r border-[#EAD5C3] min-w-[120px] text-[#2C1A11] shrink-0">
                  Title:
                </span>
                <input
                  type="text"
                  {...register("title", { 
                    required: "Title is required", 
                    minLength: { value: 3, message: "Title must be at least 3 characters" } 
                  })}
                  className="flex-1 px-4 h-full outline-none text-sm text-[#2C1A11] bg-transparent min-w-0"
                  placeholder="Enter question title..."
                />
              </div>
              {errors.title && <p className="text-xs font-semibold text-red-500 pl-2">{errors.title.message}</p>}
            </div>

            <div className="space-y-1">
              <div className={`flex items-start border rounded-lg overflow-hidden bg-white shadow-sm transition-colors ${errors.description ? 'border-red-500 bg-red-50/10' : 'border-[#EAD5C3]'}`}>
                <span className="bg-[#FAF2EC] px-5 py-3 font-bold text-sm border-r border-[#EAD5C3] min-w-[120px] text-[#2C1A11] self-stretch flex items-start shrink-0">
                  Description
                </span>
                <textarea
                  rows={3}
                  {...register("description", { 
                    required: "Description is required", 
                    minLength: { value: 5, message: "Description must be at least 5 characters" } 
                  })}
                  className="flex-1 p-3 outline-none text-sm text-[#2C1A11] bg-transparent shrink-0 resize-none min-w-0"
                  placeholder="Enter question description..."
                />
              </div>
              {errors.description && <p className="text-xs font-semibold text-red-500 pl-2">{errors.description.message}</p>}
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="space-y-1 flex-1 min-w-[260px]">
                <div className={`flex items-center border rounded-lg overflow-hidden h-11 bg-white shadow-sm transition-colors ${errors.options?.A ? "border-red-500" : "border-[#EAD5C3]"}`}>
                  <span className="bg-[#FAF2EC] px-5 h-full flex items-center font-bold text-sm border-r border-[#EAD5C3] text-[#2C1A11] shrink-0">
                    A
                  </span>
                  <input
                    type="text"
                    {...register("options.A", { required: "Option A is required" })}
                    className="flex-1 px-3 h-full outline-none text-sm text-[#2C1A11] bg-transparent min-w-0"
                    placeholder="Option A"
                  />
                </div>
                {errors.options?.A && <p className="text-xs text-red-500 pl-1">{errors.options.A.message}</p>}
              </div>

              <div className="space-y-1 flex-1 min-w-[260px]">
                <div className={`flex items-center border rounded-lg overflow-hidden h-11 bg-white shadow-sm transition-colors ${errors.options?.B ? "border-red-500" : "border-[#EAD5C3]"}`}>
                  <span className="bg-[#FAF2EC] px-5 h-full flex items-center font-bold text-sm border-r border-[#EAD5C3] text-[#2C1A11] shrink-0">
                    B
                  </span>
                  <input
                    type="text"
                    {...register("options.B", { required: "Option B is required" })}
                    className="flex-1 px-3 h-full outline-none text-sm text-[#2C1A11] bg-transparent min-w-0"
                    placeholder="Option B"
                  />
                </div>
                {errors.options?.B && <p className="text-xs text-red-500 pl-1">{errors.options.B.message}</p>}
              </div>

              <div className="space-y-1 flex-1 min-w-[260px]">
                <div className={`flex items-center border rounded-lg overflow-hidden h-11 bg-white shadow-sm transition-colors ${errors.options?.C ? "border-red-500" : "border-[#EAD5C3]"}`}>
                  <span className="bg-[#FAF2EC] px-5 h-full flex items-center font-bold text-sm border-r border-[#EAD5C3] text-[#2C1A11] shrink-0">
                    C
                  </span>
                  <input
                    type="text"
                    {...register("options.C", { required: "Option C is required" })}
                    className="flex-1 px-3 h-full outline-none text-sm text-[#2C1A11] bg-transparent min-w-0"
                    placeholder="Option C"
                  />
                </div>
                {errors.options?.C && <p className="text-xs text-red-500 pl-1">{errors.options.C.message}</p>}
              </div>

              <div className="space-y-1 flex-1 min-w-[260px]">
                <div className={`flex items-center border rounded-lg overflow-hidden h-11 bg-white shadow-sm transition-colors ${errors.options?.D ? "border-red-500" : "border-[#EAD5C3]"}`}>
                  <span className="bg-[#FAF2EC] px-5 h-full flex items-center font-bold text-sm border-r border-[#EAD5C3] text-[#2C1A11] shrink-0">
                    D
                  </span>
                  <input
                    type="text"
                    {...register("options.D", { required: "Option D is required" })}
                    className="flex-1 px-3 h-full outline-none text-sm text-[#2C1A11] bg-transparent min-w-0"
                    placeholder="Option D"
                  />
                </div>
                {errors.options?.D && <p className="text-xs text-red-500 pl-1">{errors.options.D.message}</p>}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              {/* Right Answer */}
              <div className="flex-1 min-w-[220px] flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-11 bg-white shadow-sm relative">
                <span className="bg-[#FAF2EC] px-4 h-full flex items-center font-bold text-sm border-r border-[#EAD5C3] text-[#2C1A11] whitespace-nowrap shrink-0">
                  Right Answer
                </span>
                <select {...register("answer")} className="flex-1 pl-4 pr-8 h-full outline-none text-sm bg-transparent font-bold text-[#2C1A11] cursor-pointer appearance-none">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 pointer-events-none" />
              </div>

              <div className="flex-1 min-w-[220px] flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-11 bg-white shadow-sm relative">
                <span className="bg-[#FAF2EC] px-4 h-full flex items-center font-bold text-sm border-r border-[#EAD5C3] text-[#2C1A11] whitespace-nowrap shrink-0">
                  Category type
                </span>
                <select {...register("type")} className="flex-1 pl-4 pr-8 h-full outline-none text-sm bg-transparent font-bold text-[#2C1A11] cursor-pointer appearance-none">
                  <option value="FE">FE</option>
                  <option value="BE">BE</option>
                  <option value="FS">FS</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 pointer-events-none" />
              </div>

              <div className="flex-1 min-w-[220px] flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-11 bg-white shadow-sm relative">
                <span className="bg-[#FAF2EC] px-4 h-full flex items-center font-bold text-sm border-r border-[#EAD5C3] text-[#2C1A11] whitespace-nowrap shrink-0">
                  Difficulty
                </span>
                <select {...register("difficulty")} className="flex-1 pl-4 pr-8 h-full outline-none text-sm bg-transparent font-bold text-[#2C1A11] cursor-pointer appearance-none">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 pointer-events-none" />
              </div>
            </div>

          </div>
        </form>

      </DialogContent>
    </Dialog>
  );
}