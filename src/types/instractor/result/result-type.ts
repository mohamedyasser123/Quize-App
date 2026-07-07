export interface QuizResult {
  quiz: QuizResultItem;
  participants: Participant[];
}

export interface QuizResultItem {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  closed_at: string;
  __v: number;
}

export interface Participant {
  _id?: string;
}