import { assets } from '../assets/asset'
import { motion } from 'framer-motion';



const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border-gray-400 mt-[10px]'>
        {/*Hero left*/}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p>Shop At</p>
            </div>
            <motion.h1
               initial={{ opacity: 0, y: -25 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.25 }} className='outfit font-bold text-3xl sm:py-3 lg:text-5xl leading-relaxed text-black' >HATS OFF wears</motion.h1>
            <div className='flex items-center gap-2'>
              <p className='font semibold text-sm md:text-base'>SHOP NOW!</p>
              <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            </div>
        </div>
        </div>
      {/*Hero right side */}

      <img className='sm:w-1/2' src={assets.img8}  alt=''/>
    </div>

  )
}

export default Hero
