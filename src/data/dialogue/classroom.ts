import type { Dialogue } from "../../dialogue/dialogueTypes";

// Глава 1 (GDD §24): "Первый намёк" — учительница истории случайно проговаривается
// и меняет тему. Первая настоящая зацепка расследования — заносится в журнал улик.
// Диалоги для Глав 3/8 (teacher_about_lena, teacher_last_lesson) перенесены в
// archive/data/dialogue/classroom_later_chapters.ts — решение сосредоточиться на
// Прологе/Главе 1, см. TODO.md.
export const teacherFirstHint: Dialogue = {
  id: "teacher_first_hint",
  startNodeId: "start",
  nodes: [
    { id: "start", speaker: "Учительница истории", text: "Ты ведь сын Сергея?", next: "artem1" },
    { id: "artem1", speaker: "Артём", text: "Да.", next: "teacher2" },
    { id: "teacher2", speaker: "Учительница истории", text: "Тогда понятно.", next: "artem2" },
    { id: "artem2", speaker: "Артём", text: "Что понятно?", next: "teacher3" },
    {
      id: "teacher3",
      speaker: "Учительница истории",
      text: "(Она уже отворачивается к доске и не отвечает.)",
      // Раньше здесь стоял setChapter:2 (переход к Главе 2 — гаражи). Убрано вместе
      // с архивированием Главы 2: пока это последняя реплика Главы 1, дальше глава
      // не переключается сама — вернуть эффект при восстановлении Главы 2.
      effects: [{ type: "discoverClue", clueId: "teacher_hint" }],
    },
  ],
};

// Пролог, Сцена 6 — Класс (GDD §23).
export const teacherTask: Dialogue = {
  id: "teacher_task",
  startNodeId: "start",
  nodes: [
    {
      id: "start",
      speaker: "Учительница истории",
      text: "К следующему уроку каждому нужен материал для реферата. Тема свободная.",
      next: "artem1",
    },
    {
      id: "artem1",
      speaker: "Артём",
      text: "(Надо будет что-нибудь придумать.)",
      effects: [{ type: "setFlag", flag: "schoolTaskDone", value: true }],
    },
  ],
};
