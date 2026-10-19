import type { SceneDefinition } from "../../scenes/sceneTypes";

// Глава 1 — Последняя зима (GDD §24): открывается после Пролога.
// Хотспот "Отец Миши" (Глава 7) и варианты диалога для Глав 3/7/8 убраны при
// архивировании этих глав — см. archive/data/dialogue/misha_home_later_chapters.ts.
export const mishaHomeScene: SceneDefinition = {
  id: "misha_home",
  name: "Дом Миши",
  background: "placeholder",

  hotspots: [
    {
      id: "misha",
      label: "Миша",
      x: 50,
      y: 50,
      width: 15,
      height: 30,
      interaction: { type: "talk", dialogueId: "misha_home_strange" },
    },
    {
      id: "shelf",
      label: "Полка",
      x: 15,
      y: 60,
      width: 15,
      height: 20,
      interaction: {
        type: "inspect",
        text: "Полка с всякой всячиной — модели машин, старые игрушки.",
      },
    },
  ],

  exits: [
    { id: "to_yard", targetSceneId: "yard", label: "Во двор", x: 2, y: 30, width: 8, height: 40 },
    { id: "to_street", targetSceneId: "street", label: "На улицу", x: 2, y: 75, width: 8, height: 20 },
  ],
};
