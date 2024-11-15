import React from "react";
import { NavLink } from "react-router-dom";
import { importAllImages } from "../../functions/common";

import styles from "./SignUpCard.module.css";

const SignUpCard = () => {
  const images = importAllImages();
  return (
    <div>
      <div className={styles.cardOverlay}>
        <div className={styles.cardContent}>
          <div className={styles.victoryImage}>
            <div>
              <div className={styles.prizeTitle}>PRIZES</div>
              <div>
                <div className={styles.bulletpoint}>
                  <img src={images["svg/bullet-point.svg"]} alt="right" />
                  <div className={styles.bulletText}>
                    30k USD in token drops
                  </div>
                </div>

                <div style={{ marginTop: "1.8rem" }} />
                <div className={styles.bulletpoint}>
                  <img src={images["svg/bullet-point.svg"]} alt="right" />
                  <div className={styles.bulletText}>
                    3 beta only items from the XP store
                  </div>
                </div>

                <div style={{ marginTop: "1.8rem" }} />
                <div className={styles.bulletpoint}>
                  <img src={images["svg/bullet-point.svg"]} alt="right" />
                  <div className={styles.bulletText}>Exclusive VIP amas</div>
                </div>

                <div style={{ marginTop: "1.8rem" }} />
                <div className={styles.bulletpoint}>
                  <img src={images["svg/bullet-point.svg"]} alt="right" />
                  <div className={styles.bulletText}>
                    Instant access to future PVP beta
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NavLink to="/signup" className={styles.betaSignUpButton}>
            BETA SIGN UP
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUpCard;
