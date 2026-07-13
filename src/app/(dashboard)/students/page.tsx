
"use client";

import {  Eye, Trash2 } from "lucide-react";
import useStudents from "@/src/hooks/instractor/students/useStudent";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ConfirmDeleteDialog from "@/src/components/shared/DeleteConfirmation/DeleteConfirmation";
import { deleteStudentApi } from "@/src/services/instractor/student/student-api";
import useDeleteStudent from "@/src/hooks/instractor/students/useDeleteStudent";




export default function Students() {
  const { students, isLoading,refetch } = useStudents(false);
  const {loading,deleteStudent}=useDeleteStudent()
  const skeletonCards = Array(6).fill(null);

  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const safeStudents = students ?? [];

  const totalItems = safeStudents.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  const currentItems = safeStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const [isViewOpen, setIsViewOpen] = useState(false);
const [selectedStudent, setSelectedStudent] = useState<any>(null);
const handleView = (student: any) => {
  setSelectedStudent(student);
  setIsViewOpen(true);
};
const [openDelete, setOpenDelete] = useState(false);
const [isDeleting, setIsDeleting] = useState(false);
const handleDelete = (student: any) => {

  setSelectedStudent(student);
  setOpenDelete(true);
};
const handleConfirmDelete = async () => {
  if (!selectedStudent) return;

  try {
    setIsDeleting(true);

    const success = await deleteStudent(selectedStudent._id);

    if (success) {
      setOpenDelete(false);
      setSelectedStudent(null);

      refetch();
    }
  } finally {
    setIsDeleting(false);
  }
};
  useEffect(() => {
    setCurrentPage(1);
  }, [students]);
  return (
    <div className="w-full min-h-screen bg-gray-50/50 p-4 md:p-8 text-[#2C1A11]">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[#2C1A11]">Students list</h1>
      </div>

      <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            skeletonCards.map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-white animate-pulse"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-14 h-14 rounded-lg bg-gray-200 shrink-0" />
                  <div className="w-full space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0" />
              </div>
            ))
          ) : (
            currentItems?.map((student: any) => (
              <div
                key={student._id}
                className="flex items-center justify-between p-3.5 border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition duration-200 bg-white"
              >
                <div className="flex items-center gap-4 min-w-0 w-full">
                  <img
                    src={student.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"}
                    alt={`${student.first_name || 'student'}`}
                    className="w-14 h-14 rounded-lg object-cover bg-sky-200 shrink-0 border border-gray-100"
                  />

                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="text-base font-bold text-gray-900 truncate">
                      {student.first_name} {student.last_name}
                    </h3>

                    <p className="text-xs text-gray-500 font-medium flex items-center flex-wrap gap-y-1">
                      {student.rank && (
                        <span className="inline-flex items-center">
                          Class rank: <span className="text-gray-700 font-semibold ml-1">{student.rank}</span>
                          <span className="mx-2 text-gray-300">|</span>
                        </span>
                      )}
                      <span>
                        Average score: <span className="text-gray-700 font-semibold">{student.avg_score}%</span>
                      </span>
                    </p>

                    {student?.group?.name && (
                      <div className="pt-0.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200/60">
                          {student.group.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <button
                     onClick={() => handleView(student)}

                    className="p-2 hover:bg-gray-100 rounded-full transition text-gray-700 cursor-pointer active:scale-90"
                  >
                    <Eye size={20} className="stroke-[2.5]" />
                  </button>

                  <button
                    onClick={() => {
                      handleDelete(student);
                    }}
                    className="p-2 hover:bg-red-50 rounded-full transition text-red-600 cursor-pointer active:scale-90"
                  >
                    <Trash2 size={20} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent className="border border-[#EAD5C3] bg-white rounded-lg p-1 shadow-sm">

                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={`text-[#5C4636] hover:bg-[#FAF2EC] hover:text-[#2C1A11] transition-colors cursor-pointer ${currentPage === 1 ? "pointer-events-none opacity-40" : ""
                      }`}
                  />
                </PaginationItem>

                {Array.from(
                  { length: Math.min(totalPages, 5) },
                  (_, index) => {
                    const pageNum = index + 1;

                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNum);
                          }}
                          isActive={currentPage === pageNum}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={`text-[#5C4636] hover:bg-[#FAF2EC] hover:text-[#2C1A11] transition-colors cursor-pointer ${currentPage === totalPages ? "pointer-events-none opacity-40" : ""
                      }`}
                  />
                </PaginationItem>

              </PaginationContent>
            </Pagination>
          </div>
        )}



      </div>
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
  <DialogContent className="sm:max-w-[550px] bg-white rounded-2xl p-0 overflow-hidden border-none shadow-2xl text-black">
    
    <div className="bg-[#111827] p-6 text-white">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-sky-200 border-2 border-white overflow-hidden shrink-0">
          <img 
            src={selectedStudent?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
            alt="avatar" 
          />
        </div>
        <div>
          <DialogTitle className="text-xl font-bold">
            {selectedStudent?.first_name} {selectedStudent?.last_name}
          </DialogTitle>
          <p className="text-sky-300 text-sm font-medium">{selectedStudent?.role} Profile</p>
        </div>
      </div>
    </div>

    <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
      
      <section className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b pb-2">Personal Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 font-medium">Email Address</p>
            <p className="font-bold text-gray-900">{selectedStudent?.email}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Account Status</p>
            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-1 ${selectedStudent?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {selectedStudent?.status}
            </span>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Average Score</p>
            <p className="text-lg font-black text-emerald-600">{selectedStudent?.avg_score}%</p>
          </div>
        </div>
      </section>

      {selectedStudent?.group && (
        <section className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2">Group Details</h4>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
            <div>
              <p className="text-gray-500 font-medium">Group Name</p>
              <p className="font-bold text-[#111827]">{selectedStudent.group.name}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Instructor</p>
              <p className="font-bold text-gray-900">{selectedStudent.group.instructor}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Group Status</p>
              <p className="font-bold text-gray-700 capitalize">{selectedStudent.group.status}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Capacity</p>
              <p className="font-bold text-gray-900">Max {selectedStudent.group.max_students} Students</p>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
               <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Created At</p>
                  <p className="text-xs text-gray-600 font-medium">{new Date(selectedStudent.group.createdAt).toLocaleDateString()}</p>
               </div>
               <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Last Update</p>
                  <p className="text-xs text-gray-600 font-medium">{new Date(selectedStudent.group.updatedAt).toLocaleDateString()}</p>
               </div>
            </div>
          </div>
        </section>
      )}

      <div className="pt-2">
        <button 
          onClick={() => setIsViewOpen(false)}
          className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors active:scale-[0.98]"
        >
          Close Profile
        </button>
      </div>
    </div>
  </DialogContent>
</Dialog>
<ConfirmDeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
    </div>
  );
}