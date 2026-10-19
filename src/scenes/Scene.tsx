import { useEffect, useState } from "react";
import type { SceneDefinition } from "./sceneTypes";
import type { ItemId } from "../inventory/inventoryTypes";
import { useGame } from "../game/GameContext";
import { Hotspot } from "../interaction/Hotspot";
import { SceneExit } from "./SceneExit";
import { resolveDialogue } from "../dialogue/resolveDialogue";
import "./Scene.css";

interface SceneProps {
  scene: SceneDefinition;
  onInspect: (text: string) => void;
  selectedItemId: ItemId | null;
  onItemUsed: () => void;
}

export function Scene({ scene, onInspect, selectedItemId, onItemUsed }: SceneProps) {
  const { state } = useGame();
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  // Пока у сцены нет настоящего фона — показываем рамки и подписи хотспотов,
  // чтобы не играть в pixel hunting вслепую. Как только background перестанет
  // быть "placeholder", подписи сами перестанут показываться (см. §35 промпта).
  const isPlaceholder = scene.background === "placeholder";

  // Затемняем сцену только если диалог реально можно показать (см. resolveDialogue) —
  // а не просто по формальному признаку "dialogueState не пуст", чтобы битое/устаревшее
  // состояние не темнило сцену навсегда без видимого диалогового окна.
  const dialogueActive = resolveDialogue(state.dialogueState) !== null;
  const puzzleActive = state.activePuzzleId !== null;
  // Головоломка тоже темнит сцену (фокус на самой головоломке), но не подсвечивает
  // конкретный хотспот — спотлайт остаётся только для диалогов.
  const overlayActive = dialogueActive || puzzleActive;

  // Сбрасываем "спотлайт", когда меняется сцена или закрывается диалог.
  useEffect(() => {
    setActiveHotspotId(null);
  }, [scene.id]);

  useEffect(() => {
    if (!dialogueActive) setActiveHotspotId(null);
  }, [dialogueActive]);

  return (
    <div className="scene">
      {isPlaceholder ? (
        <div className="scene__background--placeholder">{scene.name}</div>
      ) : (
        <img className="scene__background" src={scene.background} alt="" />
      )}
      {scene.hotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          hotspot={hotspot}
          onInspect={onInspect}
          selectedItemId={selectedItemId}
          onItemUsed={onItemUsed}
          onActivate={setActiveHotspotId}
          spotlight={dialogueActive && activeHotspotId === hotspot.id}
          showLabel={isPlaceholder}
        />
      ))}
      {scene.exits?.map((exit) => (
        <SceneExit key={exit.id} exit={exit} onInspect={onInspect} showLabel={isPlaceholder} />
      ))}
      {overlayActive && <div className="scene__dim-overlay" />}
    </div>
  );
}
