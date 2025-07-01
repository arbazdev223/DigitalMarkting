import { tagMap } from "./tagMap";



export function transformHTML(rawHTML) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHTML, "text/html");

  Object.entries(tagMap).forEach(([originalTag, { tag: newTag, className }]) => {
    const elements = doc.querySelectorAll(originalTag);
    elements.forEach((el) => {
      const newEl = document.createElement(newTag);
      newEl.innerHTML = el.innerHTML;
      if (className) newEl.className = className;
      for (const attr of el.attributes) {
        newEl.setAttribute(attr.name, attr.value);
      }

      el.replaceWith(newEl);
    });
  });

  return doc.body.innerHTML;
}
