console.log("content script");

const body = document.getElementsByTagName("body")[0];
console.log("body", body);
const textNodes: ChildNode[] = [];
getTextNodes(body, textNodes);

textNodes.forEach((node) => {
  const words = node.nodeValue?.split(/\s+/); // split by whitespace characters
  const span = document.createElement("span");
  words?.forEach((word, index) => {
    const wordSpan = document.createElement("span");
    wordSpan.textContent = word;
    wordSpan.style.backgroundColor = "yellow"; // Highlighting word with yellow background.
    span.appendChild(wordSpan);

    // If it is not the last word, append a whitespace text node to maintain spaces
    if (index < words.length - 1) {
      span.appendChild(document.createTextNode(" "));
    }
  });
  node.parentNode?.replaceChild(span, node);
});

// Recursive function to get all text nodes in an element
function getTextNodes(node: HTMLElement | ChildNode, textNodes: ChildNode[]) {
  for (const child of node.childNodes) {
    if (child.nodeType === 3)
      // Text node
      textNodes.push(child);
    else if (child.nodeType === 1)
      // Element node
      getTextNodes(child, textNodes);
  }
}
