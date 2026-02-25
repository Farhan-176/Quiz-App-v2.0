import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations
export const auth = {
  // Sign up new user
  async signUp(email, password, username) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Create profile entry
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            username,
            email,
          },
        ]);

      if (profileError) throw profileError;
    }

    return authData;
  },

  // Sign in existing user
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Fetch profile data
    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', data.user.id)
      .single();

    return { ...data, profile };
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current session
  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  // Get current user
  async getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  },
};

export const quiz = {
  // Fetch all quiz questions
  async getQuestions() {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Submit score to leaderboard
  async submitScore(username, score, total, percentage) {
    const user = await auth.getUser();
    
    const { data, error } = await supabase
      .from('leaderboard')
      .insert([
        {
          user_id: user?.id || null,
          username,
          score,
          total,
          percentage,
        },
      ])
      .select();

    if (error) throw error;
    return data;
  },

  // Get leaderboard (top performers)
  async getLeaderboard(limit = 50) {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('percentage', { ascending: false })
      .order('score', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data;
  },
};
