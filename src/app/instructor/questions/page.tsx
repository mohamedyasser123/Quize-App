
"use client";

import React, { useState } from "react";
import { PlusCircle, Eye, Edit3, Trash2 } from "lucide-react";
import useQuestions from "@/src/hooks/instractor/useQuestions";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Question } from "@/src/types/instractor";

export default function Questions() {
  const { questions, loading } = useQuestions();
const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  if (loading) return <p>Loading...</p>;
 

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200 p-6 shadow-sm text-black select-none">
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Bank Of Questions
        </h2>
        <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 font-semibold px-4 py-2 rounded-full text-sm transition-all shadow-sm active:scale-95">
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
                      <button className="hover:text-orange-600 transition-colors active:scale-90">
                        <Edit3 className="w-5 h-5 stroke-[2.5]" />
                      </button>
                      <button className="hover:text-red-600 transition-colors active:scale-90">
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
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl p-6 text-black border border-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-500" />
              <span>Question Details</span>
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-400 pt-1">
              Full overview of the selected question from the bank.
            </DialogDescription>
          </DialogHeader>

         {selectedQuestion && (
  <div className="mt-4 space-y-4 border-t border-gray-100 pt-4 text-sm">
    <div className="grid grid-cols-3 gap-2">
      <span className="font-semibold text-gray-500">Title:</span>
      <span className="col-span-2 font-bold text-gray-900">{selectedQuestion.title}</span>
    </div>

    {/* 2. الوصف */}
    <div className="grid grid-cols-3 gap-2">
      <span className="font-semibold text-gray-500">Description:</span>
      <span className="col-span-2 text-gray-700">{selectedQuestion.description}</span>
    </div>

    <div className="grid grid-cols-3 gap-2">
      <span className="font-semibold text-gray-500">Difficulty:</span>
      <span className="col-span-2">
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize
          ${selectedQuestion.difficulty === "hard" ? "bg-red-50 text-red-600" : ""}
          ${selectedQuestion.difficulty === "medium" ? "bg-orange-50 text-orange-600" : ""}
          ${selectedQuestion.difficulty === "easy" ? "bg-green-50 text-green-600" : ""}
        `}>
          {selectedQuestion.difficulty}
        </span>
      </span>
    </div>

    {/* 4. اسم الانستراكتور */}
    <div className="grid grid-cols-3 gap-2">
      <span className="font-semibold text-gray-500">Instructor:</span>
      <span className="col-span-2 font-medium text-gray-800">
        {selectedQuestion.instructor || selectedQuestion.instructor || "Not assigned"}
      </span>
    </div>

    <div className="border-t border-gray-100 pt-3">
      <span className="font-semibold text-gray-500 block mb-2">Answers Options:</span>
      <div className="space-y-2">
      {Object.entries(selectedQuestion.options)
  .filter(([key]) => key !== "_id")
  .map(([key, value]) => {
    const isCorrect = key === selectedQuestion.answer;

    return (
      <div
        key={key}
        className={`flex items-center justify-between p-3 rounded-xl border text-sm
          ${
            isCorrect
              ? "bg-green-50 border-green-200 text-green-900 font-semibold"
              : "bg-gray-50 border-gray-200 text-gray-700"
          }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
              ${
                isCorrect
                  ? "bg-green-600 text-white"
                  : "bg-white border border-gray-300 text-gray-500"
              }`}
          >
            {key}
          </span>

          <span>{value}</span>
        </div>

        {isCorrect && (
          <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-md">
            Correct
          </span>
        )}
      </div>
    );
  })}
      </div>
    </div>

  </div>
)}

          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setIsViewOpen(false)}
              className="bg-[#0B1220] hover:bg-opacity-90 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
            >
              Close Window
            </button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
