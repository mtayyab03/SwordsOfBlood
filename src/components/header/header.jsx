import { useContext, useState, useEffect, useRef } from "react";

import Localization from "../../context/localization";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBars,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { config } from "../../functions/config";
import { importAllImages } from "../../functions/common";
import styles from "./header.module.css";
import { Link, NavLink } from "react-router-dom";
import MblLogo from "../../images/home/Swoordsofblood-logo-mobile.png";
export default function Header({ toggleSidebar }) {
  const { strings, lang, locales, SetLanguage } = useContext(Localization);
  const [langMenu, setLangMenu] = useState([]);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const langSwitch = useRef(null);
  const images = importAllImages();

  const toggleButton = () => {
    if (sidebarOpened) setSidebarOpened(false);
    else setSidebarOpened(true);
    toggleSidebar();
    console.log("check");
  };

  useEffect(() => {
    let langs = [];
    locales.forEach((l) => {
      if (l !== lang) {
        langs.push(
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link
            key={l}
            to="#"
            className={styles.content}
            onClick={(_e) => {
              SetLanguage(l);
            }}
          >
            <img
              src={images[`lang/${l}.png`]}
              alt="language"
              className={styles.flag}
            />{" "}
            {l.toUpperCase()}
          </Link>
        );
      }
    });
    setLangMenu(langs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img
            src={images["logo.webp"]}
            alt={strings.logoTitle}
            className={styles.logo}
          />
        </Link>
      </div>
      {sidebarOpened ? (
        <>
          <button
            onClick={toggleButton}
            id="close-ico"
            className={styles.close}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <button
            onClick={toggleButton}
            id="open-ico"
            style={{ display: "none" }}
            className={styles.hamburger}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={toggleButton}
            id="open-ico"
            className={styles.hamburger}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <button
            onClick={toggleButton}
            id="close-ico"
            style={{ display: "none" }}
            className={styles.close}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </>
      )}
      <img
        src={images["logo.webp"]}
        alt="Swords of Blood"
        className={styles.headerLogo + " " + "maxno"}
      />
      <img src={MblLogo} alt="Swords of Blood" className={"maxnoso"} />
      <div className={styles.adressAndLanugage}>
        <NavLink to="/signup">
          <button className={styles.betaSignUpButton}>
            <img
              src={images["Union.svg"]}
              alt="Dragon Icon"
              className={styles.dragonIcon}
            />
            BETA SIGN UP
          </button>
        </NavLink>
        <div className={styles.languageChangingDropdown}>
          <button ref={langSwitch} className={styles.dropbtn}>
            <div className={styles.languageAndCountryName}>
              <span className={styles.iconAndCountry}>
                <img
                  src={images[`lang/${lang}.png`]}
                  alt="language"
                  className={styles.flag}
                />{" "}
                {lang.toUpperCase()}
              </span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </button>
          <div className={styles.dropdownContent}>
            {langMenu.length > 0 && <>{langMenu}</>}
          </div>
        </div>
      </div>
    </header>
  );
}
