"use client";

import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JoinQuizDialogProps } from "@/src/types/student";
import { useForm } from "react-hook-form";

type JoinQuizForm = {
  code: string;
};

export default function JoinQuizDialog({
  open,
  onOpenChange,
  onJoin,
  isLoading = false,
}: JoinQuizDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JoinQuizForm>();

  const handleJoin = async (data: JoinQuizForm) => {
    await onJoin(data.code.toUpperCase());
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-xl border-[#EAD5C3] bg-white [&>button]:hidden shadow-lg">
        <DialogHeader className="pt-8 bg-[#FFE9D8]/20 pb-4">
          <DialogTitle className="text-center text-2xl font-bold text-[#2C1A11]">
            Join Quiz
          </DialogTitle>
          <p className="text-center text-sm mt-2 text-[#7A6453] px-6">
            Input the code received for the quiz below to join
          </p>
        </DialogHeader>

        {/* Body */}
        <form id="join-quiz-form" onSubmit={handleSubmit(handleJoin)} className="px-8 py-8 bg-white">
          <div className="flex h-12 overflow-hidden rounded-lg border border-[#EAD5C3] focus-within:border-[#BAA390] transition-colors">
            <span className="bg-[#FFE9D8] px-5 flex items-center font-normal text-[#5C4636] border-r border-[#EAD5C3] text-sm">
              Code
            </span>

            <input
              type="text"
              placeholder="Enter quiz code"
              {...register("code", {
                required: "Quiz code is required",
              })}
              className="flex-1 px-4 outline-none text-[#2C1A11] placeholder:text-[#BAA390]/80 text-sm font-mono"
            />
          </div>

          {errors.code && (
            <p className="mt-2 text-xs text-red-500 font-normal">{errors.code.message}</p>
          )}
        </form>

        <div className="flex border-t border-[#F4E3D4] bg-[#FFE9D8]/10">
          <button
            type="submit"
            form="join-quiz-form"
            disabled={isLoading}
            className="flex-1 h-14 flex items-center justify-center border-r border-[#F4E3D4] hover:bg-[#FFE9D8]/40 text-[#5C4636] hover:text-[#2C1A11] transition cursor-pointer">
            <Check className="w-6 h-6" />
          </button>

          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 h-14 flex items-center justify-center hover:bg-red-50/60 text-red-400 hover:text-red-600 transition cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}