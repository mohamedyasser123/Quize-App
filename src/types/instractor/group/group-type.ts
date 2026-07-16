export interface Group {
  _id: string;
  name: string;
  students: string[];
}

export interface GroupFormData {
  name: string;
  students: string[];
}