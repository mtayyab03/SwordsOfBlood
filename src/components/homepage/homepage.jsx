import { useContext } from "react";
import Localization from "../../context/localization";
import { Link, NavLink } from "react-router-dom";
import SignUpCard from "./SignUpCard";
import Banner from "./banner";
import WhatYouGet from "./what-you-get";
import About from "./about";
import AsSeenOn from "./as-seen-on";
import Facilities from "./facilities";
import Team from "./team";
import Partners from "./partners";
import Video from "./video";
import GameMode from "./GameMode";
import VideoHome from "./videoHome";
import MerchBanner from "./merchBanner";

// import styles from "../footer/footer.module.css";
import { config } from "../../functions/config";
import styles from "../header/header.module.css";
export default function Homepage() {
  const { strings } = useContext(Localization);
  return (
    <>
      <Banner />
      <SignUpCard />
      {/* <div
        style={{ width: "100%", height: "10rem", backgroundColor: "#ffffff" }}
      >
        <NavLink to="/signup">
          <button
            className={styles.betaSignUpButton}
            style={{
              width: "100%",
              height: "10rem",
              backgroundColor: "#000000",
            }}
          >
            <img
              src={images["Union.svg"]}
              alt="Dragon Icon"
              className={styles.dragonIcon}
            />
            BETA SIGN UP
          </button>
        </NavLink>
      </div> */}

      {/* <div className={styles.contactAddressContainer}>
        {strings.tokenAddress}:{" "}
        <span className={styles.address}>{config.tokenAddress}</span>
      </div> */}

      <MerchBanner />
      <VideoHome title="Gameplay" />
      <WhatYouGet />
      <About />
      <GameMode />
      <AsSeenOn />
      <div>
        <h2 className="as-seen-on_heading__HR-hE heading">Watch Trailer</h2>
        <Video
          standard={true}
          url="https://youtu.be/TazaDM80Tb8"
          img="presale/bg2.webp"
        />
      </div>
      <Facilities />
      <Partners />
      <Team />
      {/* <ContactUs /> */}

      {/* Fixed Footer */}
    </>
  );
}
