import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <main className="text-center max-w-2xl bg-white p-10 rounded-2xl shadow-xl border">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 tracking-tight">BisaMENSA</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Latih Kecerdasan Anda</h2>

        <p className="text-gray-600 mb-10 text-lg">
          Latih penalaran tingkat Mensa dengan modul yang terstruktur.
          Platform belajar mandiri untuk meningkatkan IQ dan kemampuan logika Anda.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Link href="/signup">
            <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Mulai Belajar
            </span>
          </Link>
          <Link href="/login">
            <span className="inline-block bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Masuk
            </span>
          </Link>
        </div>

        <div className="text-left bg-gray-50 p-6 rounded-xl border">
          <h3 className="font-bold text-gray-800 mb-4 text-xl">Fitur Utama:</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center">
              <span className="text-green-500 mr-2 text-xl">✔</span> Soal IQ Interaktif
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2 text-xl">✔</span> Penjelasan Langkah-demi-Langkah
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2 text-xl">✔</span> Pelacakan Progres & Gamifikasi
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}