import type { SceneDefinition } from "../../scenes/sceneTypes";
import { unlockOf } from "../../world/locations";
import { asset } from "../../utils/asset";

// Пролог, Сцена 2 — Двор (GDD §23). Артём и Миша — соседи с общим двором, поэтому
// отсюда есть прямой переход к Мише домой (не только через street.ts) — см.
// world/locations.ts.
export const yardScene: SceneDefinition = {
  id: "yard",
  name: "Двор",
  background: asset("images/scenes/yard.webp"),

  hotspots: [
    {
      id: "misha",
      label: "Миша",
      x: 40,
      y: 55,
      width: 20,
      height: 30,
      interaction: { type: "talk", dialogueId: "misha_yard_intro" },
    },
    {
      id: "bench",
      label: "Лавка",
      x: 0,
      y: 57,
      width: 17,
      height: 40,
      interaction: {
        type: "inspect",
        variants: [
          {
            conditions: [{ type: "flag", flag: "metMisha", value: true }],
            text: "Лавка, на которой они с Мишей сидят каждый день. Сегодня — не исключение.",
          },
          { text: "Старая лавка. Рядом — следы от костра, ещё с прошлой зимы." },
        ],
      },
    },
  ],

  exits: [
    { id: "to_home", targetSceneId: "hallway", label: "Домой", x: 0, y: 16, width: 25, height: 38 },
    { id: "to_street", targetSceneId: "street", label: "На улицу", x: 77, y: 21, width: 23, height: 37 },
    {
      id: "to_misha_home",
      targetSceneId: "misha_home",
      label: "К Мише",
      x: 40,
      y: 5,
      width: 20,
      height: 35,
      ...unlockOf("misha_home"),
    },
  ],
};
