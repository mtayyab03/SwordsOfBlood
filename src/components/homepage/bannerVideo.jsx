import { useEffect, useState } from "react";
import styles from "./banner.module.css";

import "./custom.css";
import img from "../../images/home/hero3.webp";
import video1 from "../../assets/videos/hero3.webm";
import video2 from "../../assets/videos/hero3.mp4";
let BannerVideo = () => {
  const [isGreaterThan768px, setIsGreaterThan768px] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsGreaterThan768px(true);
      } else {
        setIsGreaterThan768px(false);
      }
    }
    handleResize();
    console.log("isGreaterThan768px", isGreaterThan768px);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("rerender on isGreater Than");
  }, [isGreaterThan768px]);

  return (
    <>
      {isGreaterThan768px && (
        <video
          style={{ pointerEvents: "none" }}
          className={["image desk-only", styles.image].join(" ")}
          autoPlay
          loop
          playsInline
          muted
        >
          <source src={video1} type="video/webm" />
          <source src={video2} type="video/mp4" />
        </video>
      )}
      <img className="mbl-only" src={img} alt="" />
    </>
  );
};
export default BannerVideo;
