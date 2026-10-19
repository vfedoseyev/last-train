import { useGame } from "../game/GameContext";
import { quests } from "./questRegistry";

export function QuestLog() {
  const { state } = useGame();

  const active = state.activeQuests.map((id) => quests[id]).filter(Boolean);
  const completed = state.completedQuests.map((id) => quests[id]).filter(Boolean);

  if (active.length === 0 && completed.length === 0) {
    return <div className="journal__empty">Активных заданий пока нет.</div>;
  }

  return (
    <div className="journal__list">
      {active.map((quest) => (
        <div key={quest.id} className="journal__entry">
          <div className="journal__entry-title">{quest.title}</div>
          <div className="journal__entry-text">{quest.description}</div>
        </div>
      ))}
      {completed.map((quest) => (
        <div key={quest.id} className="journal__entry journal__entry--done">
          <div className="journal__entry-title">{quest.title} ✓</div>
        </div>
      ))}
    </div>
  );
}
