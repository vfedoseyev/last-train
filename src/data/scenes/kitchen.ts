import type { SceneDefinition } from "../../scenes/sceneTypes";
import { asset } from "../../utils/asset";

// Кухня — сюда переехал разговор с отцом вечером (Пролог, Сцена 8, GDD §23):
// естественнее, чем стоять в комнате сына. Хотспот "father" виден только
// после schoolTaskDone=true, как и раньше (см. src/data/scenes/home.ts).
export const kitchenScene: SceneDefinition = {
  id: "kitchen",
  name: "Кухня",
  background: asset("images/scenes/kitchen.webp"),

  hotspots: [
    {
      id: "table",
      label: "Стол",
      x: 0,
      y: 68,
      width: 40,
      height: 32,
      interaction: {
        type: "inspect",
        text: "Кухонный стол с клеёнкой в цветочек, потёртой на углах.",
      },
    },
    {
      id: "fridge",
      label: "Холодильник",
      x: 60,
      y: 8,
      width: 28,
      height: 90,
      interaction: {
        type: "inspect",
        text: "Холодильник, обклеенный магнитами с прошлых поездок.",
      },
    },
    {
      id: "radio",
      label: "Радио",
      x: 30,
      y: 8,
      width: 28,
      height: 22,
      interaction: {
        type: "inspect",
        text: "Старое радио бормочет прогноз погоды на завтра — снова метель.",
      },
    },
    {
      id: "father",
      label: "Отец",
      x: 12,
      y: 8,
      width: 18,
      height: 45,
      interaction: { type: "talk", dialogueId: "father_evening" },
      visibleWhen: [{ type: "flag", flag: "schoolTaskDone", value: true }],
    },
  ],

  exits: [
    { id: "to_hallway", targetSceneId: "hallway", label: "Выйти", x: 0, y: 8, width: 10, height: 85 },
  ],
};
