//import { assets } from '../assets/asset'
import { motion } from "framer-motion";
import ShopNowbutton from "./ShopNowbutton";

const Hero = () => {
  return (
    <div className="mt-[10px] bg-black">
      <div className="w-full flex items-center justify-center py-10 sm:py-16 flex-row">
        <div className="text-slate-50 text-center">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 justify-center"
          >
            <p className="w-8 md:w-11 h-[2px] bg-slate-50"></p>
            <p>Shop At</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="outfit font-bold text-3xl sm:text-4xl lg:text-5xl leading-relaxed text-slate-50"
          >
            HATS OFF wears
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-4"
          >
            <ShopNowbutton />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
