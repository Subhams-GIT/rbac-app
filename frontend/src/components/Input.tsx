import {motion} from 'framer-motion'
import { error } from './Signup';

interface InputFieldProps{
    label:string,
    placeholder:string,
    value:string,
    onChange:(e:any)=>void,
    error:string|undefined|error,
    showPassword?:boolean,
    type:string,
    togglePassword?:()=>void
}
export const InputField = ({ label, type = "text", placeholder, value, onChange, error, showPassword, togglePassword }:InputFieldProps) => {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <motion.input
          whileFocus={{ scale: 1.005 }}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-all ${
            error ? 'border-gray-400 bg-gray-50' : 'border-gray-300 bg-white'
          }`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black text-xs"
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-600 text-xs"
        >
          {error.toString()}
        </motion.p>
      )}
    </div>
  );
};