import { useContext, useEffect } from "react";
import Swiper, { Autoplay } from "swiper";
import Localization from "../../context/localization";
import { importAllImages } from "../../functions/common";
import styles from "./what-you-get.module.scss";

export default function WhatYouGet() {
  const { strings } = useContext(Localization);
  const images = importAllImages();

  const slides = [
    {
      title: strings.wygTitle1,
      img: images["home/ICO_Dark_Axe31_E05_1.png"],
    },
    {
      title: strings.wygTitle2,
      img: images["home/ICO_Dark_Axe31_E05_2.png"],
    },
    {
      title: strings.wygTitle3,
      img: images["home/ICO_Dark_Axe31_E05_3.png"],
    },
    {
      title: strings.wygTitle9,
      img: images["home/ICO_Dark_Axe31_E05_4.png"],
    },
    {
      title: strings.wygTitle10,
      img: images["home/ICO_Dark_Axe31_E05_5.png"],
    },
    {
      title: strings.wygTitle8,
      img: images["home/ICO_Dark_Axe31_E05_6.png"],
    },
    {
      title: strings.wygTitle4,
      img: images["home/ICO_Dark_Axe31_E05_7.png"],
    },
    {
      title: strings.wygTitle5,
      img: images["home/ICO_Dark_Axe31_E05_8.png"],
    },
    {
      title: strings.wygTitle6,
      img: images["home/ICO_Dark_Axe31_E05_9.png"],
    },
    {
      title: strings.wygTitle7,
      img: images["home/ICO_Fire_Sword01_E05.png"],
    },
  ];

  useEffect(() => {
    const swiper = new Swiper(".whatYouGet", {
      modules: [Autoplay],
      direction: "horizontal",
      loop: true,
      slidesPerView: 10,
      spaceBetween: 25,
      autoplay: {
        delay: 2000,
      },
      breakpoints: {
        1400: {
          slidesPerView: 10,
        },
        1380: {
          slidesPerView: 3.2,
        },
        1199: {
          slidesPerView: 2.3,
          spaceBetween: 25,
        },
        1000: {
          slidesPerView: 2.1,
          spaceBetween: 25,
        },
        767: {
          slidesPerView: 1.5,
        },
        520: {
          slidesPerView: 1.3,
        },
        400: {
          slidesPerView: 1.2,
        },
        320: {
          slidesPerView: 1.1,
        },
      },
    });

    return () => {
      try {
        swiper.destroy();
      } catch (error) {
        console.log(error.message);
      }
    };
  }, []);

  return (
    <div className={styles.WhatYouGetContainer}>
      <div className={["whatYouGet", styles.whatYouGet].join(" ")}>
        <div className="swiper-wrapper" aria-label="what-you-get-slider">
          {slides.map((p, i) => {
            return (
              <div
                key={i}
                className={[styles.imageAndtext, "swiper-slide"].join(" ")}
              >
                <img loading="lazy" src={p.img} alt="#" />
                <p className={`title ${styles.title}`}>{p.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
