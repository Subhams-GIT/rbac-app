import { motion } from "framer-motion";
import { type Data } from "./Toast";
import { useState } from "react";
import { InputField } from "./Input";
import { Loader } from "./Loader";
interface SignupProps {
  userType: "admin" | "user";
  onSwitchForm: () => void;
  showToast: (show: string, type: Data) => void;
}
export type error = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  adminEmail?: string;
};
export const SignUp = ({ userType, onSwitchForm, showToast }: SignupProps) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    adminEmail: "",
  });
  const [errors, setErrors] = useState<error>({
    email: "",
    repeatPassword: "",
    username: "",
    password: "",
    adminEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const validateForm = () => {
    const newErrors: error = {
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
      adminEmail: "",
    };

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.username) newErrors.username = "Username is required";
    else if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.repeatPassword)
      newErrors.repeatPassword = "Please repeat your password";
    else if (formData.password !== formData.repeatPassword)
      newErrors.repeatPassword = "Passwords do not match";

    if (userType === "user") {
      if (!formData.adminEmail)
        newErrors.adminEmail = "Admin email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.adminEmail))
        newErrors.adminEmail = "Invalid admin email format";
    }
    console.log(userType);
    console.log(formData);
    setErrors(newErrors);
   return Object.values(newErrors).filter(element=>element.length!=0).length===0
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // make api call
    setLoading(false);
    showToast(
      `${userType === "admin" ? "Admin" : "User"} account created successfully`,
      "success"
    );
    setFormData({
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
      adminEmail: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center mb-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-full bg-black flex items-center justify-center"
          >
            <span className="text-white text-lg font-bold">
              {userType === "admin" ? "A" : "U"}
            </span>
          </motion.div>
        </div>

        <h2 className="text-xl font-bold text-center text-black mb-1">
          {userType === "admin" ? "Admin Sign Up" : "User Sign Up"}
        </h2>
        <p className="text-center text-gray-600 text-xs mb-5">
          Create your account to get started
        </p>

        <div className="space-y-3">
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
          />

          <InputField
            label="Username"
            type="text"
            placeholder="Choose a username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            error={errors.username}
          />

          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />

          <InputField
            label="Repeat Password"
            type={showRepeatPassword ? "text" : "password"}
            placeholder="Repeat your password"
            value={formData.repeatPassword}
            onChange={(e) =>
              setFormData({ ...formData, repeatPassword: e.target.value })
            }
            error={errors.repeatPassword}
            showPassword={showRepeatPassword}
            togglePassword={() => setShowRepeatPassword(!showRepeatPassword)}
          />

          {userType === "user" && (
            <InputField
              label="Admin Email"
              type="email"
              placeholder="Enter admin email"
              value={formData.adminEmail}
              onChange={(e) =>
                setFormData({ ...formData, adminEmail: e.target.value })
              }
              error={errors.adminEmail}
            />
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-2.5 rounded-md font-semibold text-white text-sm transition-all shadow-md bg-black hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-4"
          >
            {loading ? <Loader /> : "Sign Up"}
          </motion.button>
        </div>

        <p className="text-center text-gray-600 text-xs mt-4">
          Already have an account?{" "}
          <button
            onClick={onSwitchForm}
            className="text-black font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </motion.div>
  );
};
