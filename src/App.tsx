import { Sketchbook } from "./shaders/sketchbook/Sketchbook";
import "./shaders/threeui.css";

export default function App() {
  // Uses full live URL in the browser (e.g. https://your-site.vercel.app/sketchbook/)
  const assetBase =
    typeof window !== "undefined"
      ? `${window.location.origin}/sketchbook/`
      : "/sketchbook/";

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Sketchbook assetBaseUrl={assetBase} />
    </div>
  );
}