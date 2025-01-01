import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from "../assets/asset";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";


export default function Footer(){

    const text = ` HatsOff Store is your premier destination for premium headwear. We're dedicated to bringing 
                you the finest selection of hats that combine style, comfort, and quality craftsmanship.`
    return(
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

            <div>
                <img src={assets.logo_icon1} className="mb-5 w-32 "alt="" />
                <p className="w-full md:w-2/3 text-gray-500 leading-relaxed">
                    {text}
                </p>
            </div>

            <div className="mt-[32px]">
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className="mt-[32px]">
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-600" >
                    <li>+234-907-827-8321</li>
                    <li>hatsoffwears@gmail.com</li>
                    <a href='https://www.instagram.com/_official_hatsoff/' className="cursor-pointer text-gray-700 no-underline">
                        <FontAwesomeIcon icon={faInstagram}/>
                        _official_hatsoff
                    </a>

                </ul>
            </div>
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