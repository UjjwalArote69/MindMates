import AnimatedBlurTestimonials from ".";
import type { TestimonialInterface } from ".";

const DATA: TestimonialInterface[] = [
  {
    avatar: { src: "https://randomuser.me/api/portraits/women/44.jpg" },
    message:
      "Mindmates has truly been a life-changing experience for me. I used to feel overwhelmed by my own thoughts and emotions, but having a safe, non-judgmental space to express myself has made all the difference. The guided reflections and supportive tone make me feel understood and valued. I’ve learned more about my mental patterns in the last two months than I have in years of trying to figure it out alone.",
  },
  {
    avatar: { src: "https://randomuser.me/api/portraits/men/23.jpg" },
    message:
      "I never realized how impactful daily check-ins could be until I started using Mindmates. Each prompt feels thoughtfully crafted, and the act of slowing down for even a few minutes a day has helped me stay grounded and focused. It’s not just about tracking feelings — it’s about truly understanding them. The consistency has improved my self-awareness and reduced my stress levels in a way I didn’t think was possible.",
  },
  {
    avatar: { src: "https://randomuser.me/api/portraits/women/65.jpg" },
    message:
      "On my toughest days, Mindmates feels like talking to a close friend who listens without judgment or interruptions. It’s comforting to know I can pour out my thoughts and receive prompts that help me see things from a healthier perspective. I’ve struggled with anxiety for years, and this platform has given me practical tools to manage it — from mood logs to actionable coping strategies that fit into my everyday life.",
  },
  {
    avatar: { src: "https://randomuser.me/api/portraits/men/10.jpg" },
    message:
      "The mood tracking feature alone is worth it. For years, I didn’t understand why my energy levels fluctuated so much, but after a few weeks with Mindmates, clear patterns started to emerge. I’ve been able to link certain moods to specific triggers and even adjust my habits to avoid unnecessary stress. It’s empowering to feel like I finally have control over my emotional well-being instead of just reacting to it.",
  },
  {
    avatar: { src: "https://randomuser.me/api/portraits/women/9.jpg" },
    message:
      "Mindmates has seamlessly become part of my daily routine. I check in every morning and evening, and it’s become a form of mindfulness that I didn’t realize I needed. The privacy is unmatched — I feel completely safe knowing my reflections are secure. Over time, I’ve noticed I’m more in tune with my emotions and far kinder to myself. It’s not just an app, it’s a gentle companion for self-reflection.",
  },
  {
    avatar: { src: "https://randomuser.me/api/portraits/men/41.jpg" },
    message:
      "I was skeptical about mental wellness apps, but Mindmates exceeded my expectations. The platform doesn’t feel generic — it feels personal. The prompts are relevant, the interface is calming, and the ability to look back at past entries has given me perspective I never had before. I recommend it to anyone who wants to better understand their thoughts and live with more emotional clarity.",
  },
  {
    avatar: { src: "https://randomuser.me/api/portraits/women/50.jpg" },
    message:
      "Before Mindmates, I didn’t realize how much I bottled things up. Now, I have an outlet to express what I’m going through, and the relief is immediate. It’s like having a journal, a life coach, and a supportive friend all in one. The app has helped me navigate breakups, work stress, and personal challenges with more resilience and self-compassion than ever before.",
  },
];

function AnimatedBlurTestimonialsDemo() {
  return (
    <div className="box relative flex min-h-[400px] items-center justify-center px-3 py-8">
      <div className="max-w-[650px] ">
        <AnimatedBlurTestimonials data={DATA} />
      </div>
    </div>
  );
}
export default AnimatedBlurTestimonialsDemo;
