import { useGame } from "../game/GameContext";
import { resetGame } from "../save/loadGame";
import type { ItemId } from "../inventory/inventoryTypes";
import "./DebugPanel.css";

// Только предметы, реально зарегистрированные сейчас (Пролог/Глава 1) — полный
// canon-список (GDD §40) временно в archive/data/items/later_chapters.ts, см. TODO.md.
const ALL_ITEM_IDS: ItemId[] = ["phone"];

export function DebugPanel() {
  const { state, dispatch } = useGame();

  const activeFlags = Object.entries(state.flags)
    .filter(([, value]) => value)
    .map(([flag]) => flag)
    .join(", ");

  // "Unlock All" временно = Глава 1 (максимум сейчас реализованного контента,
  // Главы 2-8 в архиве) — вернуть chapter: 8, когда они вернутся.
  const handleUnlockAll = () => dispatch({ type: "SET_CHAPTER", chapter: 1 });
  const handleNextChapter = () => dispatch({ type: "SET_CHAPTER", chapter: state.currentChapter + 1 });
  const handleGiveAllItems = () => {
    // Инвентарь спрятан, пока не осмотрен рюкзак (см. Game.tsx) — для удобства
    // тестирования сразу открываем доступ к нему вместе с выдачей предметов.
    dispatch({ type: "SET_VARIABLE", key: "inventoryUnlocked", value: 1 });
    ALL_ITEM_IDS.forEach((itemId) => dispatch({ type: "ADD_ITEM", itemId }));
  };
  const handleResetGame = () => {
    resetGame();
    window.location.reload();
  };

  return (
    <div className="debug-panel">
      <div className="debug-panel__row">
        <strong>Scene:</strong> {state.currentSceneId}
      </div>
      <div className="debug-panel__row">
        <strong>Chapter:</strong> {state.currentChapter}
      </div>
      <div className="debug-panel__row">
        <strong>Inventory:</strong> {state.inventory.join(", ") || "—"}
      </div>
      <div className="debug-panel__row">
        <strong>Flags:</strong> {activeFlags || "—"}
      </div>
      <div className="debug-panel__actions">
        <button type="button" onClick={handleUnlockAll}>
          Unlock All
        </button>
        <button type="button" onClick={handleNextChapter}>
          Next Chapter
        </button>
        <button type="button" onClick={handleGiveAllItems}>
          Give All Items
        </button>
        <button type="button" onClick={handleResetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}
