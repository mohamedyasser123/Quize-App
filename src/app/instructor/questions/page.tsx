
"use client";

import  { useState } from "react";
import { PlusCircle, Eye, Edit3, Trash2 } from "lucide-react";
import useQuestions from "@/src/hooks/instractor/question/useQuestions";
import { Question } from "@/src/types/instractor";
import QuestionDialog from "@/src/components/Questions/AddEidtQuestionDialog";
import useDeleteQuestion from "@/src/hooks/instractor/question/useDeleteQuestion";
import QuestionDetailsDialog from "@/src/components/Questions/QuestionDetailsDialog";
import ConfirmDeleteDialog from "@/src/components/shared/DeleteConfirmation/DeleteConfirmation";

export default function Questions() {
  const { questions, loading, getQuestions } = useQuestions();
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { deleteQuestion, loading: isDeleting } = useDeleteQuestion();
  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setOpenDelete(true);
  };
  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    const success = await deleteQuestion(selectedId);

    if (success) {
      setOpenDelete(false);
      setSelectedId(null);
      getQuestions();
    }
  };
  if (loading) return <p>Loading...</p>;


  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200 p-6 shadow-sm text-black select-none">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Bank Of Questions
        </h2>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 font-semibold px-4 py-2 rounded-full text-sm transition-all shadow-sm active:scale-95">
          <PlusCircle className="w-4 h-4 text-black" />
          <span>Add Question</span>
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[800px] border-collapse text-left text-sm">

          <thead>
            <tr className="bg-[#0B1220] text-white">
              <th className="px-4 py-3.5 font-semibold border-r border-gray-700 w-[25%]">Question Title</th>
              <th className="px-4 py-3.5 font-semibold border-r border-gray-700 w-[20%]">Question Desc</th>
              <th className="px-4 py-3.5 font-semibold border-r border-gray-700 w-[25%]">Question difficulty level</th>
              <th className="px-4 py-3.5 font-semibold w-[15%]">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {questions.map((q, idx) => (
              <tr
                key={q._id || idx}
                className="hover:bg-gray-50/80 transition-colors duration-150"
              >
                <td className="px-4 py-3.5 font-medium text-gray-900 border-r border-gray-200">
                  {q.title}
                </td>


                <td className="px-4 py-3.5 text-gray-500 border-r border-gray-200">
                  {q.description}
                </td>

                <td className="px-4 py-3.5 text-gray-700 border-r border-gray-200">
                  {q.difficulty}
                </td>


                <td className="px-4 py-3.5">
                  {q.options && (
                    <div className="flex items-center gap-4 text-orange-500">
                      <button className="hover:text-orange-600 transition-colors active:scale-90"
                        onClick={() => {
                          setSelectedQuestion(q);
                          setIsViewOpen(true);
                        }}
                      >
                        <Eye className="w-5 h-5 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedQuestion(q);
                          setIsAddOpen(true);
                        }}
                        className="hover:text-orange-600 transition-colors active:scale-90">
                        <Edit3 className="w-5 h-5 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(q._id)}

                        className="hover:text-red-600 transition-colors active:scale-90">
                        <Trash2 className="w-5 h-5 stroke-[2.5]" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <QuestionDetailsDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        question={selectedQuestion}
      />
      <QuestionDialog open={isAddOpen} onOpenChange={setIsAddOpen} onSubmitAction={getQuestions} />
      <QuestionDialog
        open={isAddOpen}
        onOpenChange={(value) => {
          setIsAddOpen(value);

          if (!value) {
            setSelectedQuestion(null);
          }
        }}
        question={selectedQuestion}
        onSubmitAction={getQuestions}
      />
      <ConfirmDeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
    </div>
  );
}
