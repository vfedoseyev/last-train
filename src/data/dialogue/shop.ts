import type { Dialogue } from "../../dialogue/dialogueTypes";

// Пролог, Сцена 4 — Магазин (GDD §23).
// Диалог для Главы 3 (shopkeeper_about_lena) перенесён в
// archive/data/dialogue/shop_later_chapters.ts — см. TODO.md.
export const shopkeeperIntro: Dialogue = {
  id: "shopkeeper_intro",
  startNodeId: "start",
  nodes: [
    { id: "start", speaker: "Продавщица", text: "Здравствуй, Артём. Что-то нужно?", next: "artem1" },
    { id: "artem1", speaker: "Артём", text: "Нет, просто зашёл посмотреть." },
  ],
};
