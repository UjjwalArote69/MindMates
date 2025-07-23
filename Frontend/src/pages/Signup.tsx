// pages/Signup.tsx
import { useNavigate } from "react-router";
import { AuthForm } from "../components/AuthForm";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await axios.post(
        "http://localhost:3000/api/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthForm
      title="Create an account"
      buttonText="Signup"
      isLogin={false}
      onSubmit={handleSignup}
    />
  );
};

export default Signup;
