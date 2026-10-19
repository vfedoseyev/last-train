import type { SceneDefinition } from "../../scenes/sceneTypes";

// Глава 6 — Пурга (GDD §29): самая атмосферная глава — находка рюкзака Лены.
export const oldRailwayScene: SceneDefinition = {
  id: "old_railway",
  name: "Старый железнодорожный участок",
  background: "placeholder",

  onEnter: [{ type: "setFlag", flag: "oldSectionUnlocked", value: true }],

  hotspots: [
    {
      id: "rails",
      label: "Рельсы",
      x: 8,
      y: 70,
      width: 25,
      height: 20,
      interaction: { type: "inspect", text: "Старые рельсы, занесённые снегом. Дальше путь давно не расчищали." },
    },
    {
      id: "fence",
      label: "Забор",
      x: 78,
      y: 15,
      width: 18,
      height: 30,
      interaction: { type: "inspect", text: "Покосившийся забор. Кто-то когда-то пытался его починить." },
    },
    {
      id: "booth_table",
      label: "Стол",
      x: 10,
      y: 35,
      width: 15,
      height: 20,
      interaction: { type: "inspect", text: "Старый стол внутри будки. На нём — пыль и иней." },
    },
    {
      id: "booth_cabinet",
      label: "Шкаф",
      x: 28,
      y: 30,
      width: 12,
      height: 22,
      interaction: {
        type: "inspect",
        text: "Пустой шкаф, кроме нескольких старых тряпок. Кто-то здесь явно бывал.",
      },
    },
    {
      id: "lamp",
      label: "Лампа",
      x: 45,
      y: 15,
      width: 10,
      height: 15,
      interaction: { type: "inspect", text: "Керосиновая лампа. Стекло треснуло." },
    },
    {
      id: "backpack",
      label: "Рюкзак",
      x: 55,
      y: 45,
      width: 15,
      height: 22,
      interaction: {
        type: "take",
        itemId: "lena_backpack",
        text: "Старый рюкзак — судя по виду, пролежал здесь много лет.",
        effects: [
          { type: "setFlag", flag: "foundBackpack", value: true },
          { type: "discoverClue", clueId: "lena_backpack" },
        ],
      },
    },
    {
      id: "recorder",
      label: "Диктофон",
      x: 35,
      y: 55,
      width: 12,
      height: 18,
      interaction: {
        type: "take",
        itemId: "voice_recorder",
        text: "Диктофон. Кассета внутри ещё цела.",
        effects: [
          { type: "setFlag", flag: "listenedLenaTape", value: true },
          { type: "discoverClue", clueId: "lena_tape" },
          { type: "startDialogue", dialogueId: "lena_voice_recording" },
        ],
        variants: [
          {
            conditions: [{ type: "flag", flag: "listenedLenaTape", value: true }],
            text: "Запись уже прослушана.",
          },
        ],
      },
      visibleWhen: [{ type: "flag", flag: "foundBackpack", value: true }],
    },
    {
      id: "letter",
      label: "Письмо",
      x: 70,
      y: 45,
      width: 12,
      height: 18,
      interaction: {
        type: "take",
        itemId: "lena_letter",
        text: "Незаконченное письмо. «...просто нужно побыть одной. Я вернусь, когда...» — дальше текст обрывается.",
        effects: [
          { type: "setFlag", flag: "foundLenaLetter", value: true },
          { type: "discoverClue", clueId: "lena_letter" },
        ],
      },
      visibleWhen: [{ type: "flag", flag: "foundBackpack", value: true }],
    },
    {
      id: "ticket",
      label: "Билет",
      x: 50,
      y: 78,
      width: 10,
      height: 12,
      interaction: {
        type: "take",
        itemId: "lena_ticket",
        // Не намёк на подготовленный побег — просто вещь, которую она носила с собой,
        // потому что мечтала уехать (см. GDD §72 "запрещённые сюжетные повороты").
        text: "Старый билет на автобус до города. Наверное, хранился у неё в сумке давно — она ведь мечтала уехать.",
        effects: [{ type: "discoverClue", clueId: "lena_ticket" }],
      },
      visibleWhen: [{ type: "flag", flag: "foundBackpack", value: true }],
    },
    {
      id: "photo_in_backpack",
      label: "Фотография",
      x: 63,
      y: 78,
      width: 10,
      height: 12,
      interaction: {
        type: "take",
        itemId: "photograph",
        text: "Фотография — Лена смеётся, рядом друзья. Обычная фотография, каких много.",
        effects: [{ type: "discoverClue", clueId: "lena_photograph" }],
      },
      visibleWhen: [{ type: "flag", flag: "foundBackpack", value: true }],
    },
    {
      id: "pendant",
      label: "Кулон",
      x: 78,
      y: 78,
      width: 8,
      height: 10,
      interaction: {
        type: "take",
        itemId: "pendant",
        text: "Простой кулон на тонкой цепочке.",
        effects: [{ type: "discoverClue", clueId: "pendant" }],
      },
      visibleWhen: [{ type: "flag", flag: "foundBackpack", value: true }],
    },
  ],

  exits: [
    { id: "to_station", targetSceneId: "station", label: "К вокзалу", x: 2, y: 30, width: 8, height: 40 },
  ],
};
