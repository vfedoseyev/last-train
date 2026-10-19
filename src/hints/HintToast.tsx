import { useEffect, useRef, useState } from "react";
import "./HintToast.css";

// Тайминги подобраны так, чтобы подсказку успели прочитать, но она не мешала
// дальше играть — появляется и гаснет сама, клик закрывает раньше срока.
const FADE_MS = 300;
const HOLD_MS = 3500;

type Phase = "in" | "visible" | "out";

interface HintToastProps {
  text: string;
  onClose: () => void;
}

export function HintToast({ text, onClose }: HintToastProps) {
  const [phase, setPhase] = useState<Phase>("in");
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const toVisible = window.setTimeout(() => setPhase("visible"), FADE_MS);
    const toOut = window.setTimeout(() => setPhase("out"), FADE_MS + HOLD_MS);
    const toClose = window.setTimeout(onClose, FADE_MS * 2 + HOLD_MS);
    timeoutsRef.current = [toVisible, toOut, toClose];
    return () => timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    onClose();
  };

  return (
    <div className={`hint-toast hint-toast--${phase}`} onClick={handleClick}>
      <span className="hint-toast__icon">💡</span>
      <span className="hint-toast__text">{text}</span>
    </div>
  );
}
