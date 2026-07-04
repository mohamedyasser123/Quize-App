
"use client";

import Image from "next/image";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import useStudents from '@/src/hooks/student/useStudent';


export default function InstructorDashboard() {
  const { topStudents = [], isLoading } = useStudents();

  const staticQuizzes = [
    {
      id: 1,
      title: "Introduction to computer programming",
      date: "12 / 03 / 2023",
      time: "09:00 AM",
      enrolled: 32,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&q=80" 
    },
    {
      id: 2,
      title: "Psychology 101",
      date: "27 / 03 / 2023",
      time: "12:00 PM",
      enrolled: 17,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150&q=80"
    },
    {
      id: 3,
      title: "Introduction to computer programming",
      date: "12 / 03 / 2023",
      time: "09:00 AM",
      enrolled: 32,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&q=80"
    },
    {
      id: 4,
      title: "Psychology 101",
      date: "27 / 03 / 2023",
      time: "12:00 PM",
      enrolled: 17,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150&q=80"
    }
  ];

  const getOrdinalSuffix = (num: number) => {
    const j = num % 10, k = num % 100;
    if (j === 1 && k !== 11) return num + "st";
    if (j === 2 && k !== 12) return num + "nd";
    if (j === 3 && k !== 13) return num + "rd";
    return num + "th";
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-2 text-black select-none">
      
      <div className="lg:grid-cols-1 lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm flex flex-col gap-5">
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Upcoming 5 quizzes</h2>
          <button className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-black transition-colors">
            <span>Quiz directory</span>
            <ArrowRight className="w-4 h-4 text-[#a3df44] stroke-[2.5]" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {staticQuizzes.map((quiz) => (
            <div 
              key={quiz.id}
              className="flex items-center border border-gray-200 rounded-2xl p-3 bg-white hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-orange-50 rounded-xl overflow-hidden relative flex-shrink-0 flex items-center justify-center p-2">
                <img 
                  src={quiz.image} 
                  alt={quiz.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="flex-1 pl-4 flex flex-col justify-between h-full min-w-0">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 truncate leading-snug">
                    {quiz.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mt-1">
                    <span>{quiz.date}</span>
                    <span className="text-gray-300">|</span>
                    <span>{quiz.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 sm:mt-4">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">
                    No. of student's enrolled: <span className="font-bold text-gray-900">{quiz.enrolled}</span>
                  </span>
                  <button className="flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-900 hover:opacity-80">
                    <span>Open</span>
                    <ArrowRightCircle className="w-4 h-4 text-[#a3df44] fill-[#a3df44] stroke-white" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      <div className="lg:grid-cols-1 lg:col-span-5 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm flex flex-col gap-5">
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Top 5 Students</h2>
          <button className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-black transition-colors">
            <span>All Students</span>
            <ArrowRight className="w-4 h-4 text-[#a3df44] stroke-[2.5]" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="animate-pulse flex items-center border border-gray-100 rounded-2xl p-2.5 gap-4 bg-gray-50">
                <div className="w-16 h-16 bg-gray-200 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))
          ) : topStudents.length === 0 ? (
            <div className="text-center py-10 text-gray-400 font-medium">No students found</div>
          ) : (
            topStudents.map((student, index) => (
              <div 
                key={student._id || index}
                className="flex items-center border border-gray-200 rounded-2xl p-2.5 bg-white hover:shadow-md transition-shadow duration-200 relative group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden relative flex-shrink-0">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.first_name}`} 
                    alt={student.first_name}
                    className="w-full h-full object-cover bg-amber-100"
                  />
                </div>

                <div className="flex-1 pl-4 min-w-0 flex items-center justify-between">
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-base sm:text-lg text-gray-950 truncate">
                      {student.first_name} {student.last_name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mt-0.5">
                      <span>Class rank: <span className="font-medium text-gray-700">{getOrdinalSuffix(index + 1)}</span></span>
                      <span className="text-gray-300">|</span>
                      <span>Average score: <span className="font-semibold text-gray-800">{(student.avg_score * 10).toFixed(2)|| 0}%</span></span>
                    </div>
                  </div>

                  <button className="p-1 text-gray-900 group-hover:translate-x-1 transition-transform">
                    <ArrowRightCircle className="w-5 h-5 fill-black stroke-white" />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

