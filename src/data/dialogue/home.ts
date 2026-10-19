import type { Dialogue } from "../../dialogue/dialogueTypes";

// Пролог, Сцена 8 — Вечер: обычный разговор, без упоминания Лены (GDD §23).
// Завершает Пролог: переводит игру в Главу 1.
// Диалоги для Глав 3/7 (father_about_lena, father_confession) перенесены в
// archive/data/dialogue/home_later_chapters.ts — решение сосредоточиться на
// Прологе/Главе 1, см. TODO.md.
export const fatherEvening: Dialogue = {
  id: "father_evening",
  startNodeId: "start",
  nodes: [
    { id: "start", speaker: "Отец", text: "Где был?", next: "artem1" },
    { id: "artem1", speaker: "Артём", text: "У Миши. Ничего особенного.", next: "father2" },
    {
      id: "father2",
      speaker: "Отец",
      text: "Ладно. Ужин на столе.",
      effects: [{ type: "setChapter", chapter: 1 }],
    },
  ],
};
