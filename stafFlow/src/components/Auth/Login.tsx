import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toast } from "../Toast";
import { DiagonalGrid } from "../Diagonal";
import { type ToastProps } from "../Toast";
import { type Data } from "../Toast";
import { SignIn } from "./Signin";
import { SignUp } from "./Signup";


export default function Login():React.ReactNode {
  const [userType, setUserType] = useState<'user'|'admin'>("user");
  const [formType, setFormType] = useState("signin");
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (message: string, type: Data = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <DiagonalGrid />

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50">
        <AnimatePresence>
          {toast && (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* User Type Selector */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex gap-3 mb-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUserType("user")}
            className={`flex-1 py-2 px-4 rounded-md font-semibold text-sm transition-all ${
              userType === "user"
                ? "bg-black text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow border border-gray-200"
            }`}
          >
            User
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUserType("admin")}
            className={`flex-1 py-2 px-4 rounded-md font-semibold text-sm transition-all ${
              userType === "admin"
                ? "bg-black text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow border border-gray-200"
            }`}
          >
            Admin
          </motion.button>
        </motion.div>

        {/* Auth Forms */}
        <AnimatePresence mode="wait">
          {formType === "signin" ? (
            <SignIn
              key="signin"
              userType={userType}
              onSwitchForm={() => setFormType("signup")}
              showToast={showToast}
            />
          ) : (
            <SignUp
              key="signup"
              userType={userType}
              onSwitchForm={() => setFormType("signin")}
              showToast={showToast}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
