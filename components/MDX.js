import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MDXProvider } from "@mdx-js/react";
import SubHeading from "./SubHeading";
import Code from "./mdx/Code";
import CodePen from "./CodePen";
import Alert from "./Alert";
import DiscordInvite from "./DiscordInvite";
import Confetti from "./Confetti";

export const COMPONENTS = {
  CodePen,
  Link,
  Image,
  Alert,
  DiscordInvite,
  Confetti,
};

export default function MDX({ children }) {
  // https://mdxjs.com/advanced/components#mdxprovider
  const [components, setComponents] = useState({
    h2: SubHeading,
    code: Code,
    inlineCode: (props) => <code className="inline-code" {...props} />,
  });

  return <MDXProvider components={components}>{children}</MDXProvider>;
}
