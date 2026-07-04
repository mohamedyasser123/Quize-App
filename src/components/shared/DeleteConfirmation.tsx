"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Check, X } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  loading?: boolean;
};

export default function ConfirmDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] max-w-[400px] p-6 bg-[#FAF2EC] border border-[#EAD5C3] shadow-2xl rounded-2xl font-sans [&>button]:hidden">
        {/* Buttons top right */}
        <div className="absolute right-4 top-4 flex items-center gap-1.5">
          {/* Confirm */}
          <button className="p-1.5 rounded-lg bg-white/80 text-[#137333] hover:bg-[#E6F4EA] border border-[#CEEAD6] transition-colors disabled:opacity-50">
            <Check size={16} className="stroke-[3]" />
          </button>

          {/* Cancel */}
          <button
            onClick={() => onOpenChange(false)}
            title="Cancel"
            className="p-1.5 rounded-lg bg-white/80 text-[#C5221F] hover:bg-[#FCE8E6] border border-[#FAD2CF] transition-colors disabled:opacity-50">
            <X size={16} className="stroke-[3]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center space-y-4 mt-6">
          {/* Icon */}
          <div
            onClick={onConfirm}
            className="p-4 bg-white text-[#5C4636] border border-[#EAD5C3] rounded-full shadow-sm">
            <Trash2 size={40} className="stroke-[2]" />
          </div>

          {/* Text */}
          <DialogHeader className="space-y-2 flex flex-col items-center">
            <DialogTitle className="text-xl font-black text-[#2C1A11] text-center">
              Delete Item
            </DialogTitle>

            <DialogDescription className="text-sm text-[#7A6453] max-w-[320px] text-center">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}
