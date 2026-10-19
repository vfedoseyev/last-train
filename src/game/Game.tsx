import { useEffect, useRef, useState } from "react";
import type { ItemId } from "../inventory/inventoryTypes";
import { useGame } from "./GameContext";
import { SceneRenderer } from "../scenes/SceneRenderer";
import { SceneTransitionOverlay } from "../scenes/SceneTransitionOverlay";
import { DialogueBox } from "../dialogue/DialogueBox";
import { OrderingPuzzle } from "../puzzles/OrderingPuzzle";
import { ChapterBanner } from "./ChapterBanner";
import { Inventory } from "../inventory/Inventory";
import { Journal } from "../journal/Journal";
import { WorldMap } from "../world/WorldMap";
import { HintToast } from "../hints/HintToast";
import { getHint } from "../hints/getHint";
import { DebugPanel } from "../debug/DebugPanel";
import { asset } from "../utils/asset";
import "./Game.css";

interface GameProps {
  onOpenMenu: () => void;
}

export function Game({ onOpenMenu }: GameProps) {
  const { state, transitionPhase } = useGame();
  const [journalOpen, setJournalOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [hintText, setHintText] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<ItemId | null>(null);

  const dialogueActive = state.dialogueState !== null;
  const puzzleActive = state.activePuzzleId !== null;
  const transitioning = transitionPhase !== "idle";
  const busy = dialogueActive || puzzleActive || transitioning;
  // Инвентарь появляется только после того, как Артём в первый раз осмотрел рюкзак
  // (эффект setVariable в data/scenes/home.ts), а не с самого начала игры.
  const inventoryUnlocked = state.variables.inventoryUnlocked === 1;

  // Заставка с номером/названием главы — показывается только когда currentChapter
  // реально меняется в течение этой игровой сессии, а не при каждой загрузке
  // сохранения (previousChapterRef инициализируется уже загруженным значением).
  const [chapterBanner, setChapterBanner] = useState<number | null>(null);
  const previousChapterRef = useRef(state.currentChapter);

  useEffect(() => {
    if (state.currentChapter !== previousChapterRef.current) {
      setChapterBanner(state.currentChapter);
      previousChapterRef.current = state.currentChapter;
    }
  }, [state.currentChapter]);

  // Пока идёт диалог или головоломка, остальные функции игры (журнал, инвентарь,
  // подсказка) недоступны — если они были открыты, закрываем сразу.
  useEffect(() => {
    if (busy) {
      setJournalOpen(false);
      setInventoryOpen(false);
      setMapOpen(false);
      setHintText(null);
    }
  }, [busy]);

  return (
    <div className="game">
      <div className="game__scene-area">
        <SceneRenderer
          selectedItemId={selectedItemId}
          onItemUsed={() => setSelectedItemId(null)}
        />
        <SceneTransitionOverlay />
        {hintText && <HintToast text={hintText} onClose={() => setHintText(null)} />}
        <DialogueBox />
        <OrderingPuzzle />
        {(journalOpen || mapOpen) && <div className="game__panel-backdrop" />}
        {journalOpen && <Journal onClose={() => setJournalOpen(false)} />}
        {mapOpen && <WorldMap onClose={() => setMapOpen(false)} />}
      </div>
      <div className="game__ui">
        {inventoryUnlocked && inventoryOpen && (
          <Inventory
            selectedItemId={selectedItemId}
            onSelectItem={setSelectedItemId}
            disabled={busy}
          />
        )}
        <div className="game__ui-actions">
          {inventoryUnlocked && (
            <button
              type="button"
              className="game__ui-button"
              onClick={() => setInventoryOpen((open) => !open)}
              disabled={busy}
            >
              <img className="game__ui-button-icon" src={asset("images/ui/backpack.png")} alt="" /> Инвентарь
            </button>
          )}
          <button
            type="button"
            className="game__ui-button"
            onClick={() => setMapOpen((open) => !open)}
            disabled={busy}
          >
            🗺️ Карта
          </button>
          <button
            type="button"
            className="game__ui-button"
            onClick={() => setJournalOpen((open) => !open)}
            disabled={busy}
          >
            Журнал
          </button>
          <button
            type="button"
            className="game__ui-button"
            onClick={() => setHintText(getHint(state))}
            disabled={busy}
          >
            💡 Подсказка
          </button>
          <button type="button" className="game__ui-button" onClick={onOpenMenu}>
            Меню
          </button>
        </div>
      </div>
      {chapterBanner !== null && (
        <ChapterBanner chapter={chapterBanner} onDismiss={() => setChapterBanner(null)} />
      )}
      {import.meta.env.DEV && <DebugPanel />}
    </div>
  );
}
