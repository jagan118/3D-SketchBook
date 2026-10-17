import { Sketchbook } from "./shaders/sketchbook/Sketchbook";
import "./shaders/threeui.css";

export default function App() {
  return (
    <div className="app-shell">
      <Sketchbook assetBaseUrl="/sketchbook/" />
    </div>
  );
}