export function measureTextHeight(text: string, width: number): number {
  // Create an element
  const ele = document.createElement("div");

  // Set styles
  ele.style.position = "absolute";
  ele.style.visibility = "hidden";
  ele.style.width = `${width}px`;
  ele.style.left = "-9999px";

  // Set font
  ele.style.fontFamily = "Quicksand";
  ele.style.fontSize = "1.25rem";
  ele.style.lineHeight = "1.3";
  ele.style.fontWeight = "500";

  // Set text
  ele.innerText = text;

  // Append to the body
  document.body.appendChild(ele);

  // Get the width
  const height = window.getComputedStyle(ele).height;

  // Remove the element
  document.body.removeChild(ele);

  return Number(height.replace("px", ""));
}
