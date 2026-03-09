import Link from 'next/link';
import { Lesson } from '@/types/lesson';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
}

export default function LessonCard({ lesson, isCompleted }: LessonCardProps) {
  return (
    <Link href={`/lesson/${lesson.id}`}>
      <div className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{lesson.title}</h3>
          {isCompleted && (
            <span className="text-green-600 font-bold">✓ Selesai</span>
          )}
        </div>
      </div>
    </Link>
  );
}