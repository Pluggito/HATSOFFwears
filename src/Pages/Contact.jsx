import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from "../assets/asset";
import Title from "../Components/Title";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import NewsLetter from "./NewsLetter";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t border-border/40">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-foreground">
        <img
          className="w-full md:max-w-[480px] rounded-2xl border border-border/40"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-bold text-xl text-foreground">Our Store</p>
          <p className="text-muted-foreground">
            <FontAwesomeIcon icon={faLocationDot} className="text-[20px] text-foreground/80" />{" "}
            <span className="ml-3">
              6, Jeminatu Buraimoh Street, Barracks, <br /> Surulere., Surulere.
              Lagos Nigeria. 100011
            </span>
          </p>
          <p className="text-muted-foreground">
            <FontAwesomeIcon icon={faPhone} className="text-foreground/80" />
            <span className="ml-3">+234-9078278321, +234-8108566931 </span>
          </p>
          <p className="text-muted-foreground">
            <FontAwesomeIcon icon={faInstagram} className="text-foreground/80" />
            <span className="ml-3">hatsoff_clb</span>
          </p>
          <p className="text-muted-foreground">
            <FontAwesomeIcon icon={faEnvelope} className="text-foreground/80" />
            <span className="ml-3">hatsoffwears@gmail.com</span>
          </p>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default Contact;
