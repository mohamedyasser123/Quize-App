"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, X, Calendar, Clock } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function QuizDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-white border border-[#EAD5C3] shadow-xl [&>button]:hidden">
        <div className="flex justify-between items-center px-6 py-4 bg-[#FAF2EC] border-b-2 border-sky-500">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#2C1A11]">
              Set up a new quiz
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center border-l border-[#EAD5C3] pl-4 gap-4">
            <button
              onClick={() => onOpenChange(false)}
              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition cursor-pointer">
              <Check size={22} className="stroke-[3]" />
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer">
              <X size={22} className="stroke-[3]" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 text-[#5C4636]">
          <h4 className="text-sm font-bold text-[#2C1A11] mb-2">Details</h4>

          <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
            <span className="bg-[#FAF2EC]  px-4 h-full flex items-center font-bold text-sm border-r border-[#EAD5C3] min-w-[100px] text-[#2C1A11]">
              Title:
            </span>
            <input
              type="text"
              className="flex-1 px-3 h-full outline-none text-sm text-[#2C1A11] bg-transparent"
              placeholder="Enter quiz title..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
              <span className="bg-[#FAF2EC] px-3 h-full flex items-center font-bold text-xs border-r border-[#EAD5C3] whitespace-nowrap text-[#2C1A11]">
                Duration{" "}
                <span className="text-[10px] font-normal text-[#7A6453] ml-1">
                  (in minutes)
                </span>
              </span>
              <select className="flex-1 px-2 h-full outline-none text-sm bg-transparent font-semibold text-[#2C1A11] cursor-pointer">
                <option>10</option>
                <option>20</option>
                <option>30</option>
              </select>
            </div>

            <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
              <span className="bg-[#FAF2EC] px-3 h-full flex items-center font-bold text-xs border-r border-[#EAD5C3] whitespace-nowrap text-[#2C1A11]">
                No. of questions
              </span>
              <select className="flex-1 px-2 h-full outline-none text-sm bg-transparent font-semibold text-[#2C1A11] cursor-pointer">
                <option>15</option>
                <option>20</option>
                <option>30</option>
              </select>
            </div>

            <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
              <span className="bg-[#FAF2EC] px-3 h-full flex items-center font-bold text-xs border-r border-[#EAD5C3] whitespace-nowrap text-[#2C1A11]">
                Score per question
              </span>
              <select className="flex-1 px-2 h-full outline-none text-sm bg-transparent font-semibold text-[#2C1A11] cursor-pointer">
                <option>1</option>
                <option>2</option>
                <option>5</option>
              </select>
            </div>
          </div>

          {/* 3. Description Input */}
          <div className="flex items-start border border-[#EAD5C3] rounded-lg overflow-hidden bg-white shadow-sm">
            <span className="bg-[#FAF2EC] px-4 py-3 font-bold text-sm border-r border-[#EAD5C3] min-w-[120px] text-[#2C1A11] self-stretch flex items-start">
              Description
            </span>
            <textarea
              rows={3}
              className="flex-1 p-3 outline-none text-sm text-[#2C1A11] bg-transparent resize-none"
              placeholder="Enter quiz description..."
            />
          </div>

          <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm max-w-md">
            <span className="bg-[#FAF2EC] px-4 h-full flex items-center font-bold text-sm border-r border-[#EAD5C3] text-[#2C1A11]">
              Schedule
            </span>
            <div className="flex items-center gap-4 px-3 text-sm text-[#2C1A11] font-semibold flex-1">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} className="text-[#5C4636]" />
                <span>11 / 05 / 2023</span>
              </div>
              <div className="flex items-center gap-1.5 border-l border-[#EAD5C3] pl-4">
                <Clock size={16} className="text-[#5C4636]" />
                <span>13 : 00</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
              <span className="bg-[#FAF2EC] px-3 h-full flex items-center font-bold text-xs border-r border-[#EAD5C3] whitespace-nowrap text-[#2C1A11]">
                Difficulty level
              </span>
              <select className="flex-1 px-2 h-full outline-none text-sm bg-transparent font-semibold text-[#2C1A11] cursor-pointer">
                <option>entry</option>
                <option>medium</option>
                <option>hard</option>
              </select>
            </div>

            <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
              <span className="bg-[#FAF2EC] px-3 h-full flex items-center font-bold text-xs border-r border-[#EAD5C3] whitespace-nowrap text-[#2C1A11]">
                Category type
              </span>
              <select className="flex-1 px-2 h-full outline-none text-sm bg-transparent font-semibold text-[#2C1A11] cursor-pointer">
                <option>FE</option>
                <option>BE</option>
                <option>FS</option>
              </select>
            </div>

            <div className="flex items-center border border-[#EAD5C3] rounded-lg overflow-hidden h-10 bg-white shadow-sm">
              <span className="bg-[#FAF2EC] px-3 h-full flex items-center font-bold text-xs border-r border-[#EAD5C3] whitespace-nowrap text-[#2C1A11]">
                Group name
              </span>
              <select className="flex-1 px-2 h-full outline-none text-sm bg-transparent font-semibold text-[#2C1A11] cursor-pointer">
                <option>JSB</option>
                <option>REACT</option>
                <option>NEXT</option>
              </select>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
