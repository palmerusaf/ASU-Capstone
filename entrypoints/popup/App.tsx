import { PublicPath } from "wxt/browser";
import "../tailwind.css";
import "./App.css";

function App() {
    async function openSPA() {
        await browser.tabs.create({
            url: browser.runtime.getURL("/spa.html" as PublicPath),
            active: true,
        });
    }

    function saveJob() {
        console.log("Test");
    };

    return (
        <>
            <h1>Job Sourcerer</h1>
            <div className="card">
                <button onClick={saveJob}>
                    Save Job
                </button>
            </div>
            <button onClick={openSPA}>Dashboard</button>
        </>
    );
}

export default App;
