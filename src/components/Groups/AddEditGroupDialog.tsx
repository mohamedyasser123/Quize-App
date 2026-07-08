"use client";

import { useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import useStudents from "@/src/hooks/instractor/student/useStudent";

import {
  Group,
  GroupFormData,
} from "@/src/types/instractor/group/group-type";

interface AddEditGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group?: Group | null;
  onSubmit: (data: GroupFormData) => Promise<void>;
}

export default function AddEditGroupDialog({
  open,
  onOpenChange,
  group,
  onSubmit,
}: AddEditGroupDialogProps) {
  const { students, isLoading } = useStudents();

  const [groupName, setGroupName] = useState("");

  const [selectedStudents, setSelectedStudents] = useState<
    string[]
  >([]);

  const [isStudentsOpen, setIsStudentsOpen] =
    useState(false);

  const [nameError, setNameError] = useState("");

  const [studentsError, setStudentsError] =
    useState("");

  const isEditMode = Boolean(group);
const availableStudents = students.filter((student) => {
  if (!student.group) {
    return true;
  }

  if (isEditMode && student.group._id === group?._id) {
    return true;
  }

  return false;
});
  useEffect(() => {
    if (!open) {
      return;
    }

    if (group) {
      setGroupName(group.name);

      setSelectedStudents(group.students);
    } else {
      setGroupName("");

      setSelectedStudents([]);
    }

    setNameError("");

    setStudentsError("");

    setIsStudentsOpen(false);
  }, [group, open]);

  const handleStudentSelect = (
    studentId: string
  ) => {
    const updatedStudents =
      selectedStudents.includes(studentId)
        ? selectedStudents.filter(
            (id) => id !== studentId
          )
        : [...selectedStudents, studentId];

    setSelectedStudents(updatedStudents);

    setStudentsError("");

    setIsStudentsOpen(false);
  };

  const getSelectedStudentsNames = () => {
    const selectedNames = students
      .filter((student) =>
        selectedStudents.includes(student._id)
      )
      .map(
        (student) =>
          `${student.first_name} ${student.last_name}`
      );

    if (selectedNames.length === 0) {
      return "Select students...";
    }

    return selectedNames.join(", ");
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!groupName.trim()) {
      setNameError("Group name is required");

      hasError = true;
    } else {
      setNameError("");
    }

    if (selectedStudents.length === 0) {
      setStudentsError(
        "Please select at least one student"
      );

      hasError = true;
    } else {
      setStudentsError("");
    }

    if (hasError) {
      return;
    }

    try {
      await onSubmit({
        name: groupName,
        students: selectedStudents,
      });

      toast.success(
        isEditMode
          ? "Group updated successfully"
          : "Group created successfully"
      );

      onOpenChange(false);
    } catch (error) {
      console.error(error);

      toast.error(
        isEditMode
          ? "Failed to update group"
          : "Failed to create group"
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="w-[90vw] sm:max-w-[750px] p-0 bg-white rounded-2xl overflow-visible shadow-lg [&>button]:hidden">
        <div className="flex items-stretch border-b border-gray-300">
          <div className="flex-1 px-10 py-7">
            <h2 className="text-2xl font-bold">
              {isEditMode
                ? "Update Group"
                : "Set Up A New Group"}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-18 flex items-center justify-center border-l border-gray-300 hover:bg-gray-50"
          >
            <Check
              className="w-7 h-7"
              strokeWidth={3}
            />
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-18 flex items-center justify-center border-l border-gray-300 hover:bg-gray-50"
          >
            <X
              className="w-7 h-7"
              strokeWidth={3}
            />
          </button>
        </div>

        <div className="px-10 pt-8 pb-6">
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex min-h-16 border border-gray-300 rounded-lg overflow-hidden">
                <div className="w-40 shrink-0 bg-[#FFEDDF] px-5 flex items-center font-medium whitespace-nowrap">
                  Group Name
                </div>

                <input
                  type="text"
                  value={groupName}
                  onChange={(event) => {
                    setGroupName(event.target.value);

                    setNameError("");
                  }}
                  placeholder="Group Name"
                  className="flex-1 min-w-0 px-5 outline-none bg-white"
                />
              </div>

              {nameError && (
                <p className="text-red-500 text-sm mt-1">
                  {nameError}
                </p>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                disabled={isLoading}
                onClick={() =>
                  setIsStudentsOpen(
                    (prev) => !prev
                  )
                }
                className="w-full min-h-16 flex border border-gray-300 rounded-lg overflow-hidden bg-white"
              >
                <span className="w-40 shrink-0 bg-[#FFEDDF] px-5 flex items-center text-left font-medium whitespace-nowrap">
                  List Students
                </span>

                <span className="flex-1 min-w-0 px-5 flex items-center justify-between text-left">
                  <span className="text-gray-500 truncate">
                    {isLoading
                      ? "Loading students..."
                      : getSelectedStudentsNames()}
                  </span>

                  <ChevronDown
                    className={`w-6 h-6 shrink-0 transition-transform ${
                      isStudentsOpen
                        ? "rotate-180"
                        : ""
                    }`}
                    strokeWidth={3}
                  />
                </span>
              </button>

              {isStudentsOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg max-h-55 overflow-y-auto z-50 shadow-lg">
                  {availableStudents.length === 0? (
                    <p className="px-5 py-4 text-gray-500">
                      No students available
                    </p>
                  ) : (
                    availableStudents.map((student) => (
                      <button
                        key={student._id}
                        type="button"
                        onClick={() =>
                          handleStudentSelect(
                            student._id
                          )
                        }
                        className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-[#FFEDDF]"
                      >
                        <input
                          type="checkbox"
                          readOnly
                          checked={selectedStudents.includes(
                            student._id
                          )}
                        />

                        <span>
                          {student.first_name}{" "}
                          {student.last_name}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}

              {studentsError && (
                <p className="text-red-500 text-sm mt-1">
                  {studentsError}
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}