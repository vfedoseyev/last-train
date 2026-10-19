import type { Dialogue } from "../../../src/dialogue/dialogueTypes";

// Перенесено из src/data/dialogue/classroom.ts при решении сосредоточиться на
// Прологе/Главе 1 (см. TODO.md). Возвращать при продолжении работы над Главами 3/8.

// Глава 3 (GDD §26): учительница рассказывает о Лене — училась здесь, хотела уехать.
export const teacherAboutLena: Dialogue = {
  id: "teacher_about_lena",
  startNodeId: "start",
  nodes: [
    { id: "start", speaker: "Артём", text: "А вы её помните? Лену?", next: "teacher1" },
    {
      id: "teacher1",
      speaker: "Учительница истории",
      text: "Конечно. Особенная была ученица. Всё время говорила, что уедет отсюда.",
      next: "teacher2",
    },
    {
      id: "teacher2",
      speaker: "Учительница истории",
      text: "В большой город хотела. Не знаю, получилось ли у неё.",
      effects: [{ type: "discoverClue", clueId: "lena_wanted_to_leave" }],
    },
  ],
};

// Глава 8 (GDD §33): последний урок, весна, последние месяцы школы.
export const teacherLastLesson: Dialogue = {
  id: "teacher_last_lesson",
  startNodeId: "start",
  nodes: [
    {
      id: "start",
      speaker: "Учительница истории",
      text: "Ну что, выпускники. Через месяц вас здесь уже не будет.",
      next: "teacher2",
    },
    { id: "teacher2", speaker: "Учительница истории", text: "Не забывайте нас совсем." },
  ],
};
