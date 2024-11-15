import { useContext } from "react";
import Localization from "../../context/localization";
import { importAllImages } from "../../functions/common";
import styles from "./contactus.module.css";
import './custom.css'
export default function ContactUs() {
  const { strings } = useContext(Localization);
  const images = importAllImages();

  return (
    <div className={styles.contactusWrapper}>
  
        <img
        src={images["home/ambassador-bg_1.webp"]}
          alt="Unlock new opportunities to earn SWDTKN when you join our growing community of gamers. Enjoy an immersive web3 mobile game and earn tokens!"
          className={[styles.image, "image"].join(" ")}
        /> 

      <div className={styles.textWrapper}>
        <p className={styles.contactDetails}>{strings.contactUsDesc}</p>
        <a
          href="mailto:social@swordsofblood.com"
          className={styles.contactButton}
        >
          {strings.contactUs}
        </a>
      </div>
    </div>
  );
}
