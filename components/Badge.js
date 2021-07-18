import classNames from "classnames";

export default function Badge({ className, children }) {
  const classes = classNames("badge", className);

  return <span className={classes}>{children}</span>;
}
