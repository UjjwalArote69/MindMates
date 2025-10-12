import { create } from "zustand";
import {
  getMe,
  logoutUser,
  onboardingData,
  updateUser,
  deleteUser,
  submitFeedback,
  updateTodayMood,
  updateTodayStress,
} from "../services/user.service";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service";

interface Mood {
  date: string;
  mood: string;
}

interface UserRegisterResponse {
  user: User;
  token: string;
  isNewUser: boolean;
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
  createdAt?: string;
  isOnboarded?: boolean;

  // ✅ ADD THESE MISSING FIELDS
  todayLogged?: boolean;
  lastLoggedDate?: Date | string;

  // Log arrays
  stressLogs?: { date: Date; level: number }[];
  sleepLogs?: { date: Date; quality: number; hours: number }[];
  hydrationLogs?: { date: Date; liters: number }[];
  activityLogs?: { date: Date; steps: number; minutes: number }[];
  meditationLogs?: { date: Date; minutes: number }[];
  mentalHealthScoreLogs?: { date: Date; score: number }[];
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  // Onboarding fields
  gender: "male" | "female" | null;
  age: number;
  currentMood: string | null;
  sleepQuality: number | null;
  stressQuality: string | null;
  height: number | null;
  weight: number | null;

  // actions
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<User>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<UserRegisterResponse>;
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
  submitFeedback: (data: {
    selectedAreas: string[];
    feedback: string;
  }) => Promise<void>;
  submitOnboarding: () => Promise<void>;
  updateTodayMood: (mood: string) => Promise<void>;
  updateTodayStress: (stressLevel: number) => Promise<void>;

  // onboarding setters
  setGender: (g: "male" | "female") => void;
  setAge: (a: number) => void;
  setCurrentMood: (m: string) => void;
  setSleepQuality: (s: number) => void;
  setStressQuality: (s: string) => void;
  setHeight: (h: number) => void;
  setWeight: (w: number) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  initialized: false,

  gender: null,
  age: 18,
  currentMood: null,
  sleepQuality: null,
  stressQuality: null,
  height: null,
  weight: null,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    try {
      set({ loading: true });
      const res = await getMe();

      if (!res?.data) {
        set({ user: null, loading: false, initialized: true });
      } else {
        set({ user: res.data, loading: false, initialized: true });
      }
    } catch (error) {
      set({ user: null, loading: false, initialized: true });
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const data = await loginUserService({ email, password });

      // ✅ Save token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("💾 Token saved to localStorage");
      }

      set({ user: data.user, loading: false });
      return data.user;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  register: async (name, email, password) => {
    try {
      set({ loading: true, error: null });
      const data = await registerUserService({ name, email, password });

      // ✅ Save token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("💾 Token saved to localStorage");
      }

      set({ user: data.user, loading: false });
      return data;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await logoutUser();

      // ✅ Clear token from localStorage
      localStorage.removeItem("token");
      console.log("🗑️ Token removed from localStorage");

      set({ user: null });
    } catch (err: any) {
      // Still clear local data even if server logout fails
      localStorage.removeItem("token");
      set({ error: err.message, user: null });
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
      localStorage.removeItem("token");
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
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

  submitOnboarding: async () => {
    const {
      gender,
      age,
      currentMood,
      sleepQuality,
      stressQuality,
      height,
      weight,
    } = get();

    try {
      console.log("📤 Sending onboarding data:", {
        gender,
        age,
        currentMood,
        sleepQuality,
        stressQuality,
        height,
        weight,
      });

      await onboardingData({
        gender: gender!,
        age,
        height: height!,
        weight: weight!,
        currentMood: currentMood!,
        sleepQuality: sleepQuality!,
        currentStress: Number(stressQuality),
      });

      console.log("✅ Onboarding data saved");

      // ✅ Refresh user data to get updated isOnboarded status
      await get().fetchUser();

      console.log(
        "✅ User data refreshed, isOnboarded:",
        get().user?.isOnboarded
      );
    } catch (err: any) {
      console.error("❌ Error in onboarding submit:", err);
      throw err;
    }
  },

  updateTodayMood: async (mood: string) => {
    try {
      set({ loading: true, error: null });
      await updateTodayMood(mood);

      // Refresh user data
      await get().fetchUser();

      set({ loading: false });
    } catch (err: any) {
      console.error("updateTodayMood failed:", err);
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  updateTodayStress: async (stressLevel: number) => {
    try {
      set({ loading: true, error: null });
      await updateTodayStress(stressLevel);

      // Refresh user data
      await get().fetchUser();

      set({ loading: false });
    } catch (err: any) {
      console.error("updateTodayStress failed:", err);
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  setGender: (g) => set({ gender: g }),
  setAge: (a) => set({ age: a }),
  setCurrentMood: (m) => set({ currentMood: m }),
  setSleepQuality: (s) => set({ sleepQuality: s }),
  setStressQuality: (s) => set({ stressQuality: s }),
  setHeight: (h) => set({ height: h }),
  setWeight: (w) => set({ weight: w }),
}));
