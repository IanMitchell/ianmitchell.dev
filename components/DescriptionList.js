import classnames from "classnames";
import { Fragment } from "react";

export function DescriptionList({ children }) {
  return <dl className="description-list">{children}</dl>;
}

export function DescriptionItem({
  href,
  icon,
  size,
  alt,
  title,
  badges,
  children,
}) {
  const classes = classnames("description-item", {
    "description-item_small": size === "small",
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
        <header className="description-item_header">
          <h4>{href ? <a href={href}>{title}</a> : title}</h4>
          {badges}
        </header>
        <p>{children}</p>
      </dd>
    </Fragment>
  );
}
