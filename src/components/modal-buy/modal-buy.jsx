import { useContext, useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Localization from "../../context/localization";
import { config } from "../../functions/config";
import mcwStyles from "../modal-connect-wallet/modal-connect-wallet.module.css";
import styles from "./modal-buy.module.css";
import GiftIco from '../../images/home/banner/SOB.png'
import './custom.css'
function format(num) {
  const result = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return result;
}
export default function ModalBuy({
  showModal,
  setShowModal,
  purchaseToken,
  presaleData,
  buyAction,
}) {
  const { strings } = useContext(Localization);
  const [selectedToken, setSelectedToken] = useState("ETH");
  const [buyAmount, setBuyAmount] = useState(3000);
  const [payAmount, setPayAmount] = useState(0);
  const [initialAmount, setinitialAmount] = useState(3000);
  const curBodyClasses = useRef(null);

  const updateSelectedToken = (val) => {
    // eslint-disable-next-line default-case
    switch (val) {
      case 4:
        setSelectedToken("ETH");
        break;
      case 0:
        setSelectedToken("USDT");
        break;
      case 1:
        setSelectedToken("USDC");
        break;
      case 2:
        setSelectedToken("BUSD");
        break;
      case 3:
        setSelectedToken("DAI");
        break;
    }
  };

  const updatePayAmount = (val) => {
    setPayAmount(
      parseFloat(val * 0.012).toLocaleString("en-US")
    );


  };

  const updateTokenAmount = (val) => {
    setinitialAmount(val)
    console.log(val);

    val = val.replace(/[^0-9]/g, "");
    setBuyAmount(val);

    // if (val > 4999 && val < 8000) {
    //   let newVal = (val / 100) * 5;
    //   let finalVal = parseInt(newVal) + parseInt(val)
    //   console.log("new", newVal);
    //   console.log("final", finalVal);
    //   console.log(val);
    //   setBuyAmount(finalVal)

    // }
    // else if (val > 7999 && val < 10000) {
    //   let newVal = (val / 100) * 10;
    //   let finalVal = parseInt(newVal) + parseInt(val)
    //   console.log("new", newVal);
    //   console.log("final", finalVal);
    //   console.log(val);
    //   setBuyAmount(finalVal)
    // }
    // else if (val > 9999 && val < 15000) {
    //   let newVal = (val / 100) * 15;
    //   let finalVal = parseInt(newVal) + parseInt(val)
    //   console.log("new", newVal);
    //   console.log("final", finalVal);
    //   console.log(val);
    //   setBuyAmount(finalVal)
    // }
    // else if (val > 14999 && val < 20000) {
    //   let newVal = (val / 100) * 20;
    //   let finalVal = parseInt(newVal) + parseInt(val)
    //   console.log("new", newVal);
    //   console.log("final", finalVal);
    //   console.log(val);
    //   setBuyAmount(finalVal)
    // }
    // else if (val > 19999) {
    //   let newVal = (val / 100) * 25;
    //   let finalVal = parseInt(newVal) + parseInt(val)
    //   console.log("new", newVal);
    //   console.log("final", finalVal);
    //   console.log(val);
    //   setBuyAmount(finalVal)
    // }
    // else {

    //   setBuyAmount(val)
    // }
  };

  useEffect(() => {
    updateSelectedToken(purchaseToken);
    updatePayAmount(buyAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseToken, buyAmount]);

  useEffect(() => {
    curBodyClasses.current = document.body.classList;
    if (Array.isArray(curBodyClasses.current))
      curBodyClasses.current = curBodyClasses.current.join(" ");
  }, []);

  const changeAmountHandler = (value) => {
    updateTokenAmount(value);
  };

  return ReactDOM.createPortal(
    <>
      {showModal && (
        <>
          <div className={mcwStyles.modalCont}>
            <div className={[mcwStyles.modal, styles.modal].join(" ")}>
              <div className={styles.modalContent}>
                <div className="flexz">
                  <p className={mcwStyles.modalClose}>
                    <FontAwesomeIcon
                      onClick={() => setShowModal(false)}
                      icon={faXmark}
                    />
                  </p>
                  <p className={styles.modalTitle}>
                    {strings.buyTokenWith} {selectedToken}
                  </p>
                  <p className={styles.modaltagline}>{strings.buyDesc}</p>
                  <div className={styles.inputContainer}>
                    <input
                      type="text"
                      value={format(buyAmount)}
                      className={styles.input}
                      onChange={(e) => updateTokenAmount(e.target.value)}
                    />
                    <p className={styles.token}>{config.tokenSymbol}</p>
                  </div>
                  <div className={styles.suggestionContainer}>
                    <span className={styles.suggestion}>
                      {strings.payTtl}: {payAmount} USDT
                    </span>
                    <span className={styles.suggestion}>
                      {strings.minimumTtl}: 3,000 {config.tokenSymbol}
                    </span>
                  </div>
                </div>
                {/* {purchaseToken < 4 && (
                  <div
                    className={[
                      styles.suggestionContainer,
                      styles.margTop,
                    ].join(" ")}
                  >
                    <span className={styles.suggestion}>
                      {strings.approveMessage}
                    </span>
                  </div>
                )} */}
                <div className="bg-cont">
                  <div className="gift-heads">
                    <div className="flex-ico">
                      <img src={GiftIco} alt="" /><span className="gift-txt">Choose bonuses</span>
                    </div>
                    <p className="sp-bonus">
                      *special bonus will be distributed to your wallet 30 days after the TGE
                    </p>
                  </div>
                  <div className={styles.tokensToBuyContainer}>
                    <button onClick={() => changeAmountHandler("20000")}>
                     20,000 SWDTKN
                    </button>
                    <button className=" rel-pos" onClick={() => changeAmountHandler("35000")}>
                      35,000 SWDTKN
                      <span className="float-num">
                        +5% bonus
                      </span>
                    </button>
                    <button className="md-top-sp rel-pos" onClick={() => changeAmountHandler("55000")}>
                      55,000 SWDTKN
                      <span className="float-num">
                        +10% bonus
                      </span>
                    </button>
                    <button className="top-sp rel-pos" onClick={() => changeAmountHandler("70000")}>
                      70,000 SWDTKN
                      <span className="float-num">
                        +15% bonus
                      </span>
                    </button>
                    <button className="top-sp rel-pos" onClick={() => changeAmountHandler("100000")}>
                      100,000 SWDTKN
                      <span className="float-num">
                        +20% bonus
                      </span>
                    </button>
                    <button className="top-sp rel-pos" onClick={() => changeAmountHandler("140000")}>
                      140,000 SWDTKN
                      <span className="float-num">
                        +25% bonus
                      </span>
                    </button>
                  </div>

                  <button
                    onClick={() => buyAction(buyAmount)}
                    className={styles.approveButton}
                  >
                    {strings.buyTtl}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Helmet
            bodyAttributes={{
              class: [curBodyClasses.current, mcwStyles.noScroll].join(" "),
            }}
          />
        </>
      )}
    </>,
    document.getElementById("root")
  );
}
