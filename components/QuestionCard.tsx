import { Question } from '@/types/question';
import AnswerOptions from './AnswerOptions';

interface QuestionCardProps {
  question: Question;
  onAnswerSelect: (selectedAnswer: string) => void;
  selectedAnswer: string | null;
  isAnswered: boolean;
}

export default function QuestionCard({ question, onAnswerSelect, selectedAnswer, isAnswered }: QuestionCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
          {question.category}
        </span>
        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide ml-2">
          {question.difficulty}
        </span>
      </div>

      {question.image_url && (
        <div className="mb-6 flex justify-center">
          <img
            src={question.image_url}
            alt="Pertanyaan Visual"
            className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200"
            loading="lazy"
          />
        </div>
      )}

      <p className="text-xl text-gray-800 font-medium mb-6">{question.question_text}</p>
      <AnswerOptions
        question={question}
        onAnswerSelect={onAnswerSelect}
        selectedAnswer={selectedAnswer}
        isAnswered={isAnswered}
      />
    </div>
  );
}