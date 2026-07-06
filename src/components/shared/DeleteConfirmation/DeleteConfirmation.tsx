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
        <div className="absolute right-4 top-4 flex items-center gap-1.5">
          <button
            onClick={onConfirm}
            className="p-1.5 rounded-lg bg-[#FAF2EC] text-[#7A6453] hover:bg-[#F5E6DA] hover:text-[#2C1A11] transition-colors cursor-pointer disabled:opacity-50">
            <Check size={18} className="stroke-[2.5]" />
          </button>

          <button
            onClick={() => onOpenChange(false)}
            className="p-1.5 rounded-lg bg-[#FAF2EC] text-[#7A6453] hover:bg-[#F5E6DA] hover:text-[#2C1A11] transition-colors cursor-pointer">
            <X size={18} className="stroke-[2.5]" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center space-y-4 mt-6">
          <div
            className="p-4 bg-white text-[#5C4636] border border-[#EAD5C3] rounded-full shadow-sm">
            <Trash2 size={40} className="stroke-[2]" />
          </div>

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
