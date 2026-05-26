import {
  faHeadphonesSimple,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from "../assets/asset";

export default function Policy() {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-muted-foreground">
      <div>
        <FontAwesomeIcon
          icon={faRotate}
          className="text-[50px] text-foreground mb-5"
        />
        <p className="font-bold text-foreground">Easy Exchange Policy</p>
        <p>We offer a hassle-free exchange policy</p>
      </div>
      <div>
        <img className="w-12 m-auto mb-5 dark:invert" src={assets.quality_icon} alt="" />
        <p className="font-bold text-foreground">7 Days Return Policy</p>
        <p>We provide 7 days free return policy</p>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faHeadphonesSimple}
          className="text-[50px] text-foreground mb-5"
        />
        <p className="font-bold text-foreground">Best Customer Support</p>
        <p>We provide 24/7 customer support</p>
      </div>
    </div>
  );
}
