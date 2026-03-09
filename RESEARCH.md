# Riset Pasar: Penyedia Tes IQ & Asesmen Psikologi di Indonesia

Riset ini bertujuan untuk menganalisis penyedia layanan Tes IQ dan psikotes di Indonesia, mengidentifikasi pain point pelanggan, serta menawarkan validitas akademik (berbasis alat ukur standar) agar platform **BisaMENSA** dapat diposisikan sebagai platform yang andal, dapat dipertanggungjawabkan secara akademik, sekaligus menarik bagi pengguna.

---

## 1. Lanskap Penyedia Tes IQ di Indonesia

Penyedia tes IQ dan psikotes di Indonesia dapat dibagi menjadi dua kategori utama:

### A. Biro Psikologi & Layanan Profesional (Luring/Daring Terpandu)
Layanan ini menggunakan alat tes standar dengan skoring oleh Psikolog bersertifikat.
*   **Contoh:** Biro Psikologi Universitas (seperti LPT UI, UGM, Unpad), biro psikologi swasta (seperti Experd, Quantum, dsb.), dan platform seperti Riliv (untuk beberapa asesmen tertentu) atau biro konseling daring.
*   **Karakteristik:** Memiliki izin resmi (SIPP), alat ukur terkontrol (tidak disebarkan bebas), harga relatif mahal (Rp250.000 hingga >Rp1.000.000 per tes), dan prosesnya memakan waktu (harus reservasi, durasi tes panjang, hasil keluar berhari-hari).

### B. Platform Web/Aplikasi "Tes IQ Cepat" (Self-Service)
Layanan ini mengincar audiens massal yang penasaran dengan IQ mereka.
*   **Contoh:** Aplikasi di Play Store (Tes IQ & Psikotes), website gratis (seperti 123test, tes-iq.com, atau berbagai tes kepribadian berbalut IQ).
*   **Karakteristik:** Sangat mudah diakses, gratis atau sangat murah, instan. Namun, validitas dan reliabilitasnya sangat diragukan, sering kali tidak menggunakan norma populasi Indonesia yang valid, dan lebih berfokus pada *engagement* atau iklan (ad-driven).

---

## 2. Customer Pain Points (Masalah Pelanggan)

Berdasarkan diskusi di forum-forum pencari kerja (seperti portal HR, Kaskus, Quora Indonesia, dan grup Telegram CPNS/BUMN), keluhan pengguna terhadap tes IQ saat ini meliputi:

1.  **Aksesibilitas & Biaya:** Tes yang valid dan bersertifikat psikolog sangat mahal dan tidak praktis bagi siswa atau *job seeker* yang hanya ingin "berlatih" atau mengukur kemampuan dasar sebelum tes sesungguhnya.
2.  **Ketiadaan Pembahasan (Feedback):** Biro psikologi hanya memberikan "Skor Akhir" (misal: IQ 115). Pengguna tidak tahu di bagian mana mereka salah (karena alat tes dilindungi kerahasiaannya). Mereka tidak bisa **belajar** dari kesalahan mereka.
3.  **Sampah Digital (Validitas Rendah):** Aplikasi gratisan di internet sering memberikan skor yang *over-inflated* (semua orang mendapat IQ 130+) untuk menyenangkan pengguna agar mau membagikan hasilnya ke media sosial. Pengguna yang kritis menyadari ini palsu dan mencari alternatif yang lebih menantang dan realistis.
4.  **Kecemasan Tes (Test Anxiety):** Kandidat CPNS, BUMN (TKD/TPA), atau pendaftar Mensa Indonesia sering gagal bukan karena tidak cerdas, tetapi karena tidak terbiasa dengan pola soal (spasial, deret angka, silogisme) dalam batas waktu yang sangat ketat.

---

## 3. Solusi & Rekomendasi Produk untuk BisaMENSA

BisaMENSA harus diposisikan di tengah: **Platform latihan kognitif yang menantang dan terstruktur, yang dirancang untuk MELATIH, bukan sekadar MENGUJI.**

### Nilai Jual Unik (Unique Selling Propositions - USP):
*   **Fokus pada Pembelajaran (The Treehouse/Duolingo Model):** Berbeda dengan tes IQ biasa yang merahasiakan jawaban, BisaMENSA memberikan **penjelasan langkah-demi-langkah (Step-by-step reasoning)** setiap kali pengguna salah menjawab.
*   **Transparansi & Etika Akademik:** Sampaikan bahwa BisaMENSA adalah alat *Cognitive Training & Mensa Simulation*, BUKAN diagnosis psikologis klinis. Kejujuran ini justru meningkatkan kredibilitas di mata profesional HR dan pencari kerja cerdas.
*   **Pelacakan Kelemahan (Analytics):** Dashboard analitik yang memecah skor berdasarkan dimensi (Verbal, Spasial, Numerik, Logika). Jika pengguna lemah di Spasial, mereka dapat membeli atau mengulang "Modul Penalaran Spasial".

---

## 4. Landasan Teori (Buku Teks & Alat Tes Valid)

Agar soal-soal di BisaMENSA memiliki kedekatan (face validity & construct validity) dengan tes akademik dan psikologis nyata, pembuatan database (dataset) AI harus diinstruksikan untuk memodelkan tipe soal dari alat tes berikut:

### A. CFIT (Culture Fair Intelligence Test)
*   **Penulis:** Raymond B. Cattell.
*   **Fokus:** Mengukur kecerdasan *Fluid* (bawaan, penalaran analitis) dan meminimalisir pengaruh budaya/bahasa.
*   **Bentuk Soal:** Sepenuhnya visual (Penalaran Spasial & Pola Abstrak). Mencari kelanjutan pola matriks, klasifikasi gambar, dan kondisi topologi.
*   **Aplikasi di BisaMENSA:** Gunakan logika CFIT untuk modul **"Penalaran Spasial / Abstract Reasoning"**. Wajib menggunakan gambar.

### B. RPM (Raven’s Progressive Matrices) / SPM / APM
*   **Penulis:** John C. Raven.
*   **Fokus:** Penalaran abstrak murni. Sering digunakan oleh Mensa Internasional sebagai tes masuk standar (biasanya Advanced Progressive Matrices / APM).
*   **Bentuk Soal:** Melengkapi matriks 3x3 di mana satu kotak kosong. Pengguna harus menemukan pola perubahan bentuk, rotasi, penambahan, atau pengurangan elemen dari kiri-ke-kanan dan atas-ke-bawah.
*   **Aplikasi di BisaMENSA:** Ini adalah "Gold Standard" untuk **"Mensa Simulation Mode"**. Soal harus memiliki tingkat kesulitan yang meningkat (progresif).

### C. IST (Intelligenz Struktur Test)
*   **Penulis:** Rudolf Amthauer.
*   **Fokus:** Kecerdasan sebagai struktur yang terdiri dari berbagai kemampuan (Verbal, Numerik, Spasial, Memori). Sering digunakan dalam rekrutmen BUMN dan perusahaan besar di Indonesia.
*   **Bentuk Soal:** Terbagi banyak sub-tes (Melengkapi Kalimat, Mencari Kata Berbeda, Analogi Verbal, Deret Hitung, Aritmatika, Membentuk Ruang).
*   **Aplikasi di BisaMENSA:** Sangat cocok diadopsi untuk modul **"Analogi Verbal"**, **"Pola Angka"**, dan **"Logika Deduktif"**.

### D. WAIS (Wechsler Adult Intelligence Scale)
*   **Penulis:** David Wechsler.
*   **Fokus:** Tes komprehensif klinis (VCI, PRI, WMI, PSI).
*   **Aplikasi di BisaMENSA:** Ambil inspirasi dari sub-tes *Digit Span* (Memori Kerja) atau *Arithmetic* untuk latihan mental.

### Kesimpulan untuk Prompting AI:
Saat membuat sistem generator soal AI (seperti di fitur `api/generate-question`), tambahkan dalam prompt:
> *"Generate a question inspired by the logic of [Raven's Progressive Matrices / IST / CFIT]. The question must test [fluid intelligence / verbal analogy / inductive reasoning] without relying heavily on prior factual knowledge. Ensure the distractor options (A,B,C,D) represent common logical errors."*