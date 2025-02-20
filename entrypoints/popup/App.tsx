import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./App.css";
import "../tailwind.css";
import { PublicPath } from "wxt/browser";

function App() {
  const [count, setCount] = useState(0);
  async function openSPA() {
    await browser.tabs.create({
      url: browser.runtime.getURL("/spa.html" as PublicPath),
      active: true,
    });
  }

  return (
    <>
      <div>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p>
      <button onClick={openSPA}>Open SPA</button>
    </>
  );
}

export default App;
