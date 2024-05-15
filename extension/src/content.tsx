import ReactDOM from "react-dom/client";
import "./output.css";
import { TooltipForEachWordOnPage } from "./ContentReact";

console.log("content script");

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <>
    <TooltipForEachWordOnPage />
  </>,
);
