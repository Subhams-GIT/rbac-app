import {motion} from 'framer-motion'
export const Loader = () => (
  <motion.div
    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  />
);
