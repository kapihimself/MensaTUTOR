export interface Question {
  id: string;
  lesson_id: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'mensa';
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string | null;
  image_url?: string | null;
  created_at: string;
}

export interface UserAnswer {
  id: string;
  user_id: string;
  question_id: string;
  selected_answer: string;
  is_correct: boolean;
  answered_at: string;
}
