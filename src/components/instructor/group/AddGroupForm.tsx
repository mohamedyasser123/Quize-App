"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import useCreateGroup from "@/src/hooks/instractor/group/useCreateGroup";
import useStudentsWithoutGroup from "@/src/hooks/instractor/group/useStudentsWithoutGroup";
import { GroupFormData } from "@/src/types/group/group-type";

interface AddGroupFormProps {
  onCreateGroup: (data: GroupFormData) => Promise<void>;
  onClose: () => void;
}

export default function AddGroupForm({
  onCreateGroup,
  onClose,
}: AddGroupFormProps) {
  const { register, handleSubmit, errors, setValue } =
    useCreateGroup({
      onCreateGroup,
    });

  const { students, isLoadingStudents } =
    useStudentsWithoutGroup();

  const [isStudentsOpen, setIsStudentsOpen] = useState(false);

  const [selectedStudents, setSelectedStudents] = useState<
    string[]
  >([]);

  const handleStudentSelect = (studentId: string) => {
    const updatedStudents = selectedStudents.includes(studentId)
      ? selectedStudents.filter((id) => id !== studentId)
      : [...selectedStudents, studentId];

    setSelectedStudents(updatedStudents);

    setValue("students", updatedStudents, {
      shouldValidate: true,
    });

    setIsStudentsOpen(false);
  };

  const onSubmit = async (data: GroupFormData) => {
    try {
      await onCreateGroup(data);

      toast.success("Group created successfully");
    } catch (error) {
      console.error("Error creating group:", error);

      toast.error("Failed to create group");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white rounded-2xl overflow-visible"
    >
      <div className="flex items-stretch border-b border-gray-300">
        <div className="flex-1 px-10 py-7">
          <h2 className="text-2xl font-bold">
            Set Up A New Group
          </h2>
        </div>

        <button
          type="submit"
          className="w-18 flex items-center justify-center border-l border-gray-300 text-3xl font-bold hover:bg-gray-50"
        >
          ✓
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-18 flex items-center justify-center border-l border-gray-300 text-3xl font-bold hover:bg-gray-50"
        >
          ×
        </button>
      </div>

      <div className="px-10 py-8">
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex min-h-16 border border-gray-300 rounded-lg overflow-hidden">
              <div className="w-40 shrink-0 bg-[#FFEDDF] px-5 flex items-center font-medium whitespace-nowrap">
                Group Name
              </div>

              <input
                type="text"
                placeholder="Group Name"
                {...register("name", {
                  required: "Group name is required",
                })}
                className="flex-1 min-w-0 px-5 outline-none bg-white"
              />
            </div>

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              disabled={isLoadingStudents}
              onClick={() =>
                setIsStudentsOpen((prev) => !prev)
              }
              className="w-full min-h-16 flex border border-gray-300 rounded-lg overflow-hidden bg-white"
            >
              <span className="w-40 shrink-0 bg-[#FFEDDF] px-5 flex items-center text-left font-medium whitespace-nowrap">
                List Students
              </span>

              <span className="flex-1 min-w-0 px-5 flex items-center text-left">
                <span className="text-gray-500 truncate">
                  {selectedStudents.length > 0
                    ? students
                        .filter((student) =>
                          selectedStudents.includes(student._id)
                        )
                        .map(
                          (student) =>
                            `${student.first_name} ${student.last_name}`
                        )
                        .join(", ")
                    : "Select students..."}
                </span>
              </span>

              <span className="w-18 shrink-0 flex items-center justify-center border-l border-gray-300 text-3xl font-bold text-black">
                {isStudentsOpen ? "⌃" : "⌄"}
              </span>
            </button>

            {isStudentsOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg max-h-55 overflow-y-auto z-50 shadow-lg">
                {students.length === 0 ? (
                  <p className="px-5 py-4 text-gray-500">
                    No students available
                  </p>
                ) : (
                  students.map((student) => (
                    <label
                      key={student._id}
                      className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-[#FFEDDF]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(
                          student._id
                        )}
                        onChange={() =>
                          handleStudentSelect(student._id)
                        }
                      />

                      <span>
                        {student.first_name}{" "}
                        {student.last_name}
                      </span>
                    </label>
                  ))
                )}
              </div>
            )}

            <input
              type="hidden"
              {...register("students", {
                validate: (value) =>
                  value.length > 0 ||
                  "Please select at least one student",
              })}
            />

            {errors.students && (
              <p className="text-red-500 text-sm mt-1">
                {errors.students.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}