import type { Dialogue } from "../../dialogue/dialogueTypes";

// Глава 8 — Последний поезд (GDD §35): Миша уезжает, Артём провожает его.
// Финальный узел вычисляет концовку (GDD §39) и завершает игру — см. game/ending.ts.
export const mishaDeparture: Dialogue = {
  id: "misha_departure",
  startNodeId: "start",
  nodes: [
    {
      id: "start",
      speaker: "Миша",
      text: "Если бы ты был там тогда... ты бы пошёл за ней?",
      next: "artem1",
    },
    { id: "artem1", speaker: "Артём", text: "Не знаю.", next: "artem2" },
    {
      id: "artem2",
      speaker: "Артём",
      text: "Но теперь я бы не оставил человека одного.",
      next: "narration",
    },
    {
      id: "narration",
      speaker: "",
      text: "Приходит поезд. Миша садится. Поезд уезжает.",
      // finalChoice отмечает сам момент финального прощания (GDD §42) — вычисление
      // концовки (state.ending) не зависит от него, это отдельный механизм (§9.1 промпта).
      effects: [
        { type: "setFlag", flag: "finalChoice", value: true },
        { type: "computeEnding" },
      ],
    },
  ],
};
