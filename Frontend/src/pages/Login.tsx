// pages/Login.tsx
import { useNavigate } from "react-router";
import { AuthForm } from "../components/AuthForm";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthForm
      title="Login to MindMates"
      buttonText="Login"
      onSubmit={handleLogin}
    />
  );
};

export default Login;
