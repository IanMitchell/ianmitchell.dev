import { useState } from 'react';

export default function CopyButton({ text, children }) {
  const [copied, setCopied] = useState(false);
  let copyTimer;

  const onCopyContent = () => {
    setCopied(true);
    copyTimer = window.setTimeout(() => setCopied(false), 500);
  };

  return (
    // <CopyToClipboard text={text} onCopy={onCopyContent}>
    <div className="copy-icon">
      {copied && (
        <div
          className="indicator"
          style={{ color: 'var(--list-bullet-color)' }}
        >
          Copied
        </div>
      )}
      {children}
    </div>
    // </CopyToClipboard>
  );
}
