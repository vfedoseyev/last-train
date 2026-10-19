import type { SceneDefinition } from "../../scenes/sceneTypes";

// Пролог, Сцена 6 — Класс (GDD §23).
// Варианты для Глав 3/8 убраны при архивировании этих глав — см.
// archive/data/dialogue/classroom_later_chapters.ts.
export const classroomScene: SceneDefinition = {
  id: "classroom",
  name: "Класс",
  background: "placeholder",

  hotspots: [
    {
      id: "teacher",
      label: "Учительница",
      x: 50,
      y: 40,
      width: 15,
      height: 30,
      interaction: {
        type: "talk",
        // По умолчанию (Пролог) — задание на реферат. С Главы 1 — первый намёк (GDD §24).
        dialogueId: "teacher_task",
        variants: [{ conditions: [{ type: "chapter", value: 1 }], dialogueId: "teacher_first_hint" }],
      },
    },
    {
      id: "desk",
      label: "Парта",
      x: 20,
      y: 65,
      width: 15,
      height: 20,
      interaction: { type: "inspect", text: "Своя парта. Учебник ещё не открыт." },
    },
  ],

  exits: [
    { id: "to_school", targetSceneId: "school", label: "Из класса", x: 2, y: 30, width: 8, height: 40 },
  ],
};
