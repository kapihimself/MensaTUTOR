import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { category, difficulty } = await req.json();

    if (!category || !difficulty) {
      return NextResponse.json({ error: 'Missing category or difficulty' }, { status: 400 });
    }

    // In a real application, you would connect to OpenAI, Anthropic, or Gemini here.
    // E.g., const completion = await openai.chat.completions.create({...})
    // For this implementation, we return a mock generated response that follows the schema.

    const mockPrompt = `Generate an IQ reasoning question.
    Category: ${category}
    Difficulty: ${difficulty}

    Output format JSON:
    question:
    options: { A, B, C, D }
    correct_answer:
    explanation:
    `;

    console.log("Simulating AI generation with prompt:\n", mockPrompt);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse = {
      kategori: category,
      difficulty: difficulty,
      pertanyaan: `[AI Generated] Lanjutkan deret ini: 11, 22, 33, 44, ?`,
      opsi: {
        A: "55",
        B: "66",
        C: "77",
        D: "88"
      },
      jawaban_benar: "A",
      penjelasan: "Pola angka bertambah +11 pada setiap langkahnya."
    };

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error('Error generating question:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}