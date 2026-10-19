import type { SceneDefinition } from "../../scenes/sceneTypes";
import { unlockOf } from "../../world/locations";
import { asset } from "../../utils/asset";

// Пролог, Сцена 3 — Улица (GDD §23). Дом Миши открывается в Главе 1 (TODO.md, раздел
// «ГЛАВА 1») — показан как "мягкая блокировка" с пояснением, а не невидимая стена
// (CLAUDE_CODE_PROMPT.md §17). Условия разблокировки берутся из world/locations.ts.
// Переходы к гаражам/вокзалу (Главы 2/4) убраны при архивировании этих глав.
export const streetScene: SceneDefinition = {
  id: "street",
  name: "Улица посёлка",
  background: asset("images/scenes/street.webp"),

  hotspots: [
    {
      id: "misha_after_school",
      label: "Миша",
      x: 45,
      y: 55,
      width: 15,
      height: 30,
      interaction: { type: "talk", dialogueId: "misha_after_school" },
      visibleWhen: [{ type: "flag", flag: "schoolTaskDone", value: true }],
    },
  ],

  exits: [
    { id: "to_yard", targetSceneId: "yard", label: "Во двор", x: 5, y: 30, width: 12, height: 35 },
    { id: "to_school", targetSceneId: "school", label: "В школу", x: 20, y: 28, width: 12, height: 35 },
    {
      id: "to_shop",
      targetSceneId: "shop_exterior",
      label: "В магазин",
      x: 56,
      y: 28,
      width: 16,
      height: 30,
    },
    {
      id: "to_misha_home",
      targetSceneId: "misha_home",
      label: "К Мише",
      x: 80,
      y: 28,
      width: 14,
      height: 35,
      ...unlockOf("misha_home"),
    },
  ],
};
