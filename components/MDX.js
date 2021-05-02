import React, { useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import SubHeading from './SubHeading';
import Code from './mdx/Code';

export default function MDX({ children }) {
  // https://mdxjs.com/advanced/components#mdxprovider
  const [components, setComponents] = useState({
    h2: SubHeading,
    code: Code,
    inlineCode: (props) => <code className="inline-code" {...props} />,
  });

  return <MDXProvider components={components}>{children}</MDXProvider>;
}
