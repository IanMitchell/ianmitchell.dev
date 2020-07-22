import React from 'react';
import Blog from './entries/Blog';
import Link from './entries/Link';

export default function Entry({ layout = 'blog', ...props }) {
  switch (layout.toLowerCase()) {
    case 'link':
      return <Link {...props} />;
    case 'blog':
    default:
      return <Blog {...props} />;
  }
}
