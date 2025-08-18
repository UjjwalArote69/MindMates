import AnimatedBlurTestimonials from ".";
import type { TestimonialInterface } from ".";

const DATA: TestimonialInterface[] = [
  {
    avatar: { src: "https://randomuser.me/api/portraits/women/45.jpg" },
    message:
      "I used to bottle up my feelings. Now with MindMates, I actually feel heard. My anxiety has dropped, my friends notice the difference, and even my dog chills when I do. Thanks, MindMates!",
  },
  {
    avatar: { src: "https://randomuser.me/api/portraits/men/36.jpg" },
    message:
      "I thought MindMates was just another wellness app. Nope—it’s like therapy, journaling, and a hype squad in one. More calm, better sleep, and random moments of joy. Magic? Science? MindMates.",
  },
  {
    avatar: { src: "https://randomuser.me/api/portraits/women/32.jpg" },
    message:
      "MindMates didn’t just help me manage stress—it gave me tools to turn tough days into growth days. My coworkers think I’m Zen master 3000. Joke’s on them, I just open the app. Thanks, MindMates!",
  },
  {
    avatar: { src: "https://randomuser.me/api/portraits/men/22.jpg" },
    message:
      "Before MindMates, I was all over the place. Now? I track my moods, celebrate progress, and even enjoy Monday mornings (seriously). People ask, ‘What changed?’ I just smile and say… MindMates.",
  },
  {
    avatar: { src: "https://randomuser.me/api/portraits/women/12.jpg" },
    message:
      "At first, I rolled my eyes—‘another mental health app?’ But MindMates feels different. More real, more human. My stress is lighter, my focus sharper, and somehow… life just feels kinder.",
  },
];


function AnimatedBlurTestimonialsDemo() {
  return (
    <div className="box relative flex min-h-[400px] items-center justify-center px-3 py-8">
      <div className="max-w-[450px]">
        <AnimatedBlurTestimonials data={DATA} />
      </div>
    </div>
  );
}
export default AnimatedBlurTestimonialsDemo;
