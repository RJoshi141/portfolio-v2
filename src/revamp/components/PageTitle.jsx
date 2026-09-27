// Big page title used by Work / Writing / Resume / About
import { motion } from "framer-motion";

export default function PageTitle({ children }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-7xl md:text-9xl lg:text-[10rem] font-medium tracking-[-0.045em] leading-none text-white"
    >
      {children}
    </motion.h1>
  );
}
