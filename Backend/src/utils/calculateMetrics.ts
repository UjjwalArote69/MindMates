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
  let score = 50; // base score

  // Normalize sleepQuality (1-10), weight it heavily
  if (data.sleepQuality !== undefined) {
    const sleepFactor = (data.sleepQuality - 5) / 5; // -1 to +1
    score += sleepFactor * 20; // weighted more, max +/- 20 points 
  }

  // Normalize stress (assumed 1-10); higher stress reduces score
  if (data.currentStress !== undefined) {
    const stressFactor = (5 - data.currentStress) / 5; // +1 if stress=0, -1 if stress=10
    score += stressFactor * 25; // stronger negative influence up to +/- 25 points
  }

  // Mood impact - more granular mood mapping with variable weights
  if (data.currentMood) {
    const mood = data.currentMood.toLowerCase();
    if (mood.includes("very happy")) score += 15;
    else if (mood.includes("happy")) score += 10;
    else if (mood.includes("neutral")) score += 0;
    else if (mood.includes("sad")) score -= 10;
    else if (mood.includes("very sad")) score -= 15;
    else score += 0; // unknown mood no change
  }

  // Age-based adjustment example (e.g., slightly lower baseline for older age)
  if (data.age !== undefined) {
    if (data.age > 60) {
      score -= 5; // older users might face more challenges
    } else if (data.age < 18) {
      score -= 3; // younger users might have more variability
    }
  }

  // Weight and height can be considered later with BMI for healthiness factor

  // Clamp the score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  return { mentalHealthScore: score };
};
