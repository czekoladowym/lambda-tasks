import { useState, useEffect } from "react";
import "./styles/main.css";
import "./styles/normalize.css";
import Selector from "./components/selector";
import LangSelector from "./components/languageSelector";
import { getCurrentPrice } from "./utils/getCurrentPrice";
import { calculateHours } from "./utils/calculateHours";
import { dateCalculation } from "./utils/dateCalculation";

function App() {
  const [text, setText] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [language, setLanguage] = useState<string>("Мова");
  const [price, setPrice] = useState<string>("0");
  const [time, setTime] = useState<number>(0);
  const doctype =
    ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, .rtf, .txt, .pdf, .zip";

  const prettifyTime = (milliSecTime: number) => {
    let timeHours = milliSecTime / 1000 / 60 / 60;
    timeHours = Math.ceil(timeHours);
    if (timeHours === 1) {
      return "Здамо за: одну годину";
    } else if (timeHours === 2) {
      return "Здамо за: дві години";
    } else if (timeHours === 3) {
      return "Здамо за: три години";
    }
    const startDate = new Date();
    const currentTime = startDate.getTime();
    return "Термін здавання: " + dateCalculation(currentTime, milliSecTime);
  };
  useEffect(() => {
    const milliSecTime = calculateHours(text.length, language);
    // const timeHours = milliSecTime / 1000 / 60 / 60;
    setTime(milliSecTime);
  }, [text, language]);

  useEffect(() => {
    const currentPrice = getCurrentPrice(text.length, language);
    const priceArray = currentPrice.toFixed(2).split(".");
    let finalPrice;
    if (priceArray[1] === "00") {
      finalPrice = priceArray[0];
    } else {
      finalPrice = priceArray.join(".");
    }
    setPrice(finalPrice);
  }, [text, language]);
  // =======================================================
  return (
    <div className="App">
      <main>
        <div className="makeOrder">
          <div className="makeOrderInputs">
            <h1 className="heroTitle">Замовити переклад або редагування</h1>
            <div className="selectorDropDown">
              <Selector />
              <img
                src="/img/arrow_down.svg"
                alt="arrowDown"
                className="svgArrow"
              />
            </div>
            <div className="area">
              <textarea
                id="needToSubmit"
                className="area_text"
                placeholder="Введіть текст або"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              ></textarea>
              <div className="area_upload">
                <input className="input" type="file" accept={doctype} />
                <span
                  id="uploader"
                  className={text.length === 0 ? "uploadFor" : "hidden"}
                >
                  завантажте файл
                </span>
              </div>
            </div>
            <div className="inputsField">
              <input
                id="needToSubmit"
                type="email"
                className="defaultInput"
                placeholder="Ваша електрона пошта"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                id="needToSubmit"
                type="username"
                className="defaultInput"
                placeholder="Ваше ім’я"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                id="needToSubmit"
                type="comments"
                className="defaultInput"
                placeholder="Коментар або покликання"
              />
              <div className="selectorDropDown">
                <LangSelector language={language} setLanguage={setLanguage} />
                <img
                  src="/img/arrow_down.svg"
                  alt="arrowDown"
                  className="svgArrow"
                />
              </div>
            </div>
          </div>
          {/* ======================================================================= */}
          <div className="makeOrderSubmit">
            <div className="submitContent">
              <div className="contentPrice">
                <div className="priceNum">{price}</div>
                <div className="currency">грн</div>
              </div>
              <div className="time">
                {text.length > 0 && language !== "Мова" && prettifyTime(time)}
              </div>
              <button
                disabled={text === "" || username === "" || email === ""}
                id="submit"
                className="submitBtn"
              >
                Замовити
              </button>
            </div>
            <div className="closeBtn"></div>
          </div>
        </div>
      </main>
      {/* =============================================================================== */}
      <footer className="footer">
        <div className="rights">
          <a className="rightLinks" href="#">
            Договір публічної оферти
          </a>
          <p className="rightAttributes">© Correctarium</p>
          <p className="rightAttributes">2015–2022</p>
        </div>
        <img src="/img/footer_logo.png" alt="logo" className="logo" />
        <div className="contactUs">
          <p className="contact">Надіслати текст на переклад:</p>
          <a className="contactLink" href="#">
            manager@correctarium.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
