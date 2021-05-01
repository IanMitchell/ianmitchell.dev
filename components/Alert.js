import InfoIcon from "./icons/Info";

export default function Alert({ title, children }) {
  return (
    <aside className="alert">
      <div className="alert_icon">
        <InfoIcon />
      </div>
      <h4>{title}</h4>
      <div className="alert_content">{children}</div>
    </aside>
  );
}
