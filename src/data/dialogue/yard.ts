import type { Dialogue } from "../../dialogue/dialogueTypes";

// Пролог, Сцена 2 — Двор (GDD §23).
// Первый настоящий диалоговый выбор в игре (choices) — чтобы игрок с самого начала
// понял, что реплики можно выбирать, а не только листать текст. Варианты чисто
// флейвор-разные, без механических последствий — сходятся в одном и том же misha2.
// Третий вариант (show_phone) появляется только если у игрока в инвентаре телефон
// (условие hasItem на choice) — первая демонстрация того, что инвентарь и диалоги
// связаны, не только через получение предметов.
export const mishaYardIntro: Dialogue = {
  id: "misha_yard_intro",
  startNodeId: "start",
  nodes: [
    {
      id: "start",
      speaker: "Миша",
      text: "Ты опять опоздал.",
      choices: [
        { id: "defend", text: "Я не опоздал.", nextNodeId: "misha_tease" },
        { id: "apologize", text: "Прости, заспался.", nextNodeId: "misha_amused" },
        {
          id: "show_phone",
          text: "Смотри, ты мне сам написал.",
          nextNodeId: "misha_phone",
          conditions: [{ type: "hasItem", itemId: "phone" }],
        },
      ],
    },
    {
      id: "misha_tease",
      speaker: "Миша",
      text: "Ну да, конечно. Часы, видимо, врут.",
      next: "misha2",
    },
    {
      id: "misha_amused",
      speaker: "Миша",
      text: "Опять? Ты так всю школу проспишь.",
      next: "misha2",
    },
    {
      id: "misha_phone",
      speaker: "Миша",
      text: "Ну написал. Что, шёл и читал сообщения вместо того, чтобы идти быстрее?",
      next: "misha2",
    },
    {
      id: "misha2",
      speaker: "Миша",
      text: "Первый урок через десять минут.",
      effects: [{ type: "setFlag", flag: "metMisha", value: true }],
    },
  ],
};
