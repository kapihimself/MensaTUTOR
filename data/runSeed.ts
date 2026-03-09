import { supabase } from '@/lib/supabaseClient';
import { seedQuestions } from './seedQuestions';

export const runSeed = async () => {
  console.log('Starting database seeding...');

  try {
    // 1. Create Roadmap
    const { data: roadmap, error: roadmapError } = await supabase
      .from('roadmaps')
      .insert([
        { title: 'Latihan IQ Fundamental', description: 'Pelajari dasar-dasar penalaran logika dan pola angka.', order_index: 1 }
      ])
      .select()
      .single();

    if (roadmapError) throw roadmapError;
    console.log('Roadmap created:', roadmap.id);

    // 2. Create Modules
    const modulesToCreate = [
      { roadmap_id: roadmap.id, title: 'Pola Angka', description: 'Mengenali pola dan deret angka.', order_index: 1 },
      { roadmap_id: roadmap.id, title: 'Logika', description: 'Silogisme dan penalaran deduktif.', order_index: 2 },
      { roadmap_id: roadmap.id, title: 'Analogi Verbal', description: 'Hubungan kata dan makna.', order_index: 3 }
    ];

    const { data: modules, error: modulesError } = await supabase
      .from('modules')
      .insert(modulesToCreate)
      .select();

    if (modulesError) throw modulesError;
    console.log(`Modules created: ${modules.length}`);

    // Map categories to modules
    const categoryToModuleMap: Record<string, string> = {};
    modules.forEach(m => {
      categoryToModuleMap[m.title] = m.id;
    });

    // 3. Create Lessons and Questions
    let lessonIndex = 1;

    for (const q of seedQuestions) {
      const moduleId = categoryToModuleMap[q.kategori];
      if (!moduleId) {
        console.warn(`Module not found for category: ${q.kategori}`);
        continue;
      }

      // Create a lesson for each question (simplified for 1:1 relation as per MVP requirement)
      const { data: lesson, error: lessonError } = await supabase
        .from('lessons')
        .insert([
          {
            module_id: moduleId,
            title: `Latihan ${lessonIndex} (${q.kategori})`,
            explanation: `Pahami konsep ${q.kategori} sebelum mengerjakan soal berikut.`,
            order_index: lessonIndex
          }
        ])
        .select()
        .single();

      if (lessonError) throw lessonError;

      // Create the question
      const { error: questionError } = await supabase
        .from('questions')
        .insert([
          {
            lesson_id: lesson.id,
            category: q.kategori,
            difficulty: q.difficulty,
            question_text: q.pertanyaan,
            option_a: q.opsi.A,
            option_b: q.opsi.B,
            option_c: q.opsi.C,
            option_d: q.opsi.D,
            correct_answer: q.jawaban_benar,
            explanation: q.penjelasan
          }
        ]);

      if (questionError) throw questionError;

      lessonIndex++;
    }

    console.log('Seed completed successfully!');

  } catch (error) {
    console.error('Error during seeding:', error);
  }
};
