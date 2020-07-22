import React from 'react';
import Blog from './posts/Blog';
import Link from './posts/Link';

export default function Post({ layout = 'blog', ...props }) {
  switch (layout.toLowerCase()) {
    case 'link':
      return <Link {...props} />;
    case 'blog':
    default:
      return <Blog {...props} />;
  }
}
