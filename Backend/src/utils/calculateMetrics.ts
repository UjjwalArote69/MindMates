export interface MetricsInput {
  sleepQuality?: number;   // 1–10
  currentStress?: number;  // 1–10
  currentMood?: string;    // e.g., "happy", "sad", "neutral"
  age?: number;
  weight?: number;
}

export interface MetricsOutput {
  mentalHealthScore: number; // 0–100
}

export const calculateMetrics = (data: MetricsInput): MetricsOutput => {
  let score = 50; // base

  // Sleep quality (better sleep → higher score)
  if (data.sleepQuality !== undefined) {
    score += (data.sleepQuality - 5) * 5;
  }

  // Stress (higher stress → lower score)
  if (data.currentStress !== undefined) {
    score -= (data.currentStress - 5) * 5;
  }

  // Mood adjustment
  if (data.currentMood) {
    if (data.currentMood.toLowerCase().includes("happy")) score += 10;
    if (data.currentMood.toLowerCase().includes("sad")) score -= 10;
  }

  // Clamp to 0–100
  score = Math.max(0, Math.min(100, score));

  return { mentalHealthScore: score };
};
