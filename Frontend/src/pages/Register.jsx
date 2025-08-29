import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API/api.jsx";
import { useAuth } from "../context/authContext.jsx";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const response = await API.post("/auth/signin", { email, password });
        if (response.data.token) {
          login(response.data.token);
          navigate("/dashboard");
        }
      } else {
        await API.post("/auth/signup", { name, email, password });
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1920&q=80')", // leafy climate bg
      }}
    >
      {/* Glassmorphism card */}
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-2">
          {isLogin ? "Welcome back" : "Create account"}
        </h2>
        <p className="text-sm mb-6 opacity-80">
          {isLogin
            ? "Please enter your details."
            : "Join us and start your journey."}
        </p>

        {error && <div className="mb-4 text-sm text-red-400">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          )}

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {isLogin && (
            <div className="flex items-center justify-between text-sm opacity-80">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-400" />
                Remember me
              </label>
              <button type="button" className="hover:underline">
                Forgot your password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 rounded-lg bg-green-500 hover:bg-green-600 transition font-semibold shadow-lg"
          >
            {loading
              ? "Processing..."
              : isLogin
              ? "Log in"
              : "Create Account"}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center text-sm">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-green-300 hover:underline"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-green-300 hover:underline"
              >
                Login here
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
