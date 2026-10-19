import type { SceneDefinition } from "../../scenes/sceneTypes";
import { asset } from "../../utils/asset";

// Пролог, Сцена 4 — Магазин (GDD §23).
export const shopScene: SceneDefinition = {
  id: "shop",
  name: "Магазин",
  background: asset("images/scenes/shop.webp"),

  hotspots: [
    {
      id: "shopkeeper",
      label: "Продавщица",
      x: 44,
      y: 43,
      width: 30,
      height: 48,
      interaction: {
        type: "talk",
        dialogueId: "shopkeeper_intro",
        // Вариант для Главы 3 убран при архивировании — см.
        // archive/data/dialogue/shop_later_chapters.ts.
      },
    },
    {
      id: "shelves",
      label: "Полки",
      x: 21,
      y: 20,
      width: 22,
      height: 71,
      interaction: {
        type: "inspect",
        text: "Полки с хлебом, шоколадом и водой. Покупать ничего срочно не нужно.",
      },
    },
  ],

  exits: [
    {
      id: "to_shop_exterior",
      targetSceneId: "shop_exterior",
      label: "Наружу",
      x: 8,
      y: 9,
      width: 12,
      height: 82,
    },
  ],
};
