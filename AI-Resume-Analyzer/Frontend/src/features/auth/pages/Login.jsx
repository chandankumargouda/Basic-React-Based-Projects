import { Link } from "react-router";
import {useAuth} from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {

  const {loading,handleLogin} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleSubmit =async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        try {
        await handleLogin({ email, password });

        navigate("/home");
    } catch (error) {
        console.error("Login failed:", error);
    }
    }
    if(loading){
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
  return (
    <>
     <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 py-8">

  <div className="w-full max-w-md">

    {/* Login Card */}
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Login to your account to continue
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-neutral-200"
          >
            Email address
          </label>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="block w-full rounded-xl border border-neutral-700 bg-neutral-800/70 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 hover:border-neutral-600"
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-200"
            >
              Password
            </label>

            <a
              href="#"
              className="text-sm text-blue-400 transition-colors duration-200 hover:text-blue-300 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="block w-full rounded-xl border border-neutral-700 bg-neutral-800/70 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 hover:border-neutral-600"
          />
        </div>


        {/* Login Button */}
        <button
          type="submit"
          className="group relative w-full overflow-hidden rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 active:translate-y-0"
        >
          <span className="relative z-10">
            Login
          </span>

          {/* Hover shine */}
          <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />
        </button>

      </form>

      {/* Register */}
      <div className="mt-7 border-t border-neutral-800 pt-6 text-center">
        <p className="text-sm text-neutral-400">
          Don't have an account?{" "}
          <Link 
            to="/register"
            className="font-semibold text-blue-400 transition-colors duration-200 hover:text-blue-300 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

    </div>

  </div>

</div>
    </>
  );
};

export default Login;
