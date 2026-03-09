'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Roadmap, Module } from '@/types/roadmap';

export default function RoadmapPage() {
  const params = useParams();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const roadmapId = params.roadmapId as string;
      if (!roadmapId) return;

      const { data: rdData } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('id', roadmapId)
        .single();

      if (rdData) setRoadmap(rdData);

      const { data: mdData } = await supabase
        .from('modules')
        .select('*')
        .eq('roadmap_id', roadmapId)
        .order('order_index');

      if (mdData) setModules(mdData);

      setLoading(false);
    }
    fetchData();
  }, [params.roadmapId]);

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat...</div>;
  if (!roadmap) return <div className="p-8 text-center text-red-500">Roadmap tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="max-w-4xl mx-auto py-10 px-4">
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">← Kembali ke Dashboard</Link>
          <h1 className="text-4xl font-extrabold">{roadmap.title}</h1>
          <p className="text-gray-600 mt-2 text-lg">{roadmap.description}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Modules</h2>
          <div className="space-y-4">
            {modules.map((mod, idx) => (
              <Link key={mod.id} href={`/module/${mod.id}`}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer flex items-center">
                   <div className="bg-purple-100 text-purple-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-6">
                      {idx + 1}
                    </div>
                  <div>
                    <h3 className="text-xl font-bold">{mod.title}</h3>
                    <p className="text-gray-600">{mod.description}</p>
                  </div>
                </div>
              </Link>
            ))}
            {modules.length === 0 && <p className="text-gray-500">Belum ada module di roadmap ini.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}