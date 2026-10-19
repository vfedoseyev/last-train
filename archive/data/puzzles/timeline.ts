import type { OrderingPuzzleDefinition } from "../../puzzles/puzzleTypes";

// Глава 5 — Той ночью (GDD §28, пример головоломки — GDD §47): восстановить
// хронологию вечера. Порядок карточек ниже — канонический правильный ответ.
export const timelinePuzzle: OrderingPuzzleDefinition = {
  id: "timeline_puzzle",
  title: "Хронология той ночи",
  instructions: "Расположи события в правильном порядке — от самого раннего к самому позднему.",
  cards: [
    { id: "arrives", text: "Лена приходит на вокзал" },
    { id: "argument", text: "Ссора" },
    { id: "leaves", text: "Лена уходит" },
    { id: "blizzard", text: "Начинается метель" },
    { id: "train", text: "Поезд отправляется" },
    { id: "search", text: "Начинаются поиски" },
  ],
  effects: [
    { type: "setFlag", flag: "timelineCompleted", value: true },
    { type: "discoverClue", clueId: "timeline_completed" },
    { type: "setChapter", chapter: 6 },
  ],
};
