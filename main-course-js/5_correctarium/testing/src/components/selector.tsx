import { useState } from "react";
import "./selector.css";

function Main() {
  const defaultOption = "Послуга";
  const [isOpen, setOpen] = useState(false);
  const [option, setOption] = useState(defaultOption);

  const onItemClick = (option: any) => {
    setOption(option);
    setOpen(false);
  };
  return (
    <div>
      <div className="selector">
        <div
          className={`input ${option !== defaultOption ? "openedInput" : ""}`}
          onClick={() => setOpen(!isOpen)}
        >
          {option}
        </div>
        <div className={`selectContent ${isOpen ? "open" : "closed"}`}>
          <ul>
            <li onClick={() => onItemClick("Редагування")}>Редагування</li>
            <li onClick={() => onItemClick("Переклад")}>Переклад</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <Main />;
}
