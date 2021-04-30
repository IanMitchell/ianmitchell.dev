export function PullQuote({ children, cite }) {
  return (
    <blockquote className="pullquote">
      {children}
      <cite>{cite}</cite>
    </blockquote>
  );
}
