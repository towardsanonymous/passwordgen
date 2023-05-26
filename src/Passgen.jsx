import React, { useState,useEffect } from 'react';
import './index.css';

function Passgen() {
  const [isLowerCaseClicked, setIsLowerCaseClicked] = useState(false);
  const [isUpperCaseClicked, setIsUpperCaseClicked] = useState(false);
  const [isNumberClicked, setIsNumberClicked] = useState(false);
  const [isSymbolClicked, setIsSymbolClicked] = useState(false);
  const [meterCount, setMeterCount] = useState(1);

  const [meterValue, setMeterValue] = useState(0);
  const [meterText, setMeterText] = useState('Weak');
  const [meterColor, setMeterColor] = useState('#273549');
  const [meterOpacity, setMeterOpacity] = useState(0);

  let lowerCaseArr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
  let upperCaseArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  let numberArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  let symbolArr = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
  "/"]

  const [addLowerToMasterArr, setAddLowerToMasterArr] = useState(false);
  const [addUpperToMasterArr, setAddUpperToMasterArr] = useState(false);
  const [addNumberToMasterArr, setAddNumberToMasterArr] = useState(false);
  const [addSymbolToMasterArr, setAddSymbolToMasterArr] = useState(false);
  const [genText, setGenText] = useState(
    'Select at least one password property and set its length'
  );
  const [lengthCount, setLengthCount] = useState(8);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');




  const lowerCase=()=>{
    
    setIsLowerCaseClicked((prevState) => !prevState);
    setMeterCount((prevCount) => (prevCount + (isLowerCaseClicked? -3 : 3)));
    setAddLowerToMasterArr((prevState) => !prevState);


  }

  const upperCase=()=>{
    setIsUpperCaseClicked((prevState) => !prevState);
setMeterCount((prevCount) => (prevCount + (isUpperCaseClicked ? -3 : 3)));
setAddUpperToMasterArr((prevState) => !prevState);
    
  }
  const numberCase=()=>{
    setIsNumberClicked((prevState) => !prevState);
setMeterCount((prevCount) => (prevCount + (isNumberClicked ? -3 : 3)));
setAddNumberToMasterArr((prevState) => !prevState);


    
  }

  const symbolCase=()=>{

    setIsSymbolClicked((prevState) => !prevState);
    setMeterCount((prevCount) => (prevCount + (isSymbolClicked ? -4 : 4)));
    setAddSymbolToMasterArr((prevState) => !prevState);

    
  }


  const minusCalc=()=>{
    if (lengthCount > 9 && lengthCount < 16) {
      setLengthCount(lengthCount - 1);
      setMeterCount(meterCount - 1);

    } else if (lengthCount === 9) {

      setLengthCount(lengthCount - 1);
      setMeterCount(meterCount - 1);

    } else if (lengthCount === 16) {
      setLengthCount(lengthCount - 1);
      setMeterCount(meterCount - 1);

    } else {
      setLengthCount(8);
    }
    
  }

    const plusCalc = () => {
      if (lengthCount === 8) {
        setLengthCount((prevCount) => prevCount + 1);
        setMeterCount((prevCount) => prevCount + 1);
      } else if (lengthCount > 8 && lengthCount < 15) {
        setLengthCount((prevCount) => prevCount + 1);
        setMeterCount((prevCount) => prevCount + 1);
      } else if (lengthCount === 15) {
        setLengthCount((prevCount) => prevCount + 1);
        setMeterCount((prevCount) => prevCount + 1);
      } else {
        setLengthCount(16);
      }
    };
    
console.log(meterValue)
console.log(meterCount)

useEffect(() => {
  if (!isLowerCaseClicked && !isNumberClicked && !isSymbolClicked && !isUpperCaseClicked) {
    setMeterValue(0);
    setMeterText('Weak');
    setMeterOpacity(0);
    setGenText('Select at least one password property and set its length');
  } else if (meterCount >= 3 && meterCount <= 9) {
    setMeterValue(33);
    setMeterText('Weak');
    setMeterColor('#273549');
    setMeterOpacity(1);
  } else if (meterCount >= 10 && meterCount <= 13) {
    setMeterValue(66);
    setMeterText('Moderate');
    setMeterColor('#273549');
    setMeterOpacity(1);
  } else if (meterCount >= 14) {
    setMeterValue(100);
    setMeterText('Strong');
    setMeterColor('white');
    setMeterOpacity(1);
  }
}, [isLowerCaseClicked, isNumberClicked, isSymbolClicked, isUpperCaseClicked, meterCount]);

const getRandomPass = () => {
  let tempMasterArr = [];
  if (addLowerToMasterArr) {
    tempMasterArr.push(...lowerCaseArr);
  }
  if (addNumberToMasterArr) {
    tempMasterArr.push(...numberArr);
  }
  if (addSymbolToMasterArr) {
    tempMasterArr.push(...symbolArr);
  }
  if (addUpperToMasterArr) {
    tempMasterArr.push(...upperCaseArr);
  }
  passGen1(tempMasterArr);
  passGen2(tempMasterArr);
};

const passGen1 = (masterArr) => {
  let generatedPassword = '';
  for (let i = 0; i < lengthCount; i++) {
    generatedPassword +=
      masterArr[Math.floor(Math.random() * masterArr.length)];
  }
  setPassword1(generatedPassword);
};

const passGen2 = (masterArr) => {
  let generatedPassword = '';
  for (let i = 0; i < lengthCount; i++) {
    generatedPassword +=
      masterArr[Math.floor(Math.random() * masterArr.length)];
  }
  setPassword2(generatedPassword);
};

const generatePass = () => {
  if (
    !isLowerCaseClicked &&
    !isNumberClicked &&
    !isSymbolClicked &&
    !isUpperCaseClicked
  ) {
    window.alert('You need to select at least one property!');
    return;
  }
  getRandomPass();
  setGenText('Click the button to copy the password');
};

  const copyText1=()=>{
    navigator.clipboard.writeText(password1);
    setGenText('First password was copied');
    
  }
  const copyText2=()=>{
    navigator.clipboard.writeText(password2);
    setGenText('Second password was copied');
    
  }



  return (
    <div id="main">
      <div id="title">
        <h1>Generate a <span className="highlight">random password</span></h1>
        <p id="sub-title">Never use an insecure password again.</p>
      </div>
      <div id="settings">
        <p> Select password properties</p>
        <div className="strength-cont">
          <button className="strength-btn" id="lower-case-el" onClick={lowerCase} style={isLowerCaseClicked?{ "color":"white","outline":"2px solid #4ADF86"}:{"Color":"#4ADF86","outline":"none"}}>Lowercase letters</button>
          <button className="strength-btn" id="upper-case-el" onClick={upperCase} style={isUpperCaseClicked?{ "color":"white","outline":"2px solid #4ADF86"}:{"Color":"#4ADF86","outline":"none"}}>Uppercase letters</button>
          <button className="strength-btn" id="number-el" onClick={numberCase}style={isNumberClicked?{ "color":"white","outline":"2px solid #4ADF86"}:{"Color":"#4ADF86","outline":"none"}}>Numbers</button>
          <button className="strength-btn" id="symbol-el" onClick={symbolCase}style={isSymbolClicked?{ "color":"white","outline":"2px solid #4ADF86"}:{"Color":"#4ADF86","outline":"none"}}>Symbols</button>
        </div>
        <p >Set password length</p>
        <div id="length-cont">
          <button id="minus-btn" className="length-number" onClick={minusCalc}>-</button>
          <div id="length-text" className="length-number">{lengthCount}</div>
          <button id="plus-btn" className="length-number" onClick={plusCalc}>+</button>
        </div>

      </div>
      <p className='ps'>Password Strength</p>

      <div className="meter-cont">
          <meter id="meter" value={meterValue} min="0" max="100" low="35" high="75" optimum="100" ></meter>
            <div id="meter-text" style={{ color: meterColor, opacity: meterOpacity }}>{meterText}</div>
        
      </div>

      <div id="result">
        <button id="generate-btn" onClick={generatePass}>Generate Passwords</button>
        <p id="gen-text">{genText}</p>
        <div className="password-cont">
          <button id="pass-1" className="password-btn" onClick={copyText1}>{password1}</button>
          <button id="pass-2" className="password-btn" onClick={copyText2}>{password2}</button>
        </div>
      </div>
    </div>
  );
};

export default Passgen
