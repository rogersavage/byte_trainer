
import React, { useEffect, useState } from 'react';
import { 
  FaBackspace, 
  FaTrash, 
  FaPaperPlane,
  FaArrowRight
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {

  useEffect(() => {document.title = "Byte Trainer";},[]);
  const [inputValue, setInputValue] = useState('');
  const [randomValue, setRandomValue] = 
    useState(() => generateRandomValue("Hex"));
  const [alertMessage, setAlertMessage] = useState<string | null>
    ("Welcome to Byte Trainer!");
  const [alertStyle, setAlertStyle] = 
    useState('alert-primary');
  const [prefix, setPrefix] = useState('');
  const [mode, setMode] = useState("Hex");
  const [answerMode, setAnswerMode] = useState("Decimal");
  const [score, setScore] = useState(0);
  const aToF = ["d", "e", "f", "a", "b", "c"];
  const oneToNine = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];

  function generateRandomValue(mode: string) {
    const randomValue = Math.floor(Math.random() * 256);
    if(mode === "Hex")
    return randomValue.toString(16).padStart(2, '0').toUpperCase();
    else {
      return randomValue.toString(10);
    }
  }

  const handleButtonClick = (value: string) => {
    // Limit to 3 chars
    setInputValue(prev => (prev + value).substring(0, 3));
  };

  const handleBackspace = () => {
    setInputValue(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleSubmit = () => {
    let inputDecimal, randomDecimal;

    if (mode === "Hex") {
    inputDecimal = parseInt(inputValue, 10);
    randomDecimal = parseInt(randomValue, 16);
    } else {
      inputDecimal = parseInt(inputValue, 16);
      randomDecimal = parseInt(randomValue, 10);
    }

    if (inputDecimal === randomDecimal) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > 1) setAlertMessage(`Correct! (x${newScore})`);
        else setAlertMessage("Correct!");
      setAlertStyle("alert-success");
    } else {
      setScore(0);
      if (mode === "Hex") {
        setAlertMessage(`Incorrect! ${prefix}${randomValue} = ${randomDecimal}`);
      } else {
        const correctAnswer = 
          randomDecimal.toString(16).padStart(2, "0").toUpperCase();
        setAlertMessage(
          `Incorrect! ${randomValue} (base 10) = ${correctAnswer} (base 16)`);
      };
      setAlertStyle('alert-danger');
    }
    setInputValue('');
    setRandomValue(generateRandomValue(mode));
  };

  const handlePrefixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrefix(event.target.value);
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value);
    if(event.target.value === "Decimal"){
      setAnswerMode("Hex");
      setRandomValue(generateRandomValue("Decimal"));
    } else {
      setAnswerMode("Decimal");
      setRandomValue(generateRandomValue("Hex"));
    }
  };

  const getKeypad = () => {
    if(mode === "Decimal") return [...aToF, ...oneToNine];
    return [...oneToNine];
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="container text-white bg-dark p-3">
        <div className="mb-3 quiz-row align-items-center">
          <div className="">
            <label className="quiz-cell">{mode}: </label>
            {mode === "Hex" &&
            <label className="quiz-value">{prefix + randomValue}</label>}
            {mode === "Decimal" &&
              <label className="quiz-value">{randomValue}</label>}
          </div>
          <div className="spacer">
            <FaArrowRight />
          </div>
          <div className="">
            <label className="quiz-cell">{answerMode}:</label>
          </div>
          <div className="quiz-cell">
            <input 
              type="text" 
              className="form-control three-char-input" 
              value={inputValue}
            />
          </div>
        </div>
      <div className="row">
        {getKeypad().map(num => (
          <div key={num} className="col-4 p-1 container-btn">
            <button className="btn btn-secondary w-100"
              onClick={() => handleButtonClick(num.toString())}>
              {num}
            </button>
          </div>
        ))}
        <div className="col-12 p-1">
          <div className="row">
            <div className="col-3 p-1">
              <button className="btn btn-secondary w-100"
                onClick={() => handleButtonClick('0')}>
                0
              </button>
            </div>
            <div className="col-3 p-1">
              <button className="btn btn-warning w-100"
                onClick={handleBackspace}>
                <FaBackspace />
              </button>
            </div>
            <div className="col-3 p-1">
              <button className="btn btn-danger w-100"
                onClick={handleClear}>
                <FaTrash />
              </button>
            </div>
            <div className="col-3 p-1">
              <button className="btn btn-primary w-100"
                onClick={handleSubmit}>
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
      {alertMessage && (
        <div className={`alert ${alertStyle} mt-3`} role="alert">
          {alertMessage}
        </div>
      )}
      <div className="row">
        <div className="col-auto">
          <label>Prefix:</label>
        </div>
        <div className="col-auto">
          <div className="form-check form-check-inline">
            <input className="form-check0input" type="radio"
              name="prefixOptions" id="noPrefix" value="" 
              checked={prefix === ""} onChange={handlePrefixChange} />
            <label className="form-check-label" htmlFor="noPrefix">None</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio"
              name="prefixOptions" id="prefix0x" value="0x"
              checked={prefix === "0x"} onChange={handlePrefixChange} />
            <label className="form-check-label" htmlFor="prefix0x">0x</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio"
              name="prefixOptions" id="prefixDollar" value="$"
              checked={prefix === "$"} onChange={handlePrefixChange} />
            <label className="form-check-label" htmlFor="prefixDollar">$</label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-auto">
          <label>Mode:</label>
        </div>
        <div className="col-auto">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio"
              name="modeOptions" id="hexMode" value="Hex"
              checked={mode === "Hex"} onChange={handleModeChange} />
            <label className="form-check-label" htmlFor="hexMode">
              Hex</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio"
              name="modeOptions" id="decimalMode" value="Decimal"
              checked={mode === "Decimal"} onChange={handleModeChange} />
            <label className="form-check-label" htmlFor="decimalMode">
              Decimal</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default App;
