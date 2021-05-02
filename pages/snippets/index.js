import React from "react";
import Link from "next/link";
import Page from "../../layouts/Page";
import Social from "../../components/Social";

export default function Snippets() {
  return (
    <Page
      title="Snippets"
      className="snippets"
      breadcrumb={
        <Link href="/">
          <a>&larr; Home</a>
        </Link>
      }
    >
      <Social
        title="Ian Mitchell | Snippets"
        description="My collection of code snippets."
      />

      <p>Nothing to see here... yet 👀</p>
    </Page>
  );
}
