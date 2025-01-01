import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { assets } from "../assets/asset"
import Title from "../Components/Title"
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import NewsLetter from "./NewsLetter"

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl  text-gray-600">Our Store</p>
          <p className="text-gray-500"><FontAwesomeIcon icon={faLocationDot} className="text-[20px]"/> <span className="ml-3">6, Jeminatu Buraimoh Street, Barracks, <br /> Surulere., Surulere. Lagos Nigeria. 100011</span></p>
          <p className="text-gray-500">
            <FontAwesomeIcon icon={faPhone} />
            <span className="ml-3">+234-9078278321,
            +234-8108566931 </span>
          </p>
          <p className="text-gray-500">
            <FontAwesomeIcon icon={faInstagram} /> 
            <span className="ml-3">_official_hatsoff</span> 
          </p>
          <p className="text-gray-500"> 
            <FontAwesomeIcon icon={faEnvelope} /> 
            <span className="ml-3">
            hatsoffwears@gmail.com
            </span>
            
          </p>
        </div>

      </div>


      <NewsLetter />
    </div>
  )
}

export default Contact