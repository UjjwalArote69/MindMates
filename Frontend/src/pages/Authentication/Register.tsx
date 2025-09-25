import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUserService } from "../../services/auth.service";
import MindMatesIcon from "../../assets/Icons/MindMates Auth Icon.svg";
import GoogleIcon from "../../assets/Icons/Google Icon.png";
import EmailIcon from "../../assets/Icons/Email Icon.svg";
import PasswordIcon from "../../assets/Icons/Security Lock Icon.svg";
import UserIcon from "../../assets/Icons/User Pfp Avatar.png";
import EyeOpenIcon from "../../assets/Icons/Eye Open Password.svg";
import EyeCloseIcon from "../../assets/Icons/Eye Closed Password.svg";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(regex.test(value) ? "" : "Invalid Email Address");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);
    try {
      await registerUserService(form);
      navigate("/onboarding");
    } catch (error: any) {
      setFormError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-[#F9F5F2] flex flex-col items-center justify-start relative">
      {/* Top Header */}
      <div className="w-full bg-[#A3B763] h-40 rounded-b-[80px] flex items-center justify-center">
        <img src={MindMatesIcon} alt="MindMates Logo" className="w-14 h-14" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs px-6 pt-6 space-y-6 mt-6"
      >
        <h2 className="text-center text-2xl font-bold text-[#4E342E]">
          Create an Account
        </h2>

        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#4E342E]">Full Name</label>
          <div className="flex items-center gap-2 rounded-full px-4 py-3 bg-white border border-gray-300">
            <img src={UserIcon} alt="User Icon" className="w-5 h-5" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="flex-1 text-sm bg-transparent focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#4E342E]">Email Address</label>
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-3 bg-white border ${
              emailError ? "border-[#F4A261]" : "border-gray-300"
            }`}
          >
            <img src={EmailIcon} alt="Email Icon" className="w-5 h-5" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="flex-1 text-sm bg-transparent focus:outline-none"
              required
            />
          </div>
          {emailError && (
            <div className="text-xs text-[#F4A261] px-4">{emailError}</div>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-[#4E342E]">Password</label>
          <div className="flex items-center gap-2 rounded-full px-4 py-3 bg-white border border-gray-300">
            <img src={PasswordIcon} alt="Password Icon" className="w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="flex-1 text-sm bg-transparent focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="focus:outline-none"
            >
              <img
                src={showPassword ? EyeOpenIcon : EyeCloseIcon}
                alt="Toggle Password"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {/* Form Error */}
        {formError && (
          <div className="text-sm text-center text-[#F44336]">{formError}</div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-[#4E342E] text-white font-semibold text-sm flex items-center justify-center gap-2"
        >
          {loading ? "Registering..." : "Register"} <span>→</span>
        </button>

        {/* Google Register */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-gray-300 bg-white text-sm font-medium text-[#4E342E] shadow-sm"
        >
          <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
          Register with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-[#4E342E]">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-[#E76F51] font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
