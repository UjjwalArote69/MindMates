import { Link } from "react-router-dom";
// import AnimatedBlurTestimonials from "@/components/ui/animated-blur-testimonials/demo";
import AnimatedBlurTestimonialsDemo from "../components/ui/animated-blur-testimonials/demo";

const Home = () => {
  return (
    <div className="bg-[#F9F5F2] text-[#4E342E]">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#A3B763] rounded-b-full pb-16">
        <img src="/logo.svg" alt="MindMates Logo" className="w-12 h-12 mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Mental Health Companion</h1>
        <p className="text-lg max-w-xl mb-6">
          Talk, vent, heal. MindMates connects you with trained listeners and helpful resources in a safe, anonymous space.
        </p>
        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-[#4E342E] text-white px-6 py-3 rounded-full font-medium"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-[#4E342E] text-[#4E342E] px-6 py-3 rounded-full font-medium bg-white"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Why MindMates?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">🧠 Emotional Support</h3>
            <p>Connect with compassionate listeners anytime you need to talk.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">🔐 Privacy First</h3>
            <p>Anonymous conversations. No tracking. Full control over your data.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">📱 Always Accessible</h3>
            <p>Reach out anytime, from anywhere – we're always here for you.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#FFF] py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-left">
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-2">1. Sign Up</h4>
            <p>Create your free account using email or Google login.</p>
          </div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-2">2. Find a Listener</h4>
            <p>Choose from a list of trained listeners available to talk.</p>
          </div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-2">3. Start Chatting</h4>
            <p>Begin a safe, private conversation and get the support you need.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 text-center bg-[#F5F5F5]">
        <h2 className="text-3xl font-bold mb-10">What People Are Saying</h2>
        <AnimatedBlurTestimonialsDemo/>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 text-center bg-[#FFF]">
        <h2 className="text-3xl font-bold mb-10">Flexible Pricing</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="border p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-2">🌱 Free</h3>
            <p className="text-2xl font-semibold mb-4">₹0/month</p>
            <ul className="text-sm space-y-2 mb-4">
              <li>✓ Limited Chats</li>
              <li>✓ Anonymous Profile</li>
              <li>✓ Access to Resources</li>
            </ul>
            <button className="bg-[#4E342E] text-white px-6 py-2 rounded-full text-sm">
              Continue Free
            </button>
          </div>
          <div className="border p-6 rounded-2xl bg-[#A3B763] text-white shadow-lg">
            <h3 className="text-xl font-bold mb-2">🌿 Plus</h3>
            <p className="text-2xl font-semibold mb-4">₹199/month</p>
            <ul className="text-sm space-y-2 mb-4">
              <li>✓ Unlimited Chats</li>
              <li>✓ Priority Access to Listeners</li>
              <li>✓ Early Access to Features</li>
            </ul>
            <button className="bg-white text-[#4E342E] px-6 py-2 rounded-full text-sm">
              Upgrade
            </button>
          </div>
          <div className="border p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-2">🌳 Pro</h3>
            <p className="text-2xl font-semibold mb-4">₹499/month</p>
            <ul className="text-sm space-y-2 mb-4">
              <li>✓ Personal Mentor</li>
              <li>✓ Scheduled Weekly Sessions</li>
              <li>✓ All Plus Benefits</li>
            </ul>
            <button className="bg-[#4E342E] text-white px-6 py-2 rounded-full text-sm">
              Go Pro
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 text-center bg-[#F4A261] text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to start your healing journey?</h2>
        <p className="mb-6">Join MindMates today. It’s free, safe, and private.</p>
        <Link to="/register" className="bg-white text-[#4E342E] px-6 py-3 rounded-full font-medium">
          Create Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#4E342E] text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} MindMates. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
