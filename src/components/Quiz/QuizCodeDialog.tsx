"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, Copy, X } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  code: string;
};

export default function QuizCodeDialog({
  open,
  onOpenChange,
  code,
}: Props) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Quiz code copied successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white border border-[#EAD5C3] rounded-2xl shadow-xl [&>button]:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FAF2EC] border-b border-[#EAD5C3]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#2C1A11]">
              Quiz Created
            </DialogTitle>
          </DialogHeader>

          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-lg hover:bg-[#F5E6DA] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 flex flex-col items-center text-center space-y-5">
          <CheckCircle2
            size={60}
            className="text-green-600 bg-green-50 rounded-full p-2"
          />

          <div>
            <h3 className="text-xl font-bold text-[#2C1A11]">
              Quiz Created Successfully
            </h3>

            <p className="text-sm text-[#7A6453] mt-2">
              Share this code with your students.
            </p>
          </div>

          {/* Code */}
          <div className="w-full border border-dashed border-[#D8BDA7] rounded-xl bg-[#FAF2EC] py-4">
            <span className="text-3xl font-bold tracking-[8px] text-[#2C1A11]">
              {code}
            </span>
          </div>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-[#2C1A11] text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition cursor-pointer"
          >
            <Copy size={18} />
            Copy Code
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}