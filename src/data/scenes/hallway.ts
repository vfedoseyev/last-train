import type { SceneDefinition } from "../../scenes/sceneTypes";
import { asset } from "../../utils/asset";

// Квартира как отдельная локация с комнатами (2007 год, атмосфера обычной
// северной квартиры) — коридор — хаб между комнатой Артёма, ванной, кухней
// и выходом на улицу.
//
// Дверь в комнату родителей — не переход, а обычный inspect-хотспот: она
// заперта для игрока всю игру, без условия разблокировки (не exit, потому
// что exit подразумевает "пока недоступно", а не "никогда").
export const hallwayScene: SceneDefinition = {
  id: "hallway",
  name: "Коридор",
  background: asset("images/scenes/hallway.webp"),

  // Координаты подогнаны под реальный фон (hallway.webp, слева направо: вешалка
  // с сапогами → дверной проём в ванную → дверной проём в кухню (у окна в
  // глубине) → зеркало/тумба → дверной проём в комнату Артёма → дверной проём
  // в четвёртую комнату (мебель, торшер) — это и есть "родительская").
  hotspots: [
    {
      id: "parents_door",
      label: "Дверь родителей",
      x: 80,
      y: 11,
      width: 20,
      height: 77,
      interaction: {
        type: "inspect",
        text: "Дверь в комнату родителей. Тебе там делать нечего.",
      },
    },
    {
      id: "coat_rack",
      label: "Вешалка",
      x: 0,
      y: 6,
      width: 11,
      height: 55,
      interaction: {
        type: "inspect",
        text: "Вешалка у входа — куртки, шапки, потерявший форму зонт.",
      },
    },
  ],

  exits: [
    { id: "to_home", targetSceneId: "home", label: "В свою комнату", x: 58, y: 12, width: 16, height: 72 },
    { id: "to_bathroom", targetSceneId: "bathroom", label: "В ванную", x: 13, y: 8, width: 16, height: 76 },
    { id: "to_kitchen", targetSceneId: "kitchen", label: "На кухню", x: 29, y: 20, width: 14, height: 46 },
    { id: "to_yard", targetSceneId: "yard", label: "Во двор", x: 0, y: 62, width: 12, height: 33 },
  ],
};
