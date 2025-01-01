import { faHeadphonesSimple, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from "../assets/asset";




export default function Policy(){
    return(

        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-600">

            <div>
                <FontAwesomeIcon icon={faRotate} className="text-[50px] text-black mb-5" />
                <p>Easy Exchange Policy</p>
                <p>We Offer hassle free exchnage policy</p>
            </div>
            <div>
                <img className='w-12 m-auto mb-5'src={assets.quality_icon} alt=""/> 
                <p>7 Days Return Policy</p>
                <p>We provide 7 days free return policy</p>
            </div>
            <div>
                <FontAwesomeIcon icon={faHeadphonesSimple} className="text-[50px] text-black mb-5" />
                <p>Best customer support</p>
                <p>We provide 24/7 customer support</p>
            </div>



        </div>

    )
}