import { useMemo, useState } from "react";
// @ts-ignore
import { createSketchbookDocument } from "./sketchbookDocument.js";

const VIEWPORT_STYLE =
  "<style>html,body{margin:0;overflow:hidden!important;overscroll-behavior:none}.page{position:fixed;inset:0;min-height:0;overflow:hidden}</style>";
const MOBILE_LOUPE_STYLE =
  "<style id=\"sketchbook-mobile-loupe\">@media(pointer:coarse){#sketchbook .loupe{display:block}#sketchbook .loupe .ring,#sketchbook .loupe .grip{touch-action:none}}</style>";
const DEFAULT_LOUPE_POSITION = "lx=b.x+b.w*0.88; ly=b.y+b.h*0.855;";
const BOUNDED_LOUPE_POSITION =
  "const r=loupeSize()/2; lx=Math.max(r,Math.min(b.w-r,b.x+b.w*0.88)); ly=Math.max(r,Math.min(b.h-r,b.y+b.h*0.855));";

export type SketchbookProps = {
  assetBaseUrl?: string;
  className?: string;
};

export function Sketchbook({
  assetBaseUrl = "/sketchbook/",
  className = "",
}: SketchbookProps) {
  const [ready, setReady] = useState(false);
  const documentSource = useMemo(() => {
    const source = createSketchbookDocument(assetBaseUrl);
    const withBoundedLoupe = source.replace(DEFAULT_LOUPE_POSITION, BOUNDED_LOUPE_POSITION);
    if (withBoundedLoupe === source) {
      throw new Error("Could not keep the sketchbook loupe within the book bounds.");
    }
    return withBoundedLoupe.replace(
      "</head>",
      `${VIEWPORT_STYLE}${MOBILE_LOUPE_STYLE}</head>`,
    );
  }, [assetBaseUrl]);

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