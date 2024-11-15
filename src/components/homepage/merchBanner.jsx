import React, { useContext } from "react";
import { importAllImages } from "../../functions/common";
import Localization from "../../context/localization";
import styles from "./merchBanner.module.scss";

const MerchBanner = () => {
  const { strings } = useContext(Localization);
  const images = importAllImages();

  return (
    <div>
      <div className={styles.WhatYouGetContainer}>
        <div className={styles.whatYouGet}>
          <div className={styles.imageAndtext}>
            <img
              loading="lazy"
              src={images["home/merch_hero.webp"]}
              alt="#"
              //   height={160}
            />
            <div>
              <p>"No Guts, No Glory!"</p>
              <p>
                Unveil Exclusive &nbsp;
                <a href="https://merch.swordsofblood.com" target="#">
                  Merch
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchBanner;
