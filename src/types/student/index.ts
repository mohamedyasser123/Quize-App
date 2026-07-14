export interface JoinQuizDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoin: (code: string) => Promise<any>; 
  isLoading?: boolean;
}


export interface StudentWithoutGroup {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
}
