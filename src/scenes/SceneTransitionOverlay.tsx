import type { CSSProperties } from "react";
import { SCENE_TRANSITION_MS, useGame } from "../game/GameContext";
import "./SceneTransitionOverlay.css";

// Затемнение при уходе со сцены (фаза "out") и осветление при появлении на новой
// (фаза "in") — см. GameContext.tsx: любой CHANGE_SCENE проходит через эту фазу
// автоматически, компонент только отображает текущую.
export function SceneTransitionOverlay() {
  const { transitionPhase } = useGame();

  if (transitionPhase === "idle") return null;

  return (
    <div
      className={`scene-transition-overlay scene-transition-overlay--${transitionPhase}`}
      style={{ "--scene-transition-ms": `${SCENE_TRANSITION_MS}ms` } as CSSProperties}
    />
  );
}
