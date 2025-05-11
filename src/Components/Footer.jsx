import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {  useLocation } from "react-router-dom";


export default function Footer(){
     const location = useLocation()
            const path = ['/admin','/dashboard','/orders']
    
            if(path.includes(location.pathname)) return null

    
    return(
        <div className="w-full justify-center items-center px-auto text-center">
            <div className="mt-[32px] mb-5 ">
                <p className="text-2xl font-medium mb-5 tracking-wide">GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-600" >
                    <li>+234-907-827-8321</li>
                    <li>hatsoffwears@gmail.com</li>
                    <a href='https://www.instagram.com/_official_hatsoff/' className="cursor-pointer text-gray-700 no-underline">
                        <FontAwesomeIcon icon={faInstagram}/>
                        _official_hatsoff
                    </a>

                </ul>
            </div>

            <div>
                <hr/>
                <p className="py-5 text-sm text-center">Copyright 2024@ hatsoffstore.com 
                    All Rights Reserved.
                </p>
            </div>
         </div>
                    
    )
}