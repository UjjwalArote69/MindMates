import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(regex.test(value) ? "" : "Invalid Email Address!!!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);

    try {
      const res = await login(form);
      console.log("✅ LOGIN SUCCESS:", res);
      // localStorage.setItem("token", ); // Store JWT
      navigate("/home");
    } catch (error: any) {
      console.error("❌ LOGIN ERROR:", error);
      setFormError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-[#F9F5F2] flex flex-col items-center justify-start relative">
      {/* Top Arc with Freud Logo */}
      <div className="w-full bg-[#A3B763] h-40 rounded-b-[80px] flex items-center justify-center relative">
        <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs px-4 pt-6 space-y-6"
      >
        <h2 className="text-center text-2xl font-bold text-[#4E342E]">
          Welcome back
        </h2>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#4E342E]">Email Address</label>
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-3 bg-white border ${
              emailError ? "border-[#F4A261]" : "border-gray-300"
            }`}
          >
            <span>📧</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className="flex-1 text-sm bg-transparent focus:outline-none"
              required
            />
          </div>
          {emailError && (
            <div className="text-xs text-[#F4A261] px-4">⚠️ {emailError}</div>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#4E342E]">Password</label>
          <div className="flex items-center gap-2 rounded-full px-4 py-3 bg-white border border-gray-300">
            <span>🔒</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password..."
              className="flex-1 text-sm bg-transparent focus:outline-none"
              required
            />
            <span>👁️</span>
          </div>
        </div>

        {/* Form Error */}
        {formError && (
          <div className="text-sm text-center text-[#F44336]">{formError}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-[#4E342E] text-white font-semibold text-sm flex items-center justify-center gap-2"
        >
          {loading ? "Logging in..." : "Login"} <span>→</span>
        </button>

        {/* Login with Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-gray-300 bg-white text-sm font-medium text-[#4E342E] shadow-sm"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Login with Google
        </button>

        {/* Footer Link */}
        <p className="text-center text-sm text-[#4E342E]">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#E76F51] font-semibold">
            Register.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
