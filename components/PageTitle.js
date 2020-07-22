import React from 'react';
import Link from 'next/link';

export default function PageTitle({ breadcrumb, children }) {
  return (
    <header className="page-title">
      {breadcrumb && <span className="breadcrumb">{breadcrumb}</span>}
      <h1>{children}</h1>
    </header>
  );
}
