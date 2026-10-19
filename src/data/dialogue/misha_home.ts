import type { Dialogue } from "../../dialogue/dialogueTypes";

// Глава 1 (GDD §24): "Артём замечает, что Миша ведёт себя странно в последнее время."
// Намеренно без разгадки и без флага — игрок должен сам почувствовать, что что-то не так (GDD §57).
// Диалоги для Глав 3/7/8 (misha_refuses, misha_father_confession, misha_reveals_truth,
// misha_packing) перенесены в archive/data/dialogue/misha_home_later_chapters.ts —
// решение сосредоточиться на Прологе/Главе 1, см. TODO.md.
export const mishaHomeStrange: Dialogue = {
  id: "misha_home_strange",
  startNodeId: "start",
  nodes: [
    { id: "start", speaker: "Миша", text: "О, заходи. Как дела?", next: "artem1" },
    {
      id: "artem1",
      speaker: "Артём",
      text: "Нормально. А у тебя? Ты сам не свой в последнее время.",
      next: "misha2",
    },
    {
      id: "misha2",
      speaker: "Миша",
      text: "Да так... ничего. Всё нормально.",
      // Заметка в журнал — не разгадка и не флаг, просто фиксирует ощущение Артёма
      // (GDD §57 — игрок должен сам почувствовать, что что-то не так). Показывает
      // механику журнала на бытовой сцене, до начала расследования про Лену.
      effects: [{ type: "discoverClue", clueId: "misha_strange_feeling" }],
    },
  ],
};
