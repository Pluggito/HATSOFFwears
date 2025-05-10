import {assets} from '../assets/asset'
import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faMagnifyingGlass, faAngleLeft }from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Menu } from 'lucide-react'



const Navbar = () => {
        const [visible,setVisible] = useState (false);
        const {setShowSearch, getCartCount} = useContext(ShopContext);
        const location = useLocation()
        const path = ['/admin','/dashboard']

        if(path.includes(location.pathname)) return null
     
  return (
    <div className="flex items-center justify-between py-5 font-medium">

        <Link to='/'>
        <img  src={assets.logo_icon1} className='w-20 h-20' alt=""/>
        </Link>
       

        <ul className='hidden sm:flex gap-5 text-sm text-gray-600'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bq-gray-700 '/>
            </NavLink>
            <NavLink to='/collections' className='flex flex-col items-center gap-1'>
                <p>COLLECTIONS</p>
                <hr className='w-2/4 border-none h-[1.5px] bq-gray-700 
                hidden'/>
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bq-gray-700 
                hidden'/>
            </NavLink>
            <NavLink to='contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bq-gray-700 
                hidden'/>
            </NavLink>
            

        </ul>

        <div className='flex items-center gap-6'>
            <FontAwesomeIcon icon={faMagnifyingGlass}
            className='text-[20px]' onClick={()=> setShowSearch(true)}/>

            <Link to='/cart' className='relative'>
            <FontAwesomeIcon icon={faCartPlus}
            className='text-[20px]'/>
             <p className='absolute left-[15px] top-[-7px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>
        

            <Menu  className='sm:hidden cursor-pointer' onClick={()=> setVisible(true)} />
                
                {/* Sidebar Menu for Small Screen */}
                <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                    <div className='flex flex-col text-gray-600'>
                        <div onClick={()=> setVisible(false)} className='flex itmes-center gap-4 p-3 cursor-pointer' >
                        <FontAwesomeIcon icon={faAngleLeft} className='text-[20px] mt-[4px] mr-[-5px]' />
                        <p>Back</p>
                        </div>

                        <NavLink onClick={()=> setVisible(false)} to='/' className='py-2 pl-6 border'>HOME</NavLink>
                        <NavLink onClick={()=> setVisible(false)} to='/collections' className='py-2 pl-6 border'>COLLECTIONS</NavLink>
                        <NavLink onClick={()=> setVisible(false)} to='/about' className='py-2 pl-6 border'>ABOUT</NavLink>
                        <NavLink onClick={()=> setVisible(false)} to='/contact' className='py-2 pl-6 border'>CONTACT</NavLink>
                        </div>
                    </div>
                </div>


    </div>
  )
}
 
export default Navbar