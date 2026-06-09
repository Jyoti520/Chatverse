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
    `px-4 py-3 rounded-xl bg-white/40 dark:bg-white/[0.03] border backdrop-blur-xl  ${
      errors[field]
        ? "border border-red-400/70 dark:border-red-500/40 bg-red-50/50 dark:bg-red-500/[0.03] focus:ring-4 focus:ring-red-500/10"
        : "border-white/30 dark:border-white/10 hover:border-blue-300/70 dark:hover:border-blue-400/20  focus:border-blue-400 dark:focus:border-blue-500/30 focus:ring-2 focus:ring-blue-500/40"
    }`;

  return (
    <>
      <div className="px-4 pt-2 py-4 sm:px-2">
        <form
          className="flex flex-col justify-center gap-3"
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
            <div className="min-h-[20px] px-1 flex items-center">
              {errors.email && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
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
              placeholder="Enter your password"
              className={inputStyles("password")}
            />
            <div className="min-h-[20px] px-1 flex items-center">
              {errors.password && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className={`w-full px-3 py-2.5 uppercase rounded-2xl font-medium text-sm sm:text-base text-white ${
              isLoading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 hover:scale-[1.01] active:scale-95 cursor-pointer shadow-lg shadow-indigo-500/20"
            } `}
            disabled={isLoading}
            title="Login to your account"
            aria-busy={isLoading}
          >
            {isLoading ? "logging in..." : "login"}
          </Button>
        </form>

        <p className="mt-4 text-center text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          Don't have any account?&nbsp;
          <button
            className="ml-2 font-medium hover:underline text-indigo-500 text-sm sm:text-base transition"
            onClick={setPage}
          >
            Signup
          </button>
        </p>
        {loginErr && (
          <p className="mt-3 px-4 py-3 rounded-2xl text-red-500 bg-red-500/5 font-medium text-center text-xs sm:text-sm border border-red-500/30 backdrop-blur-xl">
            {loginErr}
          </p>
        )}
      </div>
    </>
  );
}

export default Login;
