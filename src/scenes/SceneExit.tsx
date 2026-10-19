import type { SceneExit as SceneExitDefinition } from "./sceneTypes";
import { useGame } from "../game/GameContext";
import { evaluateConditions } from "../utils/conditions";

interface SceneExitProps {
  exit: SceneExitDefinition;
  onInspect: (text: string) => void;
  showLabel: boolean;
}

export function SceneExit({ exit, onInspect, showLabel }: SceneExitProps) {
  const { state, dispatch } = useGame();

  const unlocked = evaluateConditions(exit.conditions, state);

  const handleClick = () => {
    // Пока идёт диалог или открыта головоломка, переходы между сценами
    // заблокированы (см. CLAUDE_CODE_PROMPT.md §17.1).
    if (state.dialogueState || state.activePuzzleId) return;

    if (unlocked) {
      dispatch({ type: "CHANGE_SCENE", sceneId: exit.targetSceneId });
      return;
    }
    if (exit.lockedMessage) {
      onInspect(exit.lockedMessage);
    }
  };

  return (
    <button
      type="button"
      className={`hotspot hotspot--exit ${unlocked ? "hotspot--available" : "hotspot--locked"} ${
        showLabel ? "hotspot--outlined" : ""
      }`}
      style={{
        left: `${exit.x}%`,
        top: `${exit.y}%`,
        width: `${exit.width}%`,
        height: `${exit.height}%`,
      }}
      onClick={handleClick}
      aria-label={exit.label ?? exit.id}
    >
      {showLabel && <span className="hotspot__label">→ {exit.label ?? exit.id}</span>}
    </button>
  );
}
