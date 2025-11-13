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
    <div className="flex items-center justify-center min-h-screen bg-amber-100">
      <div className="bg-amber-500 rounded-md py-10 px-15 shadow-md w-96">
        <h1 className="text-center font-bold text-white text-xl mb-4">
          LOG IN
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Email:</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="bg-amber-50 pl-2 rounded-md"
              type="email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Password:</label>
            <input
              {...register("password", {
                required: "Password is required",
              })}
              className="bg-amber-50 pl-2 rounded-md"
              type="password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {errorMessage && <span className="text-red-500">{errorMessage}</span>}

          <input
            className="bg-amber-600 rounded-md text-white font-bold py-2 hover:bg-amber-700 cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
