import React from 'react';
import classnames from 'classnames';
import TagList from './TagList';

export default function Meta({ date, tags, className }) {
  const classes = classnames('meta', className);

  return (
    <div className={classes}>
      <time>
        {date.toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'UTC',
        })}
      </time>
      <TagList tags={tags} />
    </div>
  );
}
