import React, { useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import SubHeading from './SubHeading';

export default function MDX({ children }) {
  // https://mdxjs.com/advanced/components#mdxprovider
  const [components, setComponents] = useState({
    h2: SubHeading,
  });

  return <MDXProvider components={components}>{children}</MDXProvider>;
}
