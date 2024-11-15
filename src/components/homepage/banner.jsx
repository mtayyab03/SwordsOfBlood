import { useContext, useState, useEffect, useRef, Suspense, lazy } from "react";
import { NavLink } from "react-router-dom";
import Web3Provider from "../../context/web3provider";
import Localization from "../../context/localization";
import Video from "./bannerVideo";

import {
  SetGlobalProvider,
  getPresaleContract,
  setNetwork,
  DisconnectProvider,
  GetAccount,
  GetBalance,
} from "../../functions/onchain";
import {
  retrievePresaleInfo,
  retrieveAdditionalPresaleInfo,
} from "../../functions/common";
import { config } from "../../functions/config";
import {
  importAllImages,
  SetStorageData,
  GetStorageData,
  getCurrentTimestamp,
} from "../../functions/common";
import ModalBuy from "../modal-buy/modal-buy";
import styles from "./banner.module.css";
import Countdown from "../countdown/Countdown";
import "./custom.css";
import ModalConnectWallet from "../modal-connect-wallet/modal-connect-wallet";

import swordfairy from "../../images/home/swordfairy.png";

// const Video = lazy(() => import("./bannerVideo"));

export default function Banner() {
  const [refresh, setRefresh] = useState(0);
  const { strings } = useContext(Localization);
  const web3provider = useContext(Web3Provider);
  const [inLoading, setInLoading] = useState(true);
  const [presaleData, setPresaleData] = useState(null);
  const [curStep, setCurStep] = useState(0);
  // const [loadingInfoText, setLoadingInfoText] = useState(null);
  // const [showConnectModal, setShowConnectModal] = useState(false);
  // const [showBuyModal, setShowBuyModal] = useState(false);
  // const [purchaseToken, setPurchaseToken] = useState(4);
  // const [hideConnectButton, setHideConnectButton] = useState(false);
  const curStepRef = useRef(0);
  const progressLine = useRef(null);
  const inFetch = useRef(false);
  const images = importAllImages();

  const get_percent = (
    totalTokensSold,
    stageTotalTokensTarget,
    totalUSDraised,
    stageTotalUSDTarget
  ) => {
    const percent_tokens = Math.round(
      (totalTokensSold / stageTotalTokensTarget) * 100
    );
    const percent_raised = Math.round(
      (totalUSDraised / stageTotalUSDTarget) * 100
    );
    return Math.round((percent_raised + percent_tokens) / 2);
  };

  const getPrepresaleData = async (mode = 0) => {
    if (mode > 0 && !web3provider.current.status) {
      Disconnect();
      return false;
    }

    try {
      setInLoading(true);

      let info = {},
        getSC = true;

      if (presaleData) info = presaleData;
      else {
        const storedPresaleData = GetStorageData("storedPresaleData");
        if (storedPresaleData) {
          const decData = JSON.parse(storedPresaleData);
          if (!decData.ldt || getCurrentTimestamp() - decData.ldt < 3600) {
            Object.assign(info, decData);
            getSC = false;
          }
        }
      }
      if (mode > 0) {
        info.wallet = await GetAccount(web3provider.current.instance);
        if (!info.wallet) {
          Disconnect();
          return false;
        }
      }

      if (mode === 0) {
        web3provider.current.network = setNetwork(
          process.env.NODE_ENV === "development" ? "BSC" : "ETHEREUM"
        );
        await SetGlobalProvider(2, web3provider);
      }

      let contract = getPresaleContract(web3provider.current.instance);
      if ((mode === 0 || mode === 2) && getSC) {
        inFetch.current = true;
        Object.assign(info, await retrievePresaleInfo(contract));
        SetStorageData(
          "storedPresaleData",
          JSON.stringify(Object.assign(info, { ldt: getCurrentTimestamp() }))
        );
        inFetch.current = false;
      }

      if (mode >= 1)
        Object.assign(
          info,
          await retrieveAdditionalPresaleInfo(contract, info)
        );

      // check the total token sold if it's heigh leave it as it is or add the static price
      if (info.totalTokensSold + 27500000 <= 32500000) {
        info.totalTokensSold += 27500000;
        info.totalUSDraised += 1100000;
      }
      info.stageTotalTokensTarget = 32500000;
      info.stageTotalUSDTarget = 1370000;

      // get the precent from the total usd and token
      info.stagePercentsCompleted = get_percent(
        info.totalTokensSold,
        info.stageTotalTokensTarget,
        info.totalUSDraised,
        info.stageTotalUSDTarget
      );
      setPresaleData(info);

      if (mode > 0) setCurStep(1);
      setInLoading(false);
    } catch (err) {
      setInLoading(false);
    }
  };

  const Disconnect = () => {
    DisconnectProvider(web3provider);
    setCurStep(0);
    setInLoading(false);
  };

  useEffect(() => {
    curStepRef.current = curStep;
  }, [curStep]);

  useEffect(() => {
    if (window && window.ethereum) {
      window.ethereum.on("chainChanged", (chainIdHex) => {
        if (chainIdHex !== config[web3provider.current.network].chainIdHex)
          Disconnect();
      });

      window.ethereum.on("accountsChanged", async () => {
        if (
          !web3provider.current.status ||
          !(await GetAccount(web3provider.current.instance))
        )
          Disconnect();
        else if (curStepRef.current === 1) await getPrepresaleData(2);
      });
    }

    getPrepresaleData(0);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      web3provider.current.status = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <>
      <div className={["mainBanner", "timer", styles.banner].join(" ")}>
        <div className={styles.heroSection}>
          <Suspense
            fallback={
              <img
                src={images["home/banner/hero3.png"]}
                alt="Play-to-earn is out. Earn real rewards with Swords of Blood's play-to-own and play-to-win model where the gaming experience is the priority."
                className={["image", styles.image].join(" ")}
              />
            }
          >
            <Video muted />
          </Suspense>

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
                      <div className={styles.bulletText}>
                        Exclusive VIP amas
                      </div>
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
        {/* <div
          className={[
            styles.connectWalletContainer,
            curStep === 1 ? styles.step1 : "",
          ].join(" ")}
        > */}
        {/* <div className={styles.presaleWrap}></div> */}
        {/* <div className={styles.swdtknContainer}>
            <img
              src={images["home/presale.webp"]}
              alt="Swords of Blood"
              className={styles.presaleImage}
            />
            <p className={styles.swdtkn}>GET YOUR SWDTKN FROM</p>
          </div>
          <div className={styles.MEXC}>
            <a href="https://www.mexc.com/exchange/SWDTKN_USDT" target="_blank"> */}
        {/* <img
                src={images["MEXC.png"]}
                alt="MEXC"
                className={styles.mexcimg}
              /> */}
        {/* get your tokens */}
        {/* <p className="get_you"> here instead of mexc</p>
              
            </a>
          </div>
        </div> */}
      </div>
    </>
  );
}
