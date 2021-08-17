import React from "react";

export default function PageTitle({ breadcrumb, children }) {
  return (
    <header className="page-title">
      {breadcrumb && <span className="breadcrumb">{breadcrumb}</span>}
      <h1>{children}</h1>
    </header>
  );
}
