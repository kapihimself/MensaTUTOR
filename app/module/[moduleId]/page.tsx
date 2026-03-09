'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Module } from '@/types/roadmap';
import { Lesson } from '@/types/lesson';
import LessonCard from '@/components/LessonCard';

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const [moduleData, setModuleData] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const moduleId = params.moduleId as string;
      if (!moduleId) return;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      // Fetch module
      const { data: mdData } = await supabase
        .from('modules')
        .select('*')
        .eq('id', moduleId)
        .single();
      if (mdData) setModuleData(mdData);

      // Fetch lessons
      const { data: lsData } = await supabase
        .from('lessons')
        .select('*')
        .eq('module_id', moduleId)
        .order('order_index');
      if (lsData) setLessons(lsData);

      // Fetch progress
      if (lsData && lsData.length > 0) {
        const lessonIds = lsData.map(l => l.id);
        const { data: prData } = await supabase
          .from('user_progress')
          .select('lesson_id, completed')
          .eq('user_id', session.user.id)
          .in('lesson_id', lessonIds)
          .eq('completed', true);

        const progMap: Record<string, boolean> = {};
        if (prData) {
          prData.forEach(p => {
            progMap[p.lesson_id] = p.completed;
          });
        }
        setProgress(progMap);
      }

      setLoading(false);
    }
    fetchData();
  }, [params.moduleId, router]);

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat...</div>;
  if (!moduleData) return <div className="p-8 text-center text-red-500">Module tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="max-w-4xl mx-auto py-10 px-4">
        <div className="mb-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <Link href={`/roadmap/${moduleData.roadmap_id}`} className="text-blue-600 hover:underline mb-4 inline-block">← Kembali ke Roadmap</Link>
          <h1 className="text-3xl font-extrabold mb-2">Module: {moduleData.title}</h1>
          <p className="text-gray-600 text-lg">{moduleData.description}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Lessons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isCompleted={!!progress[lesson.id]}
              />
            ))}
            {lessons.length === 0 && <p className="text-gray-500 col-span-2">Belum ada lesson di module ini.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}