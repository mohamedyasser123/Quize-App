export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: "Student";
  avg_score: number;
  group: {
    _id: string;
    name: string;
    status: string;
    instructor: string;
    students: string[];
    max_students: number;
    createdAt: string;
    updatedAt: string;
  };
}

export type StudentsResponse = Student[];