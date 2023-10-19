import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABPQuvwRSTUVWXYZabcdefghijklmnCDEFGHIJKLMNOopqrstxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-=+_[]{}~";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    let shuffled = pass
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");
    setPassword(shuffled);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md  rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-center text-white my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 py-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 rounded-md"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClipBoard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="">length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((pre) => !pre);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((pre) => !pre);
              }}
            />
            <label htmlFor="charInput">CharAllowed</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
