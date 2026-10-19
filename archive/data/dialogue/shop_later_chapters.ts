import type { Dialogue } from "../../../src/dialogue/dialogueTypes";

// Перенесено из src/data/dialogue/shop.ts при решении сосредоточиться на
// Прологе/Главе 1 (см. TODO.md). Возвращать при продолжении работы над Главой 3.

// Глава 3 (GDD §26): продавщица помнит, что Лена заходила в тот день.
export const shopkeeperAboutLena: Dialogue = {
  id: "shopkeeper_about_lena",
  startNodeId: "start",
  nodes: [
    { id: "start", speaker: "Артём", text: "А Лену вы, случайно, не помните?", next: "shop1" },
    {
      id: "shop1",
      speaker: "Продавщица",
      text: "Как не помнить. Она в тот день заходила, перед тем как...",
      next: "shop2",
    },
    {
      id: "shop2",
      speaker: "Продавщица",
      text: "Расстроенная была. Я ещё тогда подумала — что-то случилось.",
      effects: [{ type: "discoverClue", clueId: "shopkeeper_lena" }],
    },
  ],
};
