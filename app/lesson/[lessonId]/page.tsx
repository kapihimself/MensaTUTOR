'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Lesson } from '@/types/lesson';
import { Question } from '@/types/question';
import QuestionCard from '@/components/QuestionCard';
import { recordLessonCompletionAndGamification } from '@/lib/queries';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [xpEarned, setXpEarned] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const lessonId = params.lessonId as string;
      if (!lessonId) return;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUser(session.user);

      // Fetch lesson
      const { data: lsData } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single();
      if (lsData) setLesson(lsData);

      // Fetch question (assuming 1 question per lesson for MVP)
      const { data: qData } = await supabase
        .from('questions')
        .select('*')
        .eq('lesson_id', lessonId)
        .limit(1)
        .single();
      if (qData) setQuestion(qData);

      setLoading(false);
    }
    fetchData();
  }, [params.lessonId, router]);

  const handleSubmit = async () => {
    if (!selectedAnswer || !question || !user || !lesson) return;
    setIsAnswered(true);
    setShowExplanation(true);

    const isCorrect = selectedAnswer === question.correct_answer;

    // Save user answer
    await supabase.from('user_answers').insert([
      {
        user_id: user.id,
        question_id: question.id,
        selected_answer: selectedAnswer,
        is_correct: isCorrect,
      }
    ]);

    // If correct, record completion & give XP
    if (isCorrect) {
      await recordLessonCompletionAndGamification(user.id, lesson.id);
      setXpEarned(true);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat...</div>;
  if (!lesson) return <div className="p-8 text-center text-red-500">Lesson tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <Navbar />
      <main className="max-w-3xl mx-auto py-10 px-4">
        <Link href={`/module/${lesson.module_id}`} className="text-blue-600 hover:underline mb-6 inline-block">← Kembali ke Module</Link>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h1 className="text-3xl font-bold mb-4">Lesson: {lesson.title}</h1>
          <div className="prose max-w-none text-gray-700 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-2">Penjelasan</h3>
            <p className="whitespace-pre-wrap">{lesson.explanation}</p>
          </div>
        </div>

        {question && (
          <QuestionCard
            question={question}
            onAnswerSelect={setSelectedAnswer}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
          />
        )}

        {!isAnswered && selectedAnswer && (
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-4 rounded-xl text-xl font-bold hover:bg-blue-700 shadow-md transition-all transform hover:-translate-y-1"
            >
              Cek Jawaban
            </button>
          </div>
        )}

        {showExplanation && question && (
          <div className="mt-8 bg-white p-8 rounded-xl shadow-md border border-gray-200 animate-fade-in-up">
            <h3 className={`text-2xl font-bold mb-4 ${selectedAnswer === question.correct_answer ? 'text-green-600' : 'text-red-600'}`}>
              {selectedAnswer === question.correct_answer ? 'Benar Sekali! 🎉' : 'Jawaban Kurang Tepat'}
            </h3>
            {xpEarned && (
              <div className="mb-4 inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold text-sm">
                +10 XP
              </div>
            )}
            <div className="bg-gray-50 p-6 rounded-lg border mt-2">
              <p className="font-bold text-gray-800 mb-2">Penjelasan:</p>
              <p className="text-gray-700 leading-relaxed">{question.explanation}</p>
            </div>

            <div className="mt-8">
               <Link href={`/module/${lesson.module_id}`}>
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl text-xl font-bold hover:bg-blue-700 transition">
                  Lanjut ke Lesson Berikutnya →
                </button>
               </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}