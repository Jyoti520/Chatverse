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
      const {email, password}=formData;
      const result = await signupUser(formData);
      // auto-login the account
      if(result){
        const success= await loginUser(email, password);
        if(success) navigate("/chats");
      }
      
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
          <Input
            label="Username:"
            value={formData.username}
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
            className={inputStyles("username")}
          />
          <div className="min-h-[20px] px-1 flex items-center">
          {errors.username && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">{errors.username}</p>
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
          <div className="min-h-[20px] px-1 flex items-center">
          {errors.email && (
            <p className="text-sm font-medium dark:text-red-400 text-red-500">{errors.email}</p>
          )}
          </div>
          <Input
            label="Password: "
            name="password"
            type={"password"}
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
            className={inputStyles("password")}
          />
          <div className="min-h-[20px] px-1 flex items-center">
          {errors.password && (
            <p className="text-sm font-medium dark:text-red-400 text-red-500">{errors.password}</p>
          )}
          </div>
          <Input
            label="Confirm Password: "
            name="confirmPassword"
            type={"password"}
            value={formData.confirmPassword}
            placeholder="Enter your password"
            onChange={handleChange}
            className={inputStyles("confirmPassword")}
          />
          <div className="min-h-[20px] px-1 flex items-center">
          {errors.confirmPassword && (
            <p className="text-sm font-medium dark:text-red-400 text-red-500">{errors.confirmPassword}</p>
          )}
          </div>
          <Button
            type="submit"
            className={`w-full px-3 py-2.5 uppercase rounded-2xl font-medium text-sm sm:text-base text-white  ${
              isLoading
                ? "bg-slate-400 cursor-not-allowed "
                : "bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 hover:scale-[1.01] active:scale-95 cursor-pointer shadow-lg shadow-indigo-500/20"
            } `}
            title="Signup to your account"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Signup"}
          </Button>
        </form>
         {/* Footer */}
        <p className="mt-4 text-center text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          Already have a account?&nbsp;
          <button
            onClick={setPage}
            className="ml-2 font-medium hover:underline text-indigo-500 text-sm sm:text-base transition"
          >
            Login
          </button>
        </p>

        {signupErr && (
          <p className="mt-3 px-4 py-3 rounded-2xl text-red-500 bg-red-500/5 font-medium text-center text-xs sm:text-sm border border-red-500/40 backdrop-blur-xl">
            {signupErr}
          </p>
        )}
      </div>
    </>
  );
}

export default Signup;
