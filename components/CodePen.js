export default function CodePen({ title, id }) {
  return (
    <iframe
      height="265"
      scrolling="no"
      title={title}
      src={`//codepen.io/IanMitchell/embed/${id}/?height=265&theme-id=0&default-tab=css,result&embed-version=2`}
      frameBorder="no"
      allowtransparency="true"
      allowFullScreen
      width="100%"
    >
      See the Pen{" "}
      <a href={`https://codepen.io/IanMitchell/pen/${id}/`}>{title}</a> by Ian
      Mitchell (<a href="https://codepen.io/IanMitchell">@IanMitchell</a>) on{" "}
      <a href="https://codepen.io">CodePen</a>.
    </iframe>
  );
}
