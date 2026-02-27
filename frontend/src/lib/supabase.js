// This file is kept for backward compatibility but is no longer used.
// The app now uses local hardcoded data in quizzesData.js

export const supabase = null;

export const auth = {
  signUp: async () => { throw new Error('Auth not available in offline mode'); },
  signIn: async () => { throw new Error('Auth not available in offline mode'); },
  signOut: async () => { throw new Error('Auth not available in offline mode'); },
  getSession: async () => null,
  getUser: async () => null,
};

export const quiz = {
  getQuestions: async () => { throw new Error('Use getQuizQuestions from quizzesData.js instead'); },
  submitScore: async () => { throw new Error('No persistence in offline mode'); },
  getLeaderboard: async () => { throw new Error('No persistence in offline mode'); },
};
