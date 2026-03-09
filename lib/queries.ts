import { supabase } from './supabaseClient';

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