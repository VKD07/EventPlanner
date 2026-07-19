import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignIn } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const navigator = useNavigate();

  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      const session = await useSignIn(data.email, data.password);

      if (session?.data?.user) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        reset();
        navigator("/dashboard");
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch {
      setErrorMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-ink px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,#e0bf52_1px,transparent_0)] bg-[length:28px_28px]" />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 rounded-full border-2 border-brass flex items-center justify-center mb-3">
            <span className="font-display text-brass text-lg">§</span>
          </div>
          <h1 className="font-display text-2xl text-parchment tracking-tight">
            Order of Service
          </h1>
          <p className="text-sm text-parchment/50 mt-1">Sign in to plan this week's program</p>
        </div>

        <div className="bg-paper rounded-lg shadow-2xl border-t-4 border-brass py-8 px-6 md:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-inkwell/70">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="bg-white border border-inkwell/15 pl-3 py-2 rounded-md text-inkwell focus:outline-none focus:ring-2 focus:ring-brass/50 focus:border-brass"
                type="email"
              />
              {errors.email && (
                <span className="text-ember text-sm">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-inkwell/70">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                className="bg-white border border-inkwell/15 pl-3 py-2 rounded-md text-inkwell focus:outline-none focus:ring-2 focus:ring-brass/50 focus:border-brass"
                type="password"
              />
              {errors.password && (
                <span className="text-ember text-sm">{errors.password.message}</span>
              )}
            </div>

            {errorMessage && (
              <span className="text-ember text-sm text-center">{errorMessage}</span>
            )}

            <input
              className="bg-brass hover:bg-brass-light rounded-md text-inkwell font-semibold py-2.5 cursor-pointer transition-colors"
              type="submit"
              value="Log In"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
