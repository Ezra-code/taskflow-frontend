import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, CheckSquare } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useAuth();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginUser(data);
      toast.success("Welcome back!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Unable to sign in");
    },
  });

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Branding panel */}
      <section className="hidden lg:flex flex-col justify-between bg-slate-950 p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 p-2">
            <CheckSquare size={24} />
          </div>
          <span className="text-2xl font-bold">TaskFlow</span>
        </div>

        <div className="max-w-lg">
          <h1 className="text-5xl font-bold leading-tight">
            Organize your work.
            <span className="text-indigo-400"> Own your day.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400">
            Bring your tasks, schedules and productivity into one focused
            workspace.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          © 2026 TaskFlow. All rights reserved.
        </p>
      </section>

      {/* Login form */}
      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden flex items-center gap-3">
            <CheckSquare className="text-indigo-600" size={28} />
            <span className="text-2xl font-bold text-slate-900">TaskFlow</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
          <p className="mt-2 text-slate-500">
            Sign in to continue to your workspace.
          </p>

          <button
            type="button"
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt=""
              className="h-5 w-5"
            />
            Continue with Google
          </button>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-sm text-slate-400">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              loginMutation.mutate(credentials);
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
              disabled={loginMutation.isPending}
            >
               {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Create account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
