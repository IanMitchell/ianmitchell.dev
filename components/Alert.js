import classNames from "classnames";
import InfoIcon from "./icons/Info";

export default function Alert({ title, type = "info", children }) {
  const classes = classNames("alert", {
    alert_info: type === "info",
  });

  return (
    <aside className={classes}>
      <div className="alert_icon">
        <InfoIcon />
      </div>
      <h4>{title}</h4>
      <div className="alert_content">{children}</div>
    </aside>
  );
}
