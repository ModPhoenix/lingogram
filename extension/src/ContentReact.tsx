import { useLayoutEffect, useRef, useState } from "react";
import { Popover } from "./components";

export function TooltipForEachWordOnPage() {
  const [isOpen, setOpen] = useState(false);

  console.log("render TooltipForEachWordOnPage");

  const triggerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const textNodes: ChildNode[] = [];
    getTextNodes(body, textNodes);

    textNodes.forEach((node) => {
      const words = node.nodeValue?.split(/\s+/); // split by whitespace characters
      const span = document.createElement("span");
      words?.forEach((word, index) => {
        const wordSpan = document.createElement("span");
        wordSpan.textContent = word;
        // random add 3 colors to the word
        // yellow, red, with out color
        const color = [
          "rgba(255, 255, 128, .2)",
          "rgba(255, 128, 128, .2)",
          "",
        ];
        // wordSpan.style.backgroundColor = "rgba(255, 255, 128, .2)";
        wordSpan.style.backgroundColor = color[Math.floor(Math.random() * 3)];
        wordSpan.className = "tooltip";
        span.appendChild(wordSpan);

        // If it is not the last word, append a whitespace text node to maintain spaces
        if (index < words.length - 1) {
          span.appendChild(document.createTextNode(" "));
        }
      });

      node.parentNode?.replaceChild(span, node);
    });

    // Recursive function to get all text nodes in an element
    function getTextNodes(
      node: HTMLElement | ChildNode,
      textNodes: ChildNode[],
    ) {
      for (const child of node.childNodes) {
        if (child.nodeType === 3)
          // Text node
          textNodes.push(child);
        else if (child.nodeType === 1)
          // Element node
          getTextNodes(child, textNodes);
      }
    }

    // create event listener for page to show tooltip
    document.addEventListener("mouseover", (event) => {
      const target = event.target as HTMLElement;
      console.debug("target", target);
      if (target.className === "tooltip") {
        triggerRef.current = target;
        target.addEventListener("click", (e: MouseEvent | TouchEvent) => {
          e.preventDefault();
          setOpen((prev) => !prev);
        });
      }
    });
    return () => {
      console.log("TooltipExample useLayoutEffect cleanup");
      document.removeEventListener("mouseover", () => {
        console.log("removeEventListener");
      });
    };
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      <>
        <Popover triggerRef={triggerRef} isOpen={isOpen} onOpenChange={setOpen}>
          <div className="divide-y divide-white/5 rounded-xl bg-black/90 text-sm/6 [--anchor-gap:var(--spacing-5)]">
            <div className="p-3">
              <a
                className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                href="#"
              >
                <p className="font-semibold text-white">Insights</p>
                <p className="text-white/50">Measure actions your users take</p>
              </a>
              <a
                className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                href="#"
              >
                <p className="font-semibold text-white">Automations</p>
                <p className="text-white/50">
                  Create your own targeted content
                </p>
              </a>
              <a
                className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                href="#"
              >
                <p className="font-semibold text-white">Reports</p>
                <p className="text-white/50">Keep track of your growth</p>
              </a>
            </div>
            <div className="p-3">
              <a
                className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                href="#"
              >
                <p className="font-semibold text-white">Documentation</p>
                <p className="text-white/50">
                  Start integrating products and tools
                </p>
              </a>
            </div>
          </div>
        </Popover>
      </>
    </div>
  );
}
