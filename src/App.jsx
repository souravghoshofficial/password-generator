import React from "react";
import { useState , useCallback , useEffect , useRef } from "react";
import linkIcon from "./assets/external-link-line.svg";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberFlag, setNumberFlag] = useState(false);
  const [characterFlag, setCharacterFlag] = useState(false);
  const [password, setPassword] = useState("");
  const [copyBtnText, setCopyBtnText] = useState("Copy");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() =>{
    let generatedPassword = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialCharacters = "!@#$%^&*()_+";
    if(numberFlag){
      characters += numbers;
    }
    if(characterFlag){
      characters += specialCharacters;
    }

    for(let i = 1; i <= length; i++){
      let index = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[index];
    }
    setPassword(generatedPassword);
    setCopyBtnText("Copy");

  },[length, numberFlag, characterFlag, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
    setCopyBtnText("Copied!");
  } ,[password]);

  useEffect(() => { 
    passwordGenerator();
  },[length, numberFlag, characterFlag, passwordGenerator]);


  return (
    <div className="w-full h-screen bg-black text-white flex flex-col justify-center items-center">
      <div className="bg-[#171717] p-5 rounded-lg flex flex-col justify-center items-center">
        <div className=" mt-1 mb-4">
          <h1 className="text-emerald-500 text-2xl font-bold font-sans italic">Password Generator</h1>
        </div>
        <div className="flex items-center w-[95%]">
          <input 
          type="text" 
          value={password} 
          ref={passwordRef}
          readOnly 
          className="border-2 border-r-0 border-white focus:outline-none px-3 py-1.5 w-full rounded-l"
          />
          <button onClick={copyPasswordToClipboard} className="px-3 py-1.5 border-2 border-emerald-400 bg-emerald-400 active:bg-emerald-500 active:border-emerald-500 rounded-r text-black font-semibold cursor-pointer">{copyBtnText}</button>
        </div>
        <div className="mt-4 flex flex-col lg:flex-row md:flex-row lg:items-center md:items-center gap-2 lg:gap-4 md:gap-4">
          <div className="flex items-center gap-1">
            <input 
            type="range" 
            min="8" max="20" 
            value={length} 
            onChange={(e) => setLength(e.target.value)}
            className="accent-emerald-500 cursor-pointer"
            />
            <h3>Length : {length}</h3>
          </div>
          <div className="flex items-center gap-1">
            <input 
            type="checkbox" 
            defaultChecked={numberFlag}
            onChange={() => setNumberFlag(!numberFlag)}
            id="number"  
            className="accent-emerald-500 cursor-pointer"
            />
            <label htmlFor="number" className="cursor-pointer">Number</label>
          </div>
          <div className="flex items-center gap-1">
            <input 
            type="checkbox" 
            defaultChecked={characterFlag} 
            onChange={() => setCharacterFlag(!characterFlag)}
            id="character" 
            className="accent-emerald-500 cursor-pointer" 
            />
            <label htmlFor="character" className="cursor-pointer">Special Character</label>
          </div>
        </div>
      </div>
      <h2 className="mt-4 text-sm">
        Made With ❤️ by <a href="https://www.linkedin.com/in/souravghosh121" className="text-emerald-400"> Sourav <img src={linkIcon} className="w-3 pb-0.5 inline-block" /> </a>
      </h2>
    </div>
  );
};

export default App;
