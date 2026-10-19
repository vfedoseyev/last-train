import type { Dialogue } from "../../dialogue/dialogueTypes";

// Пролог, Сцена 7 — После уроков: первая сюжетная зацепка (GDD §23).
export const mishaAfterSchool: Dialogue = {
  id: "misha_after_school",
  startNodeId: "start",
  nodes: [
    {
      id: "start",
      speaker: "Миша",
      text: "Слушай, пойдём после уроков в гаражи? Есть дело.",
      next: "artem1",
    },
    { id: "artem1", speaker: "Артём", text: "Какое ещё дело?", next: "misha2" },
    { id: "misha2", speaker: "Миша", text: "Потом расскажу. Просто пойдём." },
  ],
};
