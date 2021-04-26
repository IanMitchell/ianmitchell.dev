import classnames from 'classnames';
import { Fragment } from 'react';

export function DescriptionList({ children }) {
  return <dl className="description-list">{children}</dl>;
}

export function DescriptionItem({ icon, size, alt, title, children }) {
  const classes = classnames('description-item', {
    'description-item_small': size === 'small',
  });

  return (
    <Fragment>
      <dt className={classes}>
        <div className="description-item_icon">
          <img alt={alt} src={icon} />
        </div>
        <div className="description-item_blur">
          <img src={icon} aria-hidden="true" />
        </div>
      </dt>
      <dd>
        <h4>{title}</h4>
        <p>{children}</p>
      </dd>
    </Fragment>
  );
}
