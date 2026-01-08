import { useState } from "react";
import { motion } from "framer-motion";
import { InputField } from "../Input";
import { Loader } from "../Loader";
import { type Data } from "../Toast";
import { AuthService } from "./Auth.service";
import { useNavigate} from "react-router-dom";
interface sigIn {
  userType: "admin" | "user";
  onSwitchForm: () => void;
  showToast: (show: string, type: Data) => void;
}

interface errors {
  password?: string;
  email?: string;
}

export const SignIn = ({ userType, onSwitchForm, showToast }: sigIn) => {
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<errors>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router=useNavigate();
  const validateForm = () => {
    const newErrors: errors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      const user = await AuthService.login({
        email: formData.email,
        password: formData.password,
        role: userType,
      });
      console.log(user)
      // debugger;
      // debugger;
    } catch (error) {
      showToast("sign up failed", "error");
    } finally {
      // debugger;
      setLoading(false);
      showToast(
        `${userType === "admin" ? "Admin" : "User"} signed in successfully`,
        "success"
      );
      setFormData({ email: "", password: "" });
      router('/dashboard')
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
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
          {userType === "admin" ? "Admin Sign In" : "User Sign In"}
        </h2>
        <p className="text-center text-gray-600 text-xs mb-5">
          Welcome back! Please sign in to continue
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
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-2.5 rounded-md font-semibold text-white text-sm transition-all shadow-md bg-black hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-4"
          >
            {loading ? <Loader /> : "Sign In"}
          </motion.button>
        </div>

        <p className="text-center text-gray-600 text-xs mt-4">
          Don't have an account?{" "}
          <button
            onClick={onSwitchForm}
            className="text-black font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </motion.div>
  );
};
