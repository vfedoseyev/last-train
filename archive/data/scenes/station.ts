import type { SceneDefinition } from "../../scenes/sceneTypes";
import { locations } from "../../world/locations";

const oldRailwayUnlock = locations.find((l) => l.sceneId === "old_railway");

// Глава 4 — Вокзал (GDD §27): узнать, что происходило в день исчезновения.
export const stationScene: SceneDefinition = {
  id: "station",
  name: "Вокзал. Зал ожидания",
  background: "placeholder",

  onEnter: [{ type: "setFlag", flag: "stationUnlocked", value: true }],

  hotspots: [
    {
      id: "clock",
      label: "Часы",
      x: 45,
      y: 10,
      width: 10,
      height: 15,
      interaction: { type: "inspect", text: "Старые круглые часы над кассой. Идут точно." },
    },
    {
      id: "schedule",
      label: "Расписание",
      x: 15,
      y: 30,
      width: 15,
      height: 25,
      interaction: {
        type: "take",
        itemId: "train_schedule",
        text: "Расписание поездов. Вечерний поезд отправлялся в 23:47. По записям — Лена на него не садилась.",
        effects: [
          { type: "setFlag", flag: "foundTrainSchedule", value: true },
          { type: "discoverClue", clueId: "train_schedule" },
        ],
      },
    },
    {
      id: "benches",
      label: "Лавки",
      x: 35,
      y: 60,
      width: 25,
      height: 20,
      interaction: { type: "inspect", text: "Деревянные лавки, потёртые от времени." },
    },
    {
      id: "old_photos",
      label: "Старые фотографии",
      x: 70,
      y: 15,
      width: 15,
      height: 20,
      interaction: {
        type: "inspect",
        text: "Чёрно-белые снимки вокзала прошлых лет на стене у кассы.",
      },
    },
    {
      id: "staff_door",
      label: "Служебная дверь",
      x: 85,
      y: 45,
      width: 12,
      height: 35,
      interaction: {
        type: "take",
        itemId: "station_log",
        text: "За дверью — старый журнал дежурного. Одна из записей: «23:05 — девушка возле второго пути».",
        // Журнал дежурного — ключевая находка главы, закрывает её и открывает Главу 5.
        effects: [
          { type: "setFlag", flag: "foundStationLog", value: true },
          { type: "discoverClue", clueId: "station_log" },
          { type: "setChapter", chapter: 5 },
        ],
      },
    },
    {
      id: "timeline",
      label: "Восстановить события",
      x: 5,
      y: 82,
      width: 22,
      height: 14,
      interaction: {
        type: "puzzle",
        effects: [{ type: "startPuzzle", puzzleId: "timeline_puzzle" }],
        variants: [
          {
            conditions: [{ type: "flag", flag: "timelineCompleted", value: true }],
            text: "Хронология той ночи уже восстановлена.",
            effects: [],
          },
        ],
      },
      visibleWhen: [{ type: "chapter", value: 5 }],
    },
    {
      id: "misha_departure",
      label: "Миша",
      x: 48,
      y: 45,
      width: 15,
      height: 30,
      interaction: { type: "talk", dialogueId: "misha_departure" },
      visibleWhen: [{ type: "chapter", value: 8 }],
    },
  ],

  exits: [
    { id: "to_street", targetSceneId: "street", label: "На улицу", x: 2, y: 30, width: 8, height: 40 },
    {
      id: "to_old_railway",
      targetSceneId: "old_railway",
      label: "К старому участку",
      x: 88,
      y: 30,
      width: 10,
      height: 40,
      conditions: oldRailwayUnlock?.unlockConditions,
      lockedMessage: oldRailwayUnlock?.lockedMessage,
    },
  ],
};
