import { useEffect, useState } from "react";
import type { ItemId } from "../inventory/inventoryTypes";
import { useGame } from "../game/GameContext";
import { executeEffects } from "../game/effectExecutor";
import { scenes } from "./sceneRegistry";
import { Scene } from "./Scene";

interface SceneRendererProps {
  selectedItemId: ItemId | null;
  onItemUsed: () => void;
}

export function SceneRenderer({ selectedItemId, onItemUsed }: SceneRendererProps) {
  const { state, dispatch } = useGame();
  const [inspectText, setInspectText] = useState<string | null>(null);

  const scene = scenes[state.currentSceneId];

  // Идемпотентные эффекты входа на сцену (например, garageUnlocked) — безопасно
  // повторяются при каждом визите и при двойном вызове эффекта в StrictMode.
  useEffect(() => {
    if (scene?.onEnter) {
      executeEffects(scene.onEnter, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentSceneId]);

  // Текст осмотра раньше ничем не сбрасывался, кроме клика по самому сообщению —
  // переход на другую сцену или начало диалога/головоломки оставляли его висеть
  // поверх (а после закрытия диалога — снова видимым поверх уже неактуального).
  useEffect(() => {
    setInspectText(null);
  }, [state.currentSceneId]);

  useEffect(() => {
    if (state.dialogueState || state.activePuzzleId) {
      setInspectText(null);
    }
  }, [state.dialogueState, state.activePuzzleId]);

  if (!scene) {
    return (
      <div className="scene-renderer">
        <div className="scene scene--error">
          Сцена «{state.currentSceneId}» пока не реализована.
        </div>
      </div>
    );
  }

  return (
    <div className="scene-renderer">
      <Scene
        scene={scene}
        onInspect={(text) => {
          setInspectText(text);
        }}
        selectedItemId={selectedItemId}
        onItemUsed={onItemUsed}
      />
      {inspectText && (
        <div
          className="scene-renderer__inspect-text"
          onClick={() => setInspectText(null)}
        >
          {inspectText}
        </div>
      )}
    </div>
  );
}
