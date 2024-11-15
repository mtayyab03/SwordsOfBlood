import { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Localization from '../../context/localization';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faCircleChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { config } from '../../functions/config';
import { importAllImages } from '../../functions/common';
import { socialLinks } from '../social-links';
import styles from './sidebar.module.css';
import gift from '../../images/sidebar-icons/gift_animation.gif';

export default function Sidebar({ showSidebar, setShowSidebar }) {
  const { strings, lang, locales, SetLanguage } = useContext(Localization);
  const images = importAllImages();

  const [langMenu, setLangMenu] = useState([]);
  const langSwitch = useRef(null);

  const imageIconsPath = (name) => {
    return images[`sidebar-icons/${name}.png`];
  };
  const [projectDropDown, setProjectDropDown] = useState(false);
  const [aboutDropDown, setAboutDropDown] = useState(false);
  let toggleHere = () => {
    let closeIco = document.getElementById('close-ico');
    let openIco = document.getElementById('open-ico');
    closeIco.classList.add('no-open');
    openIco.classList.add('imp-mbl');
  };

  useEffect(() => {
    let langs = [];
    locales.forEach((l) => {
      if (l !== lang) {
        langs.push(
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link
            key={l}
            to='#'
            className={styles.content}
            onClick={(_e) => {
              SetLanguage(l);
            }}
          >
            <img
              src={images[`lang/${l}.png`]}
              alt='language'
              className={styles.flag}
            />{' '}
            {l.toUpperCase()}
          </Link>
        );
      }
    });
    setLangMenu(langs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <div
      className={[styles.sidebar, showSidebar ? styles.showSidebar : ''].join(
        ' '
      )}
    >
      <div>
        <NavLink
          to='/'
          onClick={() => {
            setProjectDropDown(false);
            setAboutDropDown(false);
          }}
          className={styles.logoContainer}
        >
          <img
            src={images['logo.webp']}
            alt={strings.logoTitle}
            className={styles.logo}
          />
        </NavLink>
        <div className={styles.navItems}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              [
                styles.navItem,
                styles.navBtn,
                isActive ? styles.active : '',
              ].join(' ')
            }
            onClick={() => {
              setProjectDropDown(false);
              setAboutDropDown(false);
              setShowSidebar();
              toggleHere();
            }}
          >
            <img src={imageIconsPath('Swordsofblood')} alt='Swordsofblood' />
            {config.appName}
          </NavLink>
          <div
            className={`${styles.dropDownContainer} ${styles.aboutDropDownContainer}`}
            onClick={() => setProjectDropDown(false)}
          >
            <div
              className={[styles.dropdownHeader, styles.navBtn].join(' ')}
              onClick={() => setAboutDropDown((prev) => !prev)}
            >
              <p className={styles.navItem}>
                <img src={imageIconsPath('SOB')} alt='SOB' />
                {strings.aboutTtl}
              </p>
              <FontAwesomeIcon
                className={`${styles.arrow} ${
                  aboutDropDown && styles.rotateArrow
                }`}
                icon={faCircleChevronDown}
              />
            </div>

            <div
              className={`${styles.dropdownItems} ${
                aboutDropDown && styles.aboutDropDowns
              }`}
            >
              <a
                href='https://swords-of-blood-1.gitbook.io/swords-of-blood-whitepaper/'
                target='_blank'
                rel='noreferrer'
                className={[styles.navItem, styles.dropdownItem].join(' ')}
                onClick={() => {
                  setShowSidebar();
                  toggleHere();
                }}
              >
                <img src={imageIconsPath('Whitepaper')} alt='Whitepaper' />
                {strings.wpTtl}
              </a>
              <NavLink
                to='/allocation/'
                className={({ isActive }) =>
                  [
                    styles.navItem,
                    styles.dropdownItem,
                    isActive ? styles.active : '',
                  ].join(' ')
                }
                onClick={() => {
                  setShowSidebar();
                  toggleHere();
                }}
              >
                <img
                  src={imageIconsPath('Token Allocation')}
                  alt='Token Allocation'
                />
                {strings.allocTtl}
              </NavLink>
              <a
                href='/assets/Swords of Blood Pitchdeck Lite.pdf'
                target='_blank'
                rel='noreferrer'
                className={[styles.navItem, styles.dropdownItem].join(' ')}
                onClick={() => {
                  setShowSidebar();
                  toggleHere();
                }}
                style={{ height: 'max-content !important' }}
              >
                <img src={imageIconsPath('Pitchdeck')} alt='Pitchdeck' />
                {strings.deckTtl}
              </a>
              <NavLink
                to='/team/'
                className={({ isActive }) =>
                  [
                    styles.navItem,
                    styles.dropdownItem,
                    isActive ? styles.active : '',
                  ].join(' ')
                }
                onClick={() => {
                  setShowSidebar();
                  toggleHere();
                }}
              >
                <img
                  src={imageIconsPath('Token Allocation')}
                  alt='Token Allocation'
                />
                Team
              </NavLink>
            </div>
          </div>
          {/* <NavLink
            onClick={() => {
              setProjectDropDown(false);
              setAboutDropDown(false);
              setShowSidebar();
              toggleHere()
            }}
            to="/presale/"
            className={({ isActive }) =>
              [
                styles.navItem,
                styles.presale,
                styles.navBtn,
                styles.dropdownItem,
                isActive ? styles.active : "",
              ].join(" ")
            }
          >
            <img src={imageIconsPath("Presale")} alt="Presale" />
            {strings.presaleTtl}
          </NavLink> */}
          <div
            className={`${styles.dropDownContainer} ${styles.projectDropDownContainer}`}
            onClick={() => setAboutDropDown(false)}
          >
            <NavLink
              onClick={() => {
                setProjectDropDown(true);
                setShowSidebar();
                toggleHere();
              }}
              to='/roadmap'
              className={({ isActive }) =>
                [
                  styles.navItem,
                  styles.dropdownItem,
                  isActive ? styles.active : '',
                ].join(' ')
              }
            >
              {/* <div
              className={[styles.dropdownHeader, styles.navBtn].join(" ")}
              onClick={() => setProjectDropDown((prev) => !prev)}
            > */}
              <img src={imageIconsPath('Roadmap')} alt='Roadmap' />
              {strings.rmTtl}
              {/* </div> */}
            </NavLink>
            {/* <FontAwesomeIcon
                className={`${styles.arrow} ${
                  projectDropDown && styles.rotateArrow
                }`}
                icon={faCircleChevronDown}
              /> */}

            {/* <div
              className={[
                styles.dropdownItems,
                `${projectDropDown && styles.projectDropDowns}`,
              ].join(" ")}
            >
              <NavLink
                onClick={() => {
                  setProjectDropDown(true);
                  setShowSidebar();
                  toggleHere();
                }}
                to="/roadmap"
                className={({ isActive }) =>
                  [
                    styles.navItem,
                    styles.dropdownItem,
                    isActive ? styles.active : "",
                  ].join(" ")
                }
              >
                <img src={imageIconsPath("Roadmap")} alt="Roadmap" />
                {strings.rmTtl}
              </NavLink> */}
            {/* <a
                href="https://github.com/solidproof/projects/blob/main/Swords%20of%20Blood/SmartContract_Audit_Solidproof_SwordsOfBlood.pdf"
                rel="noreferrer"
                target="_blank"
                className={[styles.navItem, styles.dropdownItem].join(" ")}
                onClick={() => {
                  setShowSidebar();
                  toggleHere();
                }}
              >
                <img src={imageIconsPath("Audit")} alt="Audit" />
                {strings.auditTtl}
              </a> */}
            {/* </div> */}
          </div>
          {/* <NavLink
            to="https://swordsofblood.idexo.com/vesting"
            className={({ isActive }) =>
              [
                styles.navItem,
                styles.navBtn,
                isActive ? styles.active : "",
              ].join(" ")
            }
          >
            Token Claimer
          </NavLink> */}
          <NavLink
            to='https://merch.swordsofblood.com'
            target='_blank'
            className={({ isActive }) =>
              [
                styles.navItem,
                styles.navBtn,
                isActive ? styles.active : '',
              ].join(' ')
            }
          >
            <div className={styles.gif_container}>
              Merch
              <img src={gift} alt={'gift'} className={styles.gif} />
            </div>
          </NavLink>
        </div>
        {/* // -- */}
        <NavLink to='/signup'>
          <button className={styles.betaSignUpButton}>
            <img
              src={images['Union.svg']}
              alt='Dragon Icon'
              className={styles.dragonIcon}
            />
            BETA SIGN UP
          </button>
        </NavLink>
        <div className={styles.adressAndLanugage}>
          <div className={styles.languageChangingDropdown}>
            <button ref={langSwitch} className={styles.dropbtn}>
              <div className={styles.languageAndCountryName}>
                <span className={styles.iconAndCountry}>
                  <img
                    src={images[`lang/${lang}.png`]}
                    alt='language'
                    className={styles.flag}
                  />{' '}
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
        {/* //  */}
      </div>
      <div
        onClick={() => {
          setProjectDropDown(false);
          setAboutDropDown(false);
        }}
      >
        <div className={styles.quicklinksContainer}>
          <h6 className={styles.quichLinksHeader}>{strings.quickLinksTtl}</h6>
          <NavLink to='/privacy/' className={styles.link}>
            {strings.privPolicy}
          </NavLink>

          <NavLink to='/termsandconditions/' className={styles.link}>
            {strings.termsAndConds}
          </NavLink>
          <a
            href='/assets/aml-hitbox.pdf'
            target='_blank'
            className={styles.link}
          >
            {strings.amlPolicy}
          </a>
          <a
            href='/assets/SWDTKN-SALE-Terms-and-Conditions.pdf'
            className={styles.link}
            target='_blank'
          >
            {strings.salePolicy}
          </a>
          <a href='/sitemap.xml' target='_blank' className={styles.link}>
            {strings.sitemap}
          </a>
        </div>
        <div>
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>{strings.descText1}</p>
            <p className={styles.description}>
              {strings.descText2.replace('{YEAR}', new Date().getFullYear())}
            </p>
            <p className={styles.description}>{strings.descText3}</p>
          </div>
        </div>
        <div className={styles.socialMediaContainer}>
          <div className={styles.allSocialMedia}>
            {socialLinks.map((p, i) => {
              return (
                <a
                  key={i}
                  href={p.link}
                  target='_blank'
                  rel='noreferrer'
                  className={styles.socialIcon}
                >
                  <img src={p.img} alt='' className={styles.socials} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
