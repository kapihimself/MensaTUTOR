export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  explanation: string | null;
  order_index: number;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
}
