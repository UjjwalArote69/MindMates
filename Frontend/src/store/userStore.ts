import { create } from "zustand";
import {
  getMe,
  logoutUser,
  onboardingData,
  updateUser,
  deleteUser,
  submitFeedback,
} from "../services/user.service";
import { loginUserService, registerUserService } from "../services/auth.service";

interface Mood {
  date: string;
  mood: string;
}

interface User {
  _id: string;
  googleId?: string;
  
  name: string;
  email: string;
  avatar?: string;
  gender?: "male" | "female";
  age?: number;
  sleepQuality?: number;
  currentMood?: string;
  stressQuality?: string;
  currentStress?: number;
  isPro?: boolean;
  mentalHealthScore?: number;
  moodTracker?: Mood[];
  subscriptionType?: string;
  weight?: number;
  height?: number;
  birthDate?: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;

  // Onboarding fields
  gender: "male" | "female" | null;
  age: number;
  currentMood: string | null;
  sleepQuality: number | null;
  stressQuality: string | null;

  // actions
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: {
    updatedName?: string;
    updatedPassword?: string;
    updatedWeight?: number;
    updatedHeight?: number;
    updatedGender?: string;
    updatedBirthDate?: Date;
  }) => Promise<void>;
  deleteUserAccount: () => Promise<void>;
  submitFeedback: (data: { selectedAreas: string[]; feedback: string }) => Promise<void>;

  // onboarding actions
  setGender: (g: "male" | "female") => void;
  setAge: (a: number) => void;
  setCurrentMood: (m: string) => void;
  setSleepQuality: (s: number) => void;
  setStressQuality: (s: string) => void;
  submitOnboarding: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  gender: null,
  age: 18,
  currentMood: null,
  sleepQuality: null,
  stressQuality: null,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    try {
      set({ loading: true, error: null });
      const data = await getMe();
      set({ user: data, loading: false });
    } catch (err: any) {
      if (err.response?.status === 401) {
        set({ user: null, loading: false });
      } else {
        set({ user: null, loading: false, error: err.message });
      }
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const data = await loginUserService({ email, password });
      set({ user: data.user, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  register: async (name, email, password) => {
    try {
      set({ loading: true, error: null });
      const data = await registerUserService({ name, email, password });
      set({ user: data.user, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  logout: async () => {
    try {
      await logoutUser();
      set({ user: null });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  updateUserProfile: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await updateUser(data);
      set({ user: res.user, loading: false });
    } catch (err: any) {
      console.error("updateUserProfile failed:", err);
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  deleteUserAccount: async () => {
    try {
      set({ loading: true, error: null });
      await deleteUser();
      set({ user: null, loading: false });
    } catch (err: any) {
      console.error("deleteUserAccount failed:", err);
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  submitFeedback: async (data) => {
    try {
      set({ loading: true, error: null });
      await submitFeedback(data);
      set({ loading: false });
    } catch (err: any) {
      console.error("submitFeedback failed:", err);
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  setGender: (g) => set({ gender: g }),
  setAge: (a) => set({ age: a }),
  setCurrentMood: (m) => set({ currentMood: m }),
  setSleepQuality: (s) => set({ sleepQuality: s }),
  setStressQuality: (s) => set({ stressQuality: s }),

  submitOnboarding: async () => {
    const { gender, age, currentMood, sleepQuality, stressQuality, fetchUser } = get();
    try {
      await onboardingData({
        gender: gender!,
        age,
        currentMood: currentMood!,
        sleepQuality: sleepQuality!,
        currentStress: Number(stressQuality),
      });
      await fetchUser();
    } catch (err: any) {
      console.error("❌ Error in onboarding submit:", err);
      throw err;
    }
  },
}));
