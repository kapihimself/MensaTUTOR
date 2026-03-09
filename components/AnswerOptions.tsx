import { Question } from '@/types/question';

interface AnswerOptionsProps {
  question: Question;
  onAnswerSelect: (selectedAnswer: string) => void;
  selectedAnswer: string | null;
  isAnswered: boolean;
}

export default function AnswerOptions({ question, onAnswerSelect, selectedAnswer, isAnswered }: AnswerOptionsProps) {
  const options = [
    { key: 'A', value: question.option_a },
    { key: 'B', value: question.option_b },
    { key: 'C', value: question.option_c },
    { key: 'D', value: question.option_d },
  ];

  return (
    <div className="space-y-3">
      {options.map((opt) => {
        let buttonClass = 'w-full text-left p-4 border rounded-lg transition-colors duration-200 ';

        if (isAnswered) {
          if (opt.key === question.correct_answer) {
            buttonClass += 'bg-green-100 border-green-500 text-green-800';
          } else if (opt.key === selectedAnswer && opt.key !== question.correct_answer) {
            buttonClass += 'bg-red-100 border-red-500 text-red-800';
          } else {
            buttonClass += 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed';
          }
        } else {
          buttonClass += selectedAnswer === opt.key
            ? 'bg-blue-50 border-blue-500 text-blue-800'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50';
        }

        return (
          <button
            key={opt.key}
            onClick={() => !isAnswered && onAnswerSelect(opt.key)}
            disabled={isAnswered}
            className={buttonClass}
          >
            <span className="font-bold mr-4">{opt.key}</span>
            {opt.value}
          </button>
        );
      })}
    </div>
  );
}