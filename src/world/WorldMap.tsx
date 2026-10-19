import { useState } from "react";
import type { SceneId } from "../scenes/sceneTypes";
import { useGame } from "../game/GameContext";
import { evaluateConditions } from "../utils/conditions";
import { locations } from "./locations";
import { asset } from "../utils/asset";
import "./WorldMap.css";

interface WorldMapProps {
  onClose: () => void;
}

// Быстрое перемещение между уже открытыми локациями — экран поверх игры,
// не замена hotspot-переходам (те остаются для близких/локальных связей вроде
// "двор → домой" или "магазин снаружи → внутрь"). См. CLAUDE_CODE_PROMPT.md §16.1.
export function WorldMap({ onClose }: WorldMapProps) {
  const { state, dispatch } = useGame();
  // Карта в обычном виде не затемнена — тёмная подложка появляется только при
  // наведении на конкретную метку, тот же "спотлайт", что и у хотспотов во время
  // диалога (Scene.tsx activeHotspotId), только источник — hover, а не диалог.
  const [hoveredSceneId, setHoveredSceneId] = useState<SceneId | null>(null);

  // Карта — отдельный путь смены сцены (CHANGE_SCENE в обход SceneExit), поэтому
  // жёсткая блокировка "без рюкзака из комнаты не выйти" (см. exits в data/scenes/home.ts)
  // должна быть продублирована и здесь — иначе её можно обойти через карту.
  const blockedByMissingBackpack =
    state.currentSceneId === "home" && state.variables.inventoryUnlocked !== 1;

  return (
    <div className="world-map" style={{ backgroundImage: `url("${asset("images/map/settlement.webp")}")` }}>
      <div className="world-map__header">
        <div className="world-map__title">Талвик</div>
        <button type="button" className="world-map__close" onClick={onClose} aria-label="Закрыть карту">
          ×
        </button>
      </div>
      <div className="world-map__surface">
        {locations.map((location) => {
          const isHere = state.currentSceneId === location.sceneId;
          const blockedHere = blockedByMissingBackpack && !isHere;
          const unlocked = evaluateConditions(location.unlockConditions, state) && !blockedHere;
          const lockedMessage = blockedHere
            ? "Без рюкзака в школу как-то не пойдёшь — сначала собери вещи."
            : location.lockedMessage;
          const spotlight = hoveredSceneId === location.sceneId;

          return (
            <button
              key={location.sceneId}
              type="button"
              className={`world-map__pin ${unlocked ? "" : "world-map__pin--locked"} ${
                isHere ? "world-map__pin--here" : ""
              } ${spotlight ? "world-map__pin--spotlight" : ""}`}
              style={{ left: `${location.x}%`, top: `${location.y}%` }}
              disabled={!unlocked || isHere}
              title={!unlocked ? lockedMessage : undefined}
              onMouseEnter={() => setHoveredSceneId(location.sceneId)}
              onMouseLeave={() => setHoveredSceneId(null)}
              onClick={() => {
                dispatch({ type: "CHANGE_SCENE", sceneId: location.sceneId });
                onClose();
              }}
            >
              <span className="world-map__pin-dot" />
              <span className="world-map__pin-label">
                {!unlocked && "🔒 "}
                {location.label}
                {isHere && " (вы здесь)"}
              </span>
            </button>
          );
        })}
        {hoveredSceneId && <div className="world-map__dim-overlay" />}
      </div>
    </div>
  );
}
