//import { assets } from '../assets/asset'
import { motion } from "framer-motion";
import ShopNowbutton from "./ShopNowbutton";

const Hero = () => {
  return (
    <div className="mt-4 rounded-3xl overflow-hidden border border-border/40 relative bg-zinc-950 text-white shadow-xl dark:border-white/5">
      {/* Refreshed Streetwear Mesh Radial Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.15),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(63,131,248,0.05),transparent_60%)] pointer-events-none" />

      <div className="w-full flex items-center justify-center py-16 sm:py-24 relative z-10">
        <div className="text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3 justify-center mb-2"
          >
            <span className="w-6 md:w-10 h-[1.5px] bg-white/60"></span>
            <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-white/70">Shop At</p>
            <span className="w-6 md:w-10 h-[1.5px] bg-white/60"></span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="outfit font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tighter uppercase leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/75"
          >
            HATS OFF wears
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
            className="mt-8 flex justify-center"
          >
            <ShopNowbutton />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
