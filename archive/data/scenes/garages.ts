import type { SceneDefinition } from "../../scenes/sceneTypes";

// Глава 2 — Гаражи (GDD §25): запускается расследование.
// Упрощение: сцена сразу представляет гараж №17 (поиск нужного гаража
// не выделен в отдельную головоломку, см. TODO.md §24 "Puzzle 3").
export const garagesScene: SceneDefinition = {
  id: "garages",
  name: "Гараж №17",
  background: "placeholder",

  onEnter: [{ type: "setFlag", flag: "garageUnlocked", value: true }],

  hotspots: [
    {
      id: "workbench",
      label: "Верстак",
      x: 10,
      y: 55,
      width: 20,
      height: 30,
      interaction: { type: "inspect", text: "Верстак. Инструменты, пыль, старое масляное пятно." },
    },
    {
      id: "car",
      label: "Машина",
      x: 35,
      y: 45,
      width: 30,
      height: 40,
      interaction: { type: "inspect", text: "Старая машина под чехлом. Давно не заводили." },
    },
    {
      id: "cabinet",
      label: "Шкаф",
      x: 70,
      y: 50,
      width: 15,
      height: 30,
      interaction: {
        type: "take",
        itemId: "batteries",
        text: "В шкафу — старые батарейки. Пригодятся.",
      },
    },
    {
      id: "cassette_player",
      label: "Магнитофон",
      x: 45,
      y: 65,
      width: 15,
      height: 15,
      interaction: {
        type: "use",
        requiredItem: "batteries",
        // Без базового text — сцена сразу открывает диалог garage_cassette_tape,
        // и текст подсказки только дублировал бы его первую реплику.
        effects: [
          { type: "removeItem", itemId: "batteries" },
          { type: "addItem", itemId: "cassette" },
          { type: "setFlag", flag: "foundCassette", value: true },
          { type: "setFlag", flag: "listenedCassette", value: true },
          { type: "discoverClue", clueId: "garage_cassette" },
          { type: "startDialogue", dialogueId: "garage_cassette_tape" },
        ],
        variants: [
          {
            conditions: [{ type: "flag", flag: "listenedCassette", value: true }],
            text: "Магнитофон уже сказал всё, что мог. Кассету можно достать и забрать с собой.",
          },
        ],
      },
    },
    {
      id: "photo",
      label: "Фотография",
      x: 20,
      y: 30,
      width: 12,
      height: 12,
      interaction: {
        type: "take",
        itemId: "old_photo",
        text: "Старая фотография: несколько подростков у гаражей. Кажется, среди них — отец Миши и отец Артёма. На обороте карандашом: «17 марта. Вокзал.»",
        // Находка фотографии закрывает Главу 2 и открывает Главу 3 (GDD §25-26).
        effects: [
          { type: "setFlag", flag: "foundPhoto", value: true },
          { type: "discoverClue", clueId: "garage_photo" },
          { type: "setChapter", chapter: 3 },
        ],
      },
      visibleWhen: [{ type: "flag", flag: "listenedCassette", value: true }],
    },
  ],

  exits: [
    { id: "to_street", targetSceneId: "street", label: "Наружу", x: 2, y: 30, width: 8, height: 40 },
  ],
};
