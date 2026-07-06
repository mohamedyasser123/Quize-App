"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCreateQuiz from "@/src/hooks/instractor/quiz/useCreateQuiz";
import { CreateQuizPayload } from "@/src/types/instractor/Quiz/quiz-type";
import { Check, X, Calendar, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import useGetGroups from "@/src/hooks/instractor/group/useGetGroups";
import QuizCodeDialog from "./QuizCodeDialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type FormFields = Omit<CreateQuizPayload, "schedule"> & {
  scheduleDate: string;
  scheduleTime: string;
  schadule?: string;
};

export default function QuizDialog({ open, onOpenChange }: Props) {
  const { groups, isLoading: isLoadingGroups } = useGetGroups();
  const [openCodeDialog, setOpenCodeDialog] = useState(false);
  const [quizCode, setQuizCode] = useState("");

  const form = useForm<FormFields>({
    defaultValues: {
      title: "",
      description: "",
      duration: 10,
      questions_number: 15,
      score_per_question: 1,
      difficulty: "entry",
      type: "FE",
      group: "",
      scheduleDate: "",
      scheduleTime: "",
    },
  });

  const { register, handleSubmit, reset, setValue } = form;

  useEffect(() => {
    if (groups && groups.length > 0) {
      setValue("group", groups[0]._id);
    }
  }, [groups, setValue]);

  const { onSubmit, isLoading: isCreatingQuiz } = useCreateQuiz({
    form: form as any,
    onSuccess: (code) => {
      onOpenChange(false);
      setQuizCode(code);
      setOpenCodeDialog(true);
    },
  });

  const handleFormSubmit = (data: FormFields) => {
    let formattedSchedule = "";

    if (data.scheduleDate && data.scheduleTime) {
      formattedSchedule = new Date(
        `${data.scheduleDate}T${data.scheduleTime}`,
      ).toISOString();
    }

    const payload: any = {
      title: data.title,
      description: data.description,
      duration: Number(data.duration),
      questions_number: Number(data.questions_number),
      score_per_question: Number(data.score_per_question),
      difficulty: data.difficulty,
      type: data.type,
      group: data.group,
      schadule: formattedSchedule,
    };

    onSubmit(payload);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-white border border-[#EAD5C3] shadow-xl rounded-xl [&>button]:hidden font-sans">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Header Section */}
            <div className="flex justify-between items-center px-6 py-4 bg-[#FAF2EC] border-b border-[#EAD5C3]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[#2C1A11]">
                  Set up a new quiz
                </DialogTitle>
              </DialogHeader>

              <div className="flex items-center border-l border-[#EAD5C3] pl-4 gap-3">
                <button
                  type="submit"
                  disabled={isCreatingQuiz || isLoadingGroups}
                  className="p-1.5 rounded-lg bg-[#FAF2EC] text-[#5C4636] hover:bg-[#F5E6DA] hover:text-[#2C1A11] border border-transparent hover:border-[#EAD5C3] transition-all cursor-pointer disabled:opacity-50">
                  <Check size={22} className="stroke-[3]" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="p-1.5 rounded-lg bg-[#FAF2EC] text-[#7A6453] hover:bg-[#F5E6DA] hover:text-[#2C1A11] border border-transparent hover:border-[#EAD5C3] transition-all cursor-pointer">
                  <X size={22} className="stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-5 text-[#5C4636] bg-white">
              <h4 className="text-sm font-bold text-[#2C1A11] mb-1">Details</h4>

              {/* Title Input */}
              <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
                <span className="bg-[#FAF2EC] px-4 h-full flex items-center font-bold text-sm border-r border-[#EAD5C3] min-w-[100px] text-[#2C1A11]">
                  Title:
                </span>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="flex-1 px-4 h-full outline-none text-sm text-[#2C1A11] bg-transparent placeholder-[#7A6453]/50"
                  placeholder="Enter quiz title..."
                />
              </div>

              {/* Numerical Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Duration */}
                <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
                  <span className="bg-[#FAF2EC] px-3 h-full flex items-center font-bold text-xs border-r border-[#EAD5C3] whitespace-nowrap text-[#2C1A11]">
                    Duration{" "}
                    <span className="text-[10px] font-normal text-[#7A6453] ml-1">
                      (in minutes)
                    </span>
                  </span>
                  <select
                    {...register("duration")}
                    className="flex-1 px-3 h-full outline-none text-sm bg-transparent font-semibold text-[#2C1A11] cursor-pointer">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={60}>60</option>
                    <option value={60}>90</option>
                  </select>
                </div>

                {/* Number of Questions */}
                <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
                  <span className="bg-[#FAF2EC] px-3 h-full flex items-center font-bold text-xs border-r border-[#EAD5C3] whitespace-nowrap text-[#2C1A11]">
                    No. of questions
                  </span>
                  <select
                    {...register("questions_number")}
                    className="flex-1 px-3 h-full outline-none text-sm bg-transparent font-semibold text-[#2C1A11] cursor-pointer">
                    <option value={1}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </select>
                </div>

                {/* Score Per Question */}
                <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
                  <span className="bg-[#FAF2EC] px-3 h-full flex items-center font-bold text-xs border-r border-[#EAD5C3] whitespace-nowrap text-[#2C1A11]">
                    Score per question
                  </span>
                  <select
                    {...register("score_per_question")}
                    className="flex-1 px-3 h-full outline-none text-sm bg-transparent font-semibold text-[#2C1A11] cursor-pointer">
                    <option value={1}>5</option>
                    <option value={2}>10</option>
                    <option value={5}>15</option>
                    <option value={10}>20</option>
                  </select>
                </div>
              </div>

              {/* Description Textarea */}
              <div className="flex items-start border border-[#EAD5C3] rounded-lg overflow-hidden bg-white shadow-sm">
                <span className="bg-[#FAF2EC] px-4 py-3 font-bold text-sm border-r border-[#EAD5C3] min-w-[120px] text-[#2C1A11] self-stretch flex items-start">
                  Description
                </span>
                <textarea
                  rows={3}
                  {...register("description")}
                  className="flex-1 p-3 outline-none text-sm text-[#2C1A11] bg-transparent resize-none placeholder-[#7A6453]/50"
                  placeholder="Enter quiz description..."
                />
              </div>

              {/* Schedule Fields */}
              <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm max-w-xl">
                <span className="bg-[#FAF2EC] px-4 h-full flex items-center font-bold text-sm border-r border-[#EAD5C3] text-[#2C1A11] min-w-[100px]">
                  Schedule
                </span>
                <div className="flex items-center gap-4 px-3 text-sm text-[#2C1A11] font-semibold flex-1">
                  {/* Date Input */}
                  <div className="flex items-center gap-1.5 flex-1 relative">
                    <Calendar
                      size={16}
                      className="text-[#5C4636] pointer-events-none absolute left-0"
                    />
                    <input
                      type="date"
                      {...register("scheduleDate", { required: true })}
                      className="w-full pl-6 h-full outline-none bg-transparent cursor-pointer text-xs font-bold"
                    />
                  </div>
                  {/* Time Input */}
                  <div className="flex items-center gap-1.5 border-l border-[#EAD5C3] pl-4 flex-1 relative">
                    <Clock
                      size={16}
                      className="text-[#5C4636] pointer-events-none absolute left-2"
                    />
                    <input
                      type="time"
                      {...register("scheduleTime", { required: true })}
                      className="w-full pl-8 h-full outline-none bg-transparent cursor-pointer text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Categorization Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {/* Difficulty Level */}
                <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
                  <span className="bg-[#FAF2EC] px-3 h-full flex items-center font-bold text-xs border-r border-[#EAD5C3] whitespace-nowrap text-[#2C1A11]">
                    Difficulty level
                  </span>
                  <select
                    {...register("difficulty")}
                    className="flex-1 px-3 h-full outline-none text-sm bg-transparent font-semibold text-[#2C1A11] cursor-pointer">
                    <option value="entry">entry</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                  </select>
                </div>

                {/* Category Type */}
                <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
                  <span className="bg-[#FAF2EC] px-3 h-full flex items-center font-bold text-xs border-r border-[#EAD5C3] whitespace-nowrap text-[#2C1A11]">
                    Category type
                  </span>
                  <select
                    {...register("type")}
                    className="flex-1 px-3 h-full outline-none text-sm bg-transparent font-semibold text-[#2C1A11] cursor-pointer">
                    <option value="FE">FE</option>
                    <option value="BE">BE</option>
                    <option value="FS">FS</option>
                  </select>
                </div>

                {/* Group Name (Dynamic From API) */}
                <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
                  <span className="bg-[#FAF2EC] px-3 h-full flex items-center font-bold text-xs border-r border-[#EAD5C3] whitespace-nowrap text-[#2C1A11]">
                    Group name
                  </span>
                  <select
                    {...register("group", { required: true })}
                    className="flex-1 px-3 h-full outline-none text-sm bg-transparent font-semibold text-[#2C1A11] cursor-pointer disabled:opacity-50"
                    disabled={isLoadingGroups}>
                    {isLoadingGroups ? (
                      <option>Loading groups...</option>
                    ) : (
                      groups?.map((g: any) => (
                        <option key={g._id} value={g._id}>
                          {g.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <QuizCodeDialog
        open={openCodeDialog}
        onOpenChange={setOpenCodeDialog}
        code={quizCode}
      />
    </>
  );
}
