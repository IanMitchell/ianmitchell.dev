import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";

export default function Confetti({
  count = 50,
  velocity = 45,
  spread = 45,
  children,
}) {
  const ref = useRef();

  useEffect(() => {
    const center = {
      x:
        (ref.current?.firstChild?.offsetLeft ?? 0) +
        (ref.current?.firstChild?.offsetWidth ?? 0) / 2,
      y: ref.current?.firstChild?.offsetTop ?? 0,
    };

    confetti({
      disableForReducedMotion: true,
      particleCount: count,
      startVelocity: velocity,
      spread,
      origin: {
        x: center.x / window.innerWidth,
        y: center.y / window.innerHeight,
      },
    });
  }, [count, spread, velocity]);

  return (
    <div ref={ref} className="confetti">
      {children}
    </div>
  );
}
