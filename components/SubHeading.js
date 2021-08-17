import React from "react";
import Hyperlink from "./icons/Hyperlink";
import slug from "../lib/slug";

function getText(node) {
  if (typeof node === "string") {
    return node;
  }

  if (typeof node === "number") {
    return node.toLocaleString();
  }

  if (React.isValidElement(node)) {
    return getText(node.props.children);
  }

  if (Array.isArray(node)) {
    return node.map((element) => getText(element)).join("");
  }
  return "";
}

export default function SubHeading({ children }) {
  const anchor = slug(getText(children));

  return (
    <h2 id={anchor} className="subheading">
      <a href={`#${anchor}`} className="subheading-anchor">
        <Hyperlink />
      </a>
      {children}
    </h2>
  );
}
