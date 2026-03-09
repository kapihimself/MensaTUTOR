import { supabase } from './supabaseClient';

// Helper to calculate level based on XP
export interface AnalyticsData {
  category: string;
  totalAnswered: number;
  correctAnswers: number;
  accuracy: number;
}

export const fetchUserAnalytics = async (userId: string): Promise<AnalyticsData[]> => {
  // Join user_answers with questions to group by category
  const { data, error } = await supabase
    .from('user_answers')
    .select(`
      is_correct,
      questions ( category )
    `)
    .eq('user_id', userId);

  if (error || !data) {
    console.error('Error fetching analytics:', error);
    return [];
  }

  // Aggregate stats in JS
  const stats: Record<string, { total: number; correct: number }> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data.forEach((answer: any) => {
    // Note: Due to Supabase join, questions might be an array or object depending on relation
    const category = Array.isArray(answer.questions) ? answer.questions[0]?.category : answer.questions?.category;
    if (!category) return;

    if (!stats[category]) {
      stats[category] = { total: 0, correct: 0 };
    }
    stats[category].total += 1;
    if (answer.is_correct) {
      stats[category].correct += 1;
    }
  });

  // Calculate percentages
  const analyticsData: AnalyticsData[] = Object.keys(stats).map(category => ({
    category,
    totalAnswered: stats[category].total,
    correctAnswers: stats[category].correct,
    accuracy: Math.round((stats[category].correct / stats[category].total) * 100)
  }));

  // Sort by highest accuracy
  return analyticsData.sort((a, b) => b.accuracy - a.accuracy);
};

// Helper to calculate level based on XP
export const calculateLevel = (xp: number): number => {
  if (xp >= 700) return 4;
  if (xp >= 300) return 3;
  if (xp >= 100) return 2;
  return 1;
};

// Main function to record progress and update gamification stats
export const recordLessonCompletionAndGamification = async (userId: string, lessonId: string) => {
  try {
    // 0. Check if already completed to prevent infinite XP farming
    const { data: existingProgress } = await supabase
      .from('user_progress')
      .select('completed')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single();

    if (existingProgress?.completed) {
      return; // Already completed, no more XP
    }

    // 1. Mark lesson as completed
    const { error: progressError } = await supabase
      .from('user_progress')
      .upsert(
        { user_id: userId, lesson_id: lessonId, completed: true, completed_at: new Date().toISOString() },
        { onConflict: 'user_id,lesson_id' }
      );

    if (progressError) {
      console.error('Error recording progress:', progressError);
      return;
    }

    // 2. Fetch current user gamification stats
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('xp, level, streak, last_active_date')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      console.error('Error fetching user for gamification:', userError);
      return;
    }

    // 3. Calculate new XP and Level
    const newXp = (user.xp || 0) + 10;
    const newLevel = calculateLevel(newXp);

    // 4. Calculate new streak
    let newStreak = user.streak || 0;
    const todayStr = new Date().toISOString().split('T')[0];

    if (user.last_active_date) {
      const lastActiveDate = new Date(user.last_active_date);
      const today = new Date(todayStr);

      const diffTime = Math.abs(today.getTime() - lastActiveDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Consecutive day
        newStreak += 1;
      } else if (diffDays > 1) {
        // Streak broken
        newStreak = 1;
      }
      // If diffDays === 0, same day, streak doesn't change
    } else {
      // First time active
      newStreak = 1;
    }

    // 5. Update user stats
    const { error: updateError } = await supabase
      .from('users')
      .update({
        xp: newXp,
        level: newLevel,
        streak: newStreak,
        last_active_date: todayStr,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating gamification stats:', updateError);
    }

  } catch (error) {
    console.error('Unexpected error in gamification:', error);
  }
};