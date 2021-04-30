import React from "react";
import Blog from "./posts/Blog";
import LinkPost from "./posts/LinkPost";

export default function Post({ layout = "blog", ...props }) {
  switch (layout.toLowerCase()) {
    case "link":
      return <LinkPost {...props} />;
    case "blog":
    default:
      return <Blog {...props} />;
  }
}
