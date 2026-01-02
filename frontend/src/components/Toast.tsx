import {motion} from 'framer-motion'
import type React from 'react';


export type Data='success'|'error'|'info'
export interface ToastProps{
    message:string,
    type:Data,
    id:number,
    onClose?:()=>void
}
export const Toast = ({ message, type, onClose }:ToastProps) => {
  const colors = {
    success: 'bg-black',
    error: 'bg-gray-800',
    info: 'bg-gray-700'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`${colors[type]} text-white px-4 py-2.5 rounded-md shadow-lg flex items-center gap-2 min-w-[280px] text-sm`}
    >
      <span className="flex-1 font-medium">{message}</span>
      <button onClick={onClose} className="hover:bg-white/20 p-0.5 rounded transition-colors text-lg leading-none">
        ×
      </button>
    </motion.div>
  );
};