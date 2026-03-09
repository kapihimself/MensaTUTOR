'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProgressBar from '@/components/ProgressBar';
import Link from 'next/link';
import { Roadmap } from '@/types/roadmap';
import { fetchUserAnalytics, AnalyticsData } from '@/lib/queries';

export default function Dashboard() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [userData, setUserData] = useState<{ xp: number; level: number; streak: number } | null>(null);
  const [progress, setProgress] = useState(0);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);

  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);

        // Fetch User Data (XP, Level, Streak)
        const { data: uData, error: uError } = await supabase
          .from('users')
          .select('xp, level, streak')
          .eq('id', session.user.id)
          .single();

        if (uData && !uError) {
          setUserData(uData);
        } else if (uError && uError.code === 'PGRST116') {
             // Create user profile if it doesn't exist
            await supabase.from('users').insert([{ id: session.user.id, email: session.user.email }]);
            setUserData({ xp: 0, level: 1, streak: 0 });
        }

        // Fetch Roadmaps
        const { data: rdData } = await supabase
          .from('roadmaps')
          .select('*')
          .order('order_index');

        if (rdData) setRoadmaps(rdData);

        // Fetch User Progress for dummy bar (simplified)
        const { count } = await supabase
            .from('user_progress')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', session.user.id)
            .eq('completed', true);

        setProgress(Math.min((count || 0) * 5, 100)); // Just a dummy calc for now

        // Fetch Analytics
        const userAnalytics = await fetchUserAnalytics(session.user.id);
        setAnalytics(userAnalytics);
      }
      setLoading(false);
    }
    getUser();
  }, [router]);

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Selamat Datang Kembali!</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total XP</h3>
            <p className="text-4xl font-extrabold text-blue-600">{userData?.xp || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Level</h3>
            <p className="text-4xl font-extrabold text-purple-600">{userData?.level || 1}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Streak</h3>
            <p className="text-4xl font-extrabold text-orange-500">{userData?.streak || 0} 🔥</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">Progres Anda</h2>
            <ProgressBar progress={progress} />
            <p className="text-gray-600 mb-6">{progress}% Selesai</p>
            <Link href="/roadmap/1">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                Lanjutkan Belajar →
              </button>
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">Analitik Kemampuan</h2>
            {analytics.length === 0 ? (
              <p className="text-gray-500 italic">Belum ada data untuk dianalisis. Kerjakan latihan untuk melihat kekuatan dan kelemahanmu.</p>
            ) : (
              <ul className="space-y-4">
                {analytics.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="font-semibold text-gray-800">{item.category}</span>
                    <span className={`font-bold px-3 py-1 rounded-full text-sm ${item.accuracy >= 80 ? 'bg-green-100 text-green-800' : item.accuracy >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {item.accuracy}% Akurat
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mb-10 flex gap-4">
          <Link href="/simulation">
             <div className="bg-indigo-600 p-6 rounded-xl shadow-md text-white hover:bg-indigo-700 transition cursor-pointer flex items-center justify-between">
                <div>
                   <h2 className="text-2xl font-bold mb-2">🔥 Ujian Simulasi Mensa</h2>
                   <p className="text-indigo-100">Coba tes waktu 30 menit dan dapatkan estimasi skor IQ kamu.</p>
                </div>
                <div className="text-4xl">→</div>
             </div>
          </Link>
          <Link href="/leaderboard">
             <div className="bg-orange-500 p-6 rounded-xl shadow-md text-white hover:bg-orange-600 transition cursor-pointer flex items-center justify-between">
                <div>
                   <h2 className="text-2xl font-bold mb-2">🏆 Papan Peringkat</h2>
                   <p className="text-orange-100">Lihat siapa yang memiliki XP tertinggi minggu ini.</p>
                </div>
                <div className="text-4xl">→</div>
             </div>
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Roadmaps</h2>
          <div className="space-y-4">
            {roadmaps.length === 0 ? (
              <p className="text-gray-500 italic">Belum ada roadmap tersedia. Jalankan script seed di Supabase.</p>
            ) : (
              roadmaps.map((rm, idx) => (
                <Link key={rm.id} href={`/roadmap/${rm.id}`}>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer flex items-center">
                    <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-6">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{rm.title}</h3>
                      <p className="text-gray-600">{rm.description}</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}