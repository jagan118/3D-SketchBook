import { useMemo, useState } from "react";
// @ts-ignore
import { createSketchbookDocument } from "./sketchbookDocument.js";

const VIEWPORT_STYLE =
  "<style>html,body{margin:0;overflow:hidden!important;overscroll-behavior:none}.page{position:fixed;inset:0;min-height:0;overflow:hidden}</style>";

export type SketchbookProps = {
  assetBaseUrl?: string;
  className?: string;
};

export function Sketchbook({
  assetBaseUrl = "/sketchbook/",
  className = "",
}: SketchbookProps) {
  const [ready, setReady] = useState(false);
  const documentSource = useMemo(
    () => createSketchbookDocument(assetBaseUrl).replace("</head>", `${VIEWPORT_STYLE}</head>`),
    [assetBaseUrl],
  );

  return (
    <div className={`sketchbook${className ? ` ${className}` : ""}`} data-state={ready ? "ready" : "loading"}>
      <iframe
        className={`sketchbook__frame${ready ? " is-ready" : ""}`}
        title="Interactive Singapore sketchbook"
        srcDoc={documentSource}
        sandbox="allow-scripts"
        loading="eager"
        onLoad={() => setReady(true)}
      />
    </div>
  );
}