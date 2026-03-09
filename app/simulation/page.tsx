'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Question } from '@/types/question';

export default function SimulationPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [score, setScore] = useState<{ correct: number; total: number; estimatedIq: number } | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      // In a real app we'd fetch randomly based on difficulty weights.
      // Here we fetch a random assortment using PostgreSQL random() if supported,
      // or just grab the first 30 for the MVP.
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .limit(30);

      if (!error && data) {
        // Shuffle client side for basic randomness
        const shuffled = data.sort(() => 0.5 - Math.random());
        setQuestions(shuffled);
      }
      setLoading(false);
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (started && !finished && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && !finished) {
      // Inline finish logic here or use useCallback
      setFinished(true);
      let correct = 0;
      questions.forEach(q => {
        if (answers[q.id] === q.correct_answer) correct++;
      });
      const baseline = 80;
      const maxPoints = 65;
      const estimatedIq = Math.round(baseline + ((correct / questions.length) * maxPoints));
      setScore({ correct, total: questions.length, estimatedIq });
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [started, finished, timeLeft, answers, questions]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswerSelect = (opt: string) => {
    setAnswers({ ...answers, [questions[currentQuestionIndex].id]: opt });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(i => i - 1);
    }
  };

  const finishSimulation = () => {
    setFinished(true);
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct_answer) correct++;
    });

    // Extremely basic dummy IQ calculation (100 is average, max say 140 for this test)
    // 30 questions. (correct / 30) * max_points_above_baseline + baseline
    const baseline = 80;
    const maxPoints = 65;
    const estimatedIq = Math.round(baseline + ((correct / questions.length) * maxPoints));

    setScore({ correct, total: questions.length, estimatedIq });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Mempersiapkan soal...</div>;

  if (finished && score) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl border text-center max-w-lg w-full">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center justify-center">
             <span className="mr-3 text-5xl">🧠</span> Hasil Simulasi
          </h1>

          <div className="mb-8">
            <p className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-2">Estimasi Skor IQ</p>
            <p className={`text-7xl font-black ${score.estimatedIq >= 130 ? 'text-purple-600' : score.estimatedIq >= 115 ? 'text-blue-600' : 'text-gray-800'}`}>
              {score.estimatedIq}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
               <p className="text-green-800 font-bold text-3xl">{score.correct}</p>
               <p className="text-green-600 text-sm font-semibold uppercase">Benar</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
               <p className="text-red-800 font-bold text-3xl">{score.total - score.correct}</p>
               <p className="text-red-600 text-sm font-semibold uppercase">Salah</p>
            </div>
          </div>

          <Link href="/dashboard">
            <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-lg hover:bg-blue-700 transition">
              Kembali ke Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
         <div className="bg-white p-10 rounded-2xl shadow-xl border text-center max-w-xl w-full">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 flex items-center justify-center">
              <span className="mr-3 text-4xl">⏱️</span> Ujian Simulasi Mensa
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Kamu akan diberikan <strong>{questions.length} soal</strong> acak dengan batas waktu <strong>30 menit</strong>.
              Ujian ini didesain untuk mensimulasikan tekanan dan format tes kognitif sesungguhnya.
              Pastikan kamu berada di tempat yang tenang.
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleStart}
                disabled={questions.length === 0}
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl text-xl hover:bg-indigo-700 transition disabled:bg-gray-400"
              >
                {questions.length === 0 ? 'Soal Tidak Tersedia' : 'Mulai Simulasi'}
              </button>
              <Link href="/dashboard" className="text-gray-500 font-semibold hover:text-gray-800">Batal</Link>
            </div>
         </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQ.id];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <Navbar />
      <div className="bg-indigo-600 text-white sticky top-0 z-10 shadow-md">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
           <div className="font-semibold">Soal {currentQuestionIndex + 1} / {questions.length}</div>
           <div className={`font-mono text-xl font-bold flex items-center ${timeLeft < 300 ? 'text-red-300 animate-pulse' : ''}`}>
             <span className="mr-2">⏱️</span> {formatTime(timeLeft)}
           </div>
        </div>
        {/* Progress bar line */}
        <div className="h-1 bg-indigo-900 w-full">
          <div className="h-1 bg-green-400 transition-all" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
           <div className="mb-4">
            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
              {currentQ.category}
            </span>
          </div>

          {currentQ.image_url && (
            <div className="mb-6 flex justify-center">
              <img
                src={currentQ.image_url}
                alt="Visual Logic"
                className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200"
              />
            </div>
          )}

          <h2 className="text-2xl font-medium text-gray-800 leading-relaxed mb-8">{currentQ.question_text}</h2>

          <div className="space-y-3">
             {[
               { k: 'A', v: currentQ.option_a },
               { k: 'B', v: currentQ.option_b },
               { k: 'C', v: currentQ.option_c },
               { k: 'D', v: currentQ.option_d },
             ].map(opt => (
               <button
                 key={opt.k}
                 onClick={() => handleAnswerSelect(opt.k)}
                 className={`w-full text-left p-5 border-2 rounded-xl transition-all font-medium text-lg flex items-center
                   ${selectedAnswer === opt.k ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'}`}
               >
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold border-2
                   ${selectedAnswer === opt.k ? 'bg-indigo-600 text-white border-indigo-600' : 'text-gray-500 border-gray-300'}`}>
                   {opt.k}
                 </div>
                 {opt.v}
               </button>
             ))}
          </div>
        </div>

        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
           <button
             onClick={handlePrev}
             disabled={currentQuestionIndex === 0}
             className="px-6 py-3 font-semibold text-gray-600 disabled:opacity-30 hover:bg-gray-100 rounded-lg transition"
           >
             ← Sebelumnya
           </button>

           {currentQuestionIndex === questions.length - 1 ? (
             <button
               onClick={finishSimulation}
               className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 shadow-md transition"
             >
               Selesaikan Tes
             </button>
           ) : (
             <button
               onClick={handleNext}
               className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 shadow-md transition"
             >
               Selanjutnya →
             </button>
           )}
        </div>
      </main>
    </div>
  );
}