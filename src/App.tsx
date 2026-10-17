import { Sketchbook } from "./shaders/sketchbook/Sketchbook";
import "./shaders/threeui.css";

export default function App() {
  // Uses full live URL in the browser (e.g. https://your-site.vercel.app/sketchbook/)
  const assetBase =
    typeof window !== "undefined"
      ? `${window.location.origin}/sketchbook/`
      : "/sketchbook/";

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <h1>Singapore Sketchbook</h1>
        <p>Made with Love by Jagan “Jackk”</p>
      </header>
      <Sketchbook
        className="app-shell__sketchbook"
        assetBaseUrl={assetBase}
      />
    </div>
  );
}