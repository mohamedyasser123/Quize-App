export interface JoinQuizDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoin: (code: string) => Promise<any>; 
  isLoading?: boolean;
}

