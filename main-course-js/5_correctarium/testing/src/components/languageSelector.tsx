import { useState } from "react";
import "./selector.css";

interface Props {
  language: string;
  setLanguage: (value: string) => void;
}

export default function Main({ language, setLanguage }: Props) {
  const defaultOption = "Мова";
  const [isOpen, setOpen] = useState(false);

  const onItemClick = (languageSelected: string) => {
    setLanguage(languageSelected);
    setOpen(false);
  };
  return (
    <div>
      <div className="selectorLanguage">
        <div
          className={`input ${language !== defaultOption ? "openedInput" : ""}`}
          onClick={() => setOpen(!isOpen)}
        >
          {language}
        </div>
        <div className="selectContent">
          <ul className={isOpen ? "open" : "closed"}>
            <li onClick={() => onItemClick("Українська")}>Українська</li>
            <li onClick={() => onItemClick("Російська")}>Російська</li>
            <li onClick={() => onItemClick("Англійська")}>Англійська</li>
            <li onClick={() => onItemClick("Англійська(носій)")}>
              Англійська(носій)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
