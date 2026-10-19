import { useState } from "react";
import { useGame } from "../game/GameContext";
import { clues } from "./clueRegistry";
import { QuestLog } from "../quests/QuestLog";
import "./Journal.css";

type JournalTab = "clues" | "quests";

interface JournalProps {
  onClose: () => void;
}

export function Journal({ onClose }: JournalProps) {
  const { state } = useGame();
  const [tab, setTab] = useState<JournalTab>("clues");

  const discovered = state.discoveredClues.map((id) => clues[id]).filter(Boolean);

  return (
    <div className="journal">
      <div className="journal__header">
        <button
          type="button"
          className={`journal__tab ${tab === "clues" ? "journal__tab--active" : ""}`}
          onClick={() => setTab("clues")}
        >
          Улики
        </button>
        <button
          type="button"
          className={`journal__tab ${tab === "quests" ? "journal__tab--active" : ""}`}
          onClick={() => setTab("quests")}
        >
          Задания
        </button>
        <button type="button" className="journal__close" onClick={onClose} aria-label="Закрыть журнал">
          ×
        </button>
      </div>

      <div className="journal__body">
        {tab === "clues" ? (
          discovered.length === 0 ? (
            <div className="journal__empty">Пока нечего записывать.</div>
          ) : (
            <div className="journal__list">
              {discovered.map((clue) => (
                <div key={clue.id} className="journal__entry">
                  <div className="journal__entry-title">{clue.title}</div>
                  <div className="journal__entry-text">{clue.text}</div>
                </div>
              ))}
            </div>
          )
        ) : (
          <QuestLog />
        )}
      </div>
    </div>
  );
}
