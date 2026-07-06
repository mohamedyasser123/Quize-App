"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  Check,
  X,
} from "lucide-react";
import  toast from "react-hot-toast";

import { getAllStudentsApi } from "@/src/services/student";

import {
  Group,
  GroupFormData,
} from "@/src/types/group/group-type";

interface Student {
  _id: string;
  first_name: string;
  last_name: string;
}

interface UpdateGroupFormProps {
  group: Group;
  onUpdateGroup: (
    id: string,
    data: GroupFormData
  ) => Promise<void>;
  onClose: () => void;
}

export default function UpdateGroupForm({
  group,
  onUpdateGroup,
  onClose,
}: UpdateGroupFormProps) {
  const [students, setStudents] = useState<Student[]>([]);

  const [isLoadingStudents, setIsLoadingStudents] =
    useState(true);

  const [groupName, setGroupName] = useState(group.name);

  const [selectedStudents, setSelectedStudents] = useState<
    string[]
  >(group.students);

  const [isStudentsOpen, setIsStudentsOpen] =
    useState(false);

  const [nameError, setNameError] = useState("");

  const [studentsError, setStudentsError] = useState("");

  useEffect(() => {
    const getStudents = async () => {
      try {
        setIsLoadingStudents(true);

        const data = await getAllStudentsApi();

        setStudents(data);
      } catch (error) {
        console.error("Error getting students:", error);

        toast.error("Failed to load students");
      } finally {
        setIsLoadingStudents(false);
      }
    };

    getStudents();
  }, []);

  const handleStudentSelect = (studentId: string) => {
    const updatedStudents = selectedStudents.includes(
      studentId
    )
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

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
      await onUpdateGroup(group._id, {
        name: groupName,
        students: selectedStudents,
      });

      toast.success("Group updated successfully");

      onClose();
    } catch (error) {
      console.error("Error updating group:", error);

      toast.error("Failed to update group");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full  bg-white rounded-2xl overflow-visible shadow-lg"
    >
      <div className="flex items-stretch border-b border-gray-300">
        <div className="flex-1 px-16 py-9">
          <h2 className="text-2xl font-bold">
            Update Group
          </h2>
        </div>

        <button
          type="submit"
          className="w-28 flex items-center justify-center border-l border-gray-300 hover:bg-gray-50"
        >
          <Check
            className="w-8 h-8"
            strokeWidth={3}
          />
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-28 flex items-center justify-center border-l border-gray-300 hover:bg-gray-50"
        >
          <X
            className="w-8 h-8"
            strokeWidth={3}
          />
        </button>
      </div>

      <div className="px-16 pt-14 pb-8">
        <div className="flex flex-col gap-10">
          <div>
            <div className="flex min-h-18 border border-gray-300 rounded-lg overflow-hidden">
              <div className="w-40 shrink-0 bg-[#FFEDDF] px-3 flex items-center font-semibold text-xl">
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
                className="flex-1 px-6 outline-none bg-white text-lg"
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
              disabled={isLoadingStudents}
              onClick={() =>
                setIsStudentsOpen((prev) => !prev)
              }
              className="w-full min-h-18 flex border border-gray-300 rounded-lg overflow-hidden bg-white"
            >
              <span className="w-40 shrink-0 bg-[#FFEDDF] px-3 flex items-center text-left font-semibold text-xl">
                List Students
              </span>

              <span className="flex-1 px-6 flex items-center justify-between text-left">
                <span className="text-gray-500 text-lg truncate">
                  {isLoadingStudents
                    ? "Loading students..."
                    : getSelectedStudentsNames()}
                </span>

                <ChevronDown
                  className={`w-7 h-7 shrink-0 transition-transform ${
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
                {students.length === 0 ? (
                  <p className="px-5 py-4 text-gray-500">
                    No students available
                  </p>
                ) : (
                  students.map((student) => (
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
    </form>
  );
}