import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin1@digitalflake.com");
  const [password, setPassword] = useState("Hero123");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosClient.post("/auth/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("df_token", token);
      localStorage.setItem("df_user", JSON.stringify(user));

      
      navigate("/category");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f3f8]">
      <div className="relative w-full max-w-4xl flex bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="w-full md:w-[430px] p-10 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-10 w-10 rounded-md bg-[#62257e] flex items-center justify-center text-white text-2xl font-semibold">
                D
              </div>
              <span className="text-2xl font-semibold text-[#242424]">
                digitalflake
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Welcome to Digitalflake admin
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-1 text-gray-700">
                Email-id
              </label>
              <input
                type="email"
                className="w-full h-11 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#62257e]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full h-11 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:border-[#62257e]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 mt-1">{error}</p>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-[#62257e] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="mt-1 w-full h-11 rounded-md bg-[#62257e] text-white text-sm font-medium hover:bg-[#4e1d65]"
            >
              Log In
            </button>
          </form>
        </div>

        <div className="hidden md:block flex-1 bg-[#e5e7ff]" />
      </div>
    </div>
  );
}

export default Login;
