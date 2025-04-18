import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import { generate } from "random-words";
import linkIcon from "./assets/external-link-line.svg";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [length, setLength] = useState(8);
  const [wordCount, setWordCount] = useState(1);
  const [numberFlag, setNumberFlag] = useState(false);
  const [characterFlag, setCharacterFlag] = useState(false);
  const [memorablePasswordFlag, setMemorablePasswordrFlag] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const notify = () => toast.success("Password copied to clipboard!");

  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialCharacters = "@#$%&*_+-";

    if (memorablePasswordFlag) {
      for (let i = 1; i <= wordCount; i++) {
        let randomWord = generate({ minLength: 3, maxLength: 6 });
        randomWord = randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
        generatedPassword += randomWord;
        if (characterFlag) {
          generatedPassword +=
            specialCharacters[
              Math.floor(Math.random() * specialCharacters.length)
            ];
        }
        if (numberFlag) {
          generatedPassword +=
            numbers[Math.floor(Math.random() * numbers.length)];
        }
      }
      setPassword(generatedPassword);
      setCopyBtnText("Copy");
    } else {
      if (numberFlag) {
        characters += numbers;
      }
      if (characterFlag) {
        characters += specialCharacters;
      }

      for (let i = 1; i <= length; i++) {
        let index = Math.floor(Math.random() * characters.length);
        generatedPassword += characters[index];
      }
      setPassword(generatedPassword);
    }
  }, [
    length,
    wordCount,
    numberFlag,
    characterFlag,
    memorablePasswordFlag,
    setPassword,
  ]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
    notify();
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [
    length,
    wordCount,
    numberFlag,
    characterFlag,
    memorablePasswordFlag,
    passwordGenerator,
  ]);

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col justify-center items-center select-none">
      <ToastContainer />
      <div className="mb-5">
        <h1 className="text-emerald-500 text-3xl font-sans italic">
          Password{" "}
          <span className="text-white comic-neue-regular-italic">Crafter</span>
        </h1>
      </div>
      <div className="bg-[#171717] p-6 w-[90%] md:w-[30%] rounded-lg flex flex-col justify-center items-center">
        <div className="mt-2 flex items-center w-[95%]">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="border-2 border-r-0 border-white focus:outline-none px-3 py-1.5 w-full rounded-l"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="px-3 py-1.5 border-2 border-emerald-400 bg-emerald-400 active:bg-emerald-500 active:border-emerald-500 rounded-r text-black font-semibold cursor-pointer"
          >
            Copy
          </button>
        </div>
        <div className="px-3.5 mt-4 flex flex-col gap-1 w-[95%]">
          <div
            className={` ${
              memorablePasswordFlag ? "hidden" : "block"
            } flex items-center gap-1.5`}
          >
            <input
              type="range"
              min="8"
              max="20"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="accent-emerald-500 cursor-pointer"
            />
            <h3>Length : {length}</h3>
          </div>
          <div
            className={` ${
              memorablePasswordFlag ? "block" : "hidden"
            } flex items-center gap-1.5`}
          >
            <input
              type="range"
              min="1"
              max="4"
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
              className="accent-emerald-500 cursor-pointer"
            />
            <h3>Words : {wordCount}</h3>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              defaultChecked={numberFlag}
              onChange={() => setNumberFlag(!numberFlag)}
              id="number"
              className="accent-emerald-500 cursor-pointer"
            />
            <label htmlFor="number" className="cursor-pointer">
              Number
            </label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              defaultChecked={characterFlag}
              onChange={() => setCharacterFlag(!characterFlag)}
              id="character"
              className="accent-emerald-500 cursor-pointer"
            />
            <label htmlFor="character" className="cursor-pointer">
              Special Character
            </label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              defaultChecked={memorablePasswordFlag}
              onChange={() => setMemorablePasswordrFlag(!memorablePasswordFlag)}
              id="memorable"
              className="accent-emerald-500 cursor-pointer"
            />
            <label htmlFor="memorable" className="cursor-pointer">
              Memorable Password
            </label>
          </div>
        </div>
        <div className="mt-3 mb-1">
          <button
            onClick={passwordGenerator}
            className=" cursor-pointer px-3 py-1.5 bg-emerald-500 active:bg-emerald-600 rounded-lg text-black font-semibold"
          >
            Regenerate
          </button>
        </div>
      </div>
      <h2 className="mt-4 text-sm">
        Made With ❤️ by{" "}
        <a
          href="https://souravghosh.me"
          target="_blank"
          className="text-emerald-400"
        >
          {" "}
          Sourav <img src={linkIcon} className="w-3 pb-0.5 inline-block" />{" "}
        </a>
      </h2>
    </div>
  );
};

export default App;
