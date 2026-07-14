"use client";

import { useState } from "react";
import { Loader2, Check, X, ChevronDown } from "lucide-react";

import { Group, GroupFormData } from "@/src/types/instractor/group/group-type";
import useGroupForm from "@/src/hooks/instractor/group/useFormModal";
import useStudentsWithoutGroup from "@/src/hooks/instractor/students/useWithoutGroup";

interface GroupFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSuccess: (data: GroupFormData) => Promise<void>;
  onUpdateSuccess: (id: string, data: GroupFormData) => Promise<void>;
  group?: Group | null;
}

export default function GroupFormModal({
  isOpen,
  onClose,
  onCreateSuccess,
  onUpdateSuccess,
  group,
}: GroupFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, errors, onSubmit, isEdit } = useGroupForm({
    group,
    onCreateGroup: onCreateSuccess,
    onUpdateGroup: onUpdateSuccess,
  });
  const { students, isLoading } = useStudentsWithoutGroup();

  const handleFormSubmit = async (data: GroupFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#EAD5C3] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-[#EAD5C3] h-16">
          <div className="px-6 font-bold text-lg text-[#2C1A11]">
            {isEdit ? "Update Group" : "Set up a new Group"}
          </div>

          <div className="flex h-full border-l border-[#EAD5C3]">
            <button
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isSubmitting}
              type="button"
              className="flex items-center justify-center w-16 h-full hover:bg-[#FFE9D8]/30 text-[#2C1A11] active:bg-[#FFE9D8]/50 transition-colors border-r border-[#EAD5C3] cursor-pointer disabled:opacity-50">
              <Check size={22} strokeWidth={2.5} />
            </button>

            <button
              onClick={onClose}
              type="button"
              className="flex items-center justify-center w-16 h-full hover:bg-red-50 text-[#2C1A11] hover:text-red-600 active:bg-red-100 transition-colors cursor-pointer">
              <X size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-8 space-y-6">
          <div className="relative flex items-center border border-[#EAD5C3] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#BAA390] transition-all">
            <span className="bg-[#FFE9D8] text-[#5C4636] font-bold text-sm px-4 py-3 flex items-center justify-center border-r border-[#EAD5C3] select-none min-w-[120px] h-12">
              Group Name
            </span>
            <input
              id="name"
              type="text"
              className="w-full px-4 h-12 outline-none text-[#2C1A11] text-sm placeholder-[#BAA390] bg-white"
              {...register("name", {
                required: "Group name is required",
              })}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500 font-semibold px-1 -mt-4">
              {errors.name.message}
            </p>
          )}

          <div className="relative flex items-center border border-[#EAD5C3] rounded-xl overflow-hidden">
            <span className="bg-[#FFE9D8] text-[#5C4636] font-bold text-sm px-4 py-3 flex items-center justify-center border-r border-[#EAD5C3] min-w-[120px] h-12">
              Students
            </span>

            <select
              className="w-full h-12 px-4 pr-10 appearance-none outline-none bg-white text-sm text-[#2C1A11]"
              defaultValue="">
              <option value="" disabled>
                Select Student
              </option>

              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="absolute right-4 text-[#7A6453] pointer-events-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
