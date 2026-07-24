import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Signup({ setPage }) {
  const navigate = useNavigate();
  const { signupUser, loginUser, signupErr, clearAuthErr } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isValidate = (name, value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    const errors = {};
    switch (name) {
      case "username":
        if (!value.trim()) errors.username = "username is required";
        break;
      case "email":
        if (!value || !regex.test(value))
          errors.email = "Invalid email address";
        break;
      case "password":
        if (value?.length < 6)
          errors.password = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (!value || value !== formData.password)
          errors.confirmPassword = "Password do not match";
        break;
      default:
        return {};
    }
    return errors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldErrors = isValidate(name, value);

    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || null }));
    if (signupErr) clearAuthErr();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    // check errors before submitting
    Object.keys(formData).forEach((key) => {
      Object.assign(newErrors, isValidate(key, formData[key]));
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const { email, password } = formData;
      const result = await signupUser(formData);
      // auto-login the account
      if (result) {
        const success = await loginUser(email, password);
        if (success) navigate("/chats");
      }
      
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = (field) =>
    `px-4 py-3 rounded-lg bg-white/40 dark:bg-white/[0.03] border backdrop-blur-xl  ${
      errors[field]
        ? "border border-red-400/70 dark:border-red-500/40 bg-red-50/50 dark:bg-red-500/[0.03] focus:ring-2 focus:ring-red-500/10"
        : "border-slate-300 dark:border-white/[0.09] hover:border-blue-300/70 dark:hover:border-indigo-500/30 focus:border-indigo-500 dark:focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10"
    }`;

  return (
    <form
      className="flex flex-col justify-center gap-1"
      onSubmit={handleSubmit}
    >
      <Input
        label="Username:"
        value={formData.username}
        name="username"
        placeholder="Enter your username"
        onChange={handleChange}
        className={inputStyles("username")}
      />
      <div className="min-h-[20px] px-1">
        {errors.username && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.username}
          </p>
        )}
      </div>
      <Input
        label="Email:"
        name="email"
        type="email"
        value={formData.email}
        placeholder="Enter your email"
        onChange={handleChange}
        className={inputStyles("email")}
      />
      <div className="min-h-[20px] px-1">
        {errors.email && (
          <p className="text-xs font-medium dark:text-red-400 text-red-500">
            {errors.email}
          </p>
        )}
      </div>
      <Input
        label="Password: "
        name="password"
        type={"password"}
        value={formData.password}
        placeholder="••••••••"
        onChange={handleChange}
        className={inputStyles("password")}
      />
      <div className="min-h-[20px] px-1">
        {errors.password && (
          <p className="text-xs font-medium dark:text-red-400 text-red-500">
            {errors.password}
          </p>
        )}
      </div>
      <Input
        label="Confirm Password: "
        name="confirmPassword"
        type={"password"}
        value={formData.confirmPassword}
        placeholder="••••••••"
        onChange={handleChange}
        className={inputStyles("confirmPassword")}
      />
      <div className="min-h-[20px] px-1">
        {errors.confirmPassword && (
          <p className="text-xs font-medium dark:text-red-400 text-red-500">
            {errors.confirmPassword}
          </p>
        )}
      </div>
      {/* Server error */}
      {signupErr && (
        <div className="flex items-start gap-2 rounded-lg border border-red-400/30 dark:border-red-500/20 bg-red-50 dark:bg-red-500/\\\[0.05] px-3.5 py-2.5">
          <span className="mt-0.5 text-red-500 text-sm leading-none">⚠</span>
          <p className="text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 leading-relaxed">
            {signupErr}
          </p>
        </div>
      )}
      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading}
        title="Create your account"
        className={`w-full py-3 rounded-xl text-sm sm:text-base font-medium text-white transition-all duration-200 ${
          isLoading
            ? "bg-slate-400 dark:bg-slate-600 cursor-not-allowed"
            : "bg-gradient-to-tr from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-500 active:scale-[0.98] cursor-pointer"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Creating account…
          </span>
        ) : (
          "Create account"
        )}
      </Button>
      {/* Footer */}
      {/* Switch to login */}
      <p className="mt-3 text-center text-base text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={setPage}
          className="font-medium ml-1 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-500 transition-colors duration-200"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

export default Signup;
