'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface LeaderboardUser {
  id: string;
  email: string;
  xp: number;
  level: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, xp, level')
        .order('xp', { ascending: false })
        .limit(50);

      if (!error && data) {
        setUsers(data);
      }
      setLoading(false);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <Navbar />
      <main className="max-w-4xl mx-auto py-10 px-4">
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">← Kembali ke Dashboard</Link>
          <h1 className="text-4xl font-extrabold flex items-center">
            <span className="text-4xl mr-3">🏆</span> Papan Peringkat Global
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Top 50 pengguna berdasarkan XP tertinggi.</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-10">Memuat data...</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-sm tracking-wider border-b border-gray-100">
                  <th className="p-4 font-semibold text-center w-16">Rank</th>
                  <th className="p-4 font-semibold">Pengguna</th>
                  <th className="p-4 font-semibold text-center w-24">Level</th>
                  <th className="p-4 font-semibold text-right w-32">XP</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="p-4 text-center font-bold text-gray-500">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-gray-800">{u.email.split('@')[0]}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full text-xs">Lv. {u.level}</span>
                    </td>
                    <td className="p-4 text-right font-bold text-blue-600">
                      {u.xp}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500 italic">Belum ada data.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}