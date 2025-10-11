import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

interface OnboardingGuardProps {
  children: React.ReactNode;
}

const OnboardingGuard = ({ children }: OnboardingGuardProps) => {
  const user = useUserStore((state) => state.user);
  const initialized = useUserStore((state) => state.initialized);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔍 OnboardingGuard check:", { 
      initialized, 
      user: user?.name, 
      isOnboarded: user?.isOnboarded 
    });

    if (initialized && user) {
      // ✅ If user already completed onboarding, redirect to home
      if (user.isOnboarded === true) {
        console.log("⛔ User already onboarded, redirecting to /home");
        navigate("/home", { replace: true });
      }
    }
  }, [user, initialized, navigate]);

  // Show loading while checking
  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F7F3EF] to-[#f0e9e2]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#694a39] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#694a39] font-semibold">Checking status...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default OnboardingGuard;
