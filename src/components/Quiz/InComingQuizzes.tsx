"use client";

import useinComingQuizzes from "@/src/hooks/instractor/quiz/useInComingQuizzes";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <Card className="w-full bg-white border border-[#EAD5C3] rounded-xl p-5 shadow-sm space-y-4">
      <CardHeader className="p-0 space-y-3">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-1/3 bg-[#F5E6DA]/60" />
          <Skeleton className="h-5 w-20 rounded-full bg-[#F5E6DA]/60" />
        </div>
        <Skeleton className="h-6 w-28 rounded-md bg-[#F5E6DA]/60" />
      </CardHeader>
      <CardContent className="p-0 space-y-5">
        <Skeleton className="h-4 w-5/6 bg-[#F5E6DA]/60" />
        
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-24 bg-[#F5E6DA]/60" />
          <Skeleton className="h-4 w-28 bg-[#F5E6DA]/60" />
          <Skeleton className="h-4 w-24 bg-[#F5E6DA]/60" />
          <Skeleton className="h-4 w-24 bg-[#F5E6DA]/60" />
        </div>

        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-16 rounded-full bg-[#F5E6DA]/60" />
          <Skeleton className="h-4 w-20 bg-[#F5E6DA]/60" />
        </div>

        <div className="border-t border-[#F4E3D4] pt-3 space-y-2">
          <Skeleton className="h-3 w-40 bg-[#F5E6DA]/60" />
          <Skeleton className="h-3 w-40 bg-[#F5E6DA]/60" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function InComingQuizzes() {
  const { quizzes, isLoading } = useinComingQuizzes();

  return (
    <section className="mt-8 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-[#2C1A11]">
        Incoming Quizzes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          quizzes?.map((quiz: any) => {
            const ptsPerQuestion = quiz.score_per_question || 0;
            const isClosed = quiz.status?.toUpperCase() === "CLOSED";

            return (
              <div
                key={quiz._id}
                className=" border border-[#EAD5C3] rounded-xl p-5 text-[#5C4636] w-full font-sans shadow-sm bg-[#FFF9F5] transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#2C1A11] tracking-wide">
                    {quiz.title}
                  </h3>
                  {isClosed ? (
                    <span className="flex items-center gap-1 bg-[#FCE8E6] text-[#C5221F] text-xs font-bold px-2.5 py-1 rounded-full border border-[#FAD2CF]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      CLOSED
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-[#E6F4EA] text-[#137333] text-xs font-bold px-2.5 py-1 rounded-full border border-[#CEEAD6]">
                      OPEN
                    </span>
                  )}
                </div>

                <div className="inline-block bg-[#F5E6DA] text-[#5C4636] text-xs px-2.5 py-1 rounded-md mb-4 font-mono border border-[#EAD5C3]">
                  Code: {quiz.code || "N/A"}
                </div>

                <p className="text-[#7A6453] text-sm mb-5 font-medium">
                  {quiz.description || "No description provided."}
                </p>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-[#5C4636] mb-5">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1A73E8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{quiz.duration} minutes</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#137333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>  {quiz.difficulty || 0} </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#B06000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                      <path d="M4 22h16" />
                      <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                      <path d="M12 2a6 6 0 0 1 6 6v1H6V8a6 6 0 0 1 6-6Z" />
                    </svg>
                    <span>{ptsPerQuestion} pts/question</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#651FFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M9 17h6" />
                      <path d="M9 12h6" />
                      <path d="M9 7h6" />
                    </svg>
                    <span>{quiz.questions_number} questions</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      quiz.difficulty?.toLowerCase() === "easy"
                        ? "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]"
                        : quiz.difficulty?.toLowerCase() === "medium"
                        ? "bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]"
                        : "bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]"
                    }`}
                  >
                    {quiz.difficulty?.toUpperCase()}
                  </span>
                  <span className="text-[#7A6453] text-xs font-semibold">
                    Type: {quiz.type}
                  </span>
                </div>

                <div className="border-t border-[#F4E3D4] pt-3 flex flex-col gap-1.5 text-xs text-[#7A6453] font-medium">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-70"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <span>
                      Scheduled:{" "}
                      {quiz.schadule
                        ? new Date(quiz.schadule).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-70"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 14 14" />
                    </svg>
                    <span>
                      Updated At:{" "}
                      {quiz.updatedAt
                        ? new Date(quiz.updatedAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {!isLoading && quizzes?.length === 0 && (
        <div className="text-center py-12 text-[#7A6453] bg-white border border-[#EAD5C3] rounded-xl shadow-sm">
          No upcoming quizzes found.
        </div>
      )}
    </section>
  );
}