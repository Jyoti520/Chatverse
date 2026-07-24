import { useState } from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import { useAuth } from "../../hooks/useAuth";

function Login({ setPage }) {
  const { loginUser, loginErr, clearAuthErr } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateLogin = () => {
    const { email, password } = credentials;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const errors = {};
    if (!email.trim()) {
      errors.email = "Email is required!";
    } else if (!isValidEmail) {
      errors.email = "Invalid email address";
    }
    if (!password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (loginErr) clearAuthErr();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validateLogin();

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }
    setErrors({})
    setLoading(true);

    try {
      const success = await loginUser(credentials);
      if (success) navigate("/chats");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = (field) =>
    `px-4 py-3 rounded-lg bg-white/20 dark:bg-white/[0.03] border backdrop-blur-xl transition-all duration-200 ${
      errors[field]
        ? "border-red-400/70 dark:border-red-500/40 bg-red-50/50 dark:bg-red-500/[0.03] focus:ring-2 focus:ring-red-500/10"
        : "border-slate-300 dark:border-white/[0.09] hover:border-indigo-300/70 dark:hover:border-indigo-500/30 focus:border-indigo-500 dark:focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
    }`;

  return (
  
        <form
          className="flex flex-col justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <Input
              label="Email:"
              type="email"
              name="email"
              required
              value={credentials.email}
              placeholder="Enter your email"
              onChange={handleChange}
              className={inputStyles("email")}
            />
            <div className="min-h-[20px] mt-1 px-1">
              {errors.email && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <Input
              label="Password: "
              type="password"
              name="password"
              value={credentials.password}
              required={true}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputStyles("password")}
            />
            <div className="min-h-[20px] px-1 flex items-center">
              {errors.password && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
          {/* Server error */}
      {loginErr && (
        <div className="flex items-start gap-2 rounded-lg border border-red-400/30 dark:border-red-500/20 bg-red-50 dark:bg-red-500/[0.05] px-3.5 py-2.5">
          <span className="mt-0.5 text-red-500 text-sm leading-none">⚠</span>
          <p className="text-xs font-medium text-red-600 dark:text-red-400 leading-relaxed">
            {loginErr}
          </p>
        </div>
      )}

        <Button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        title="Sign in to your account"
        className={`mt-1 w-full py-2.5 rounded-xl text-sm sm:text-base font-medium text-white tracking-wide transition-all duration-200 ${
          isLoading
            ? "bg-slate-400 dark:bg-slate-600 cursor-not-allowed"
            : "bg-gradient-to-tr from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 active:scale-[0.98] cursor-pointer shadow-indigo-500/20"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Signing in…
          </span>
        ) : (
          "Sign in"
        )}
      </Button>

       

        {/* Switch to signup */}
      <p className="text-center  text-sm sm:text-base text-slate-600 dark:text-slate-400">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={setPage}
          className="ml-1 font-medium text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-500 transition-colors duration-200"
        >
          Create one
        </button>
      </p>

     </form>
  );
}

export default Login;
