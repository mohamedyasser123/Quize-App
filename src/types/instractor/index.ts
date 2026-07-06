export interface CreateQuizPayload {
  title: string;
  description: string;
  duration: number;
  schedule: string;
  questions_number: number;
  score_per_question: number;
  difficulty: string;
  type: string;
  group: string;
}

export interface QuizQuestion {
  _id: string;
  title: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    _id: string;
  };
}

export interface Quiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: QuizQuestion[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  closed_at: string;
  participants: number;
  __v: number;
}

export interface DeleteQuizResponse {
  message: string;
}
export interface Question {
  _id: string;
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    _id?: string;
  };
  answer: "A" | "B" | "C" | "D";
  status: string;
  instructor: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  type: "FE" | "BE";
}

export interface CreateQuestionData {
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: "A" | "B" | "C" | "D";
  difficulty: "easy" | "medium" | "hard";
  type: "FE" | "BE";
}

export interface SearchQuestionParams {
  difficulty?: "easy" | "medium" | "hard";
  type?: "FE" | "BE";
}