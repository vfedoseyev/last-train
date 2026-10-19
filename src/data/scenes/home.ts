import type { SceneDefinition } from "../../scenes/sceneTypes";
import { asset } from "../../utils/asset";

// Пролог, Сцена 1 — Комната Артёма (GDD §23). Действие происходит в 2007 году —
// детали в хотспотах должны это ощущаться (техника, быт), без явных анахронизмов.
// Хотспот "father" переехал на кухню (data/scenes/kitchen.ts) — отец не стоит
// в комнате сына, разговор вечером логичнее там. Выход теперь в коридор
// (data/scenes/hallway.ts), а не прямо во двор — квартира стала отдельной
// локацией с комнатами.
export const homeScene: SceneDefinition = {
  id: "home",
  name: "Комната Артёма",
  background: asset("images/scenes/home.webp"),

  // Координаты хотспотов подогнаны под реальный фон (home.webp, вид: слева
  // направо — стеллаж/стол с компьютером, окно, стол с лампой, кровать, дверь
  // справа). Раньше были расставлены произвольно под пустой placeholder.
  hotspots: [
    {
      id: "phone",
      label: "Телефон",
      x: 14,
      y: 71,
      width: 8,
      height: 8,
      image: asset("images/ui/phone.png"),
      // Пропадает из комнаты после того, как убран в инвентарь — тот же приём,
      // что и у рюкзака выше, только условие через реальный предмет (hasItem),
      // а не UI-переменную: телефон действительно оказывается в инвентаре.
      visibleWhen: [{ type: "not", condition: { type: "hasItem", itemId: "phone" } }],
      interaction: {
        type: "take",
        itemId: "phone",
        text: "Телефон. На экране сообщение от Миши: «Ты где?»",
      },
    },
    {
      id: "backpack",
      label: "Рюкзак",
      // Стоит на полу у радиатора, рядом с гитарой. Отдельная картинка-накладка
      // (hotspot.image) поверх фона — это самостоятельный объект, а не то, что
      // нарисовано на самом home.webp, поэтому и может "исчезнуть" после того,
      // как собран (visibleWhen ниже).
      x: 24,
      y: 59,
      width: 7,
      height: 16,
      image: asset("images/ui/backpack.png"),
      visibleWhen: [{ type: "variable", key: "inventoryUnlocked", operator: "!=", value: 1 }],
      interaction: {
        type: "inspect",
        text: "Рюкзак. Пора собираться в школу.",
        // Первый осмотр рюкзака "открывает" инвентарь — до этого игрок ещё не думал
        // о том, чтобы что-то с собой носить. Не история-флаг, поэтому variables,
        // а не StoryFlag (см. GDD §42 — не заводи параллельный список флагов).
        effects: [
          { type: "setVariable", key: "inventoryUnlocked", value: 1 },
          { type: "playSfx", src: asset("audio/sfx/item-pickup.mp3") },
        ],
      },
    },
    {
      id: "window",
      label: "Окно",
      x: 27,
      y: 10,
      width: 22,
      height: 48,
      interaction: {
        type: "inspect",
        variants: [
          {
            conditions: [{ type: "flag", flag: "schoolTaskDone", value: true }],
            text: "За окном уже темно — обычный зимний вечер.",
          },
          { text: "За окном — обычное зимнее утро в посёлке." },
        ],
      },
    },
    {
      id: "computer",
      label: "Компьютер",
      x: 3,
      y: 45,
      width: 16,
      height: 25,
      interaction: {
        type: "inspect",
        text: "Старый компьютер с толстым выпуклым монитором. Занимает половину стола.",
      },
    },
    {
      id: "textbook",
      label: "Учебник",
      x: 44,
      y: 52,
      width: 8,
      height: 14,
      interaction: {
        type: "inspect",
        variants: [
          {
            conditions: [{ type: "flag", flag: "schoolTaskDone", value: true }],
            text: "Учебник по истории. Открыт на середине — надо ведь придумать тему для реферата.",
          },
          { text: "Учебник по истории. Ещё не открыт сегодня." },
        ],
      },
    },
    {
      id: "bed",
      label: "Кровать",
      x: 53,
      y: 58,
      width: 45,
      height: 38,
      interaction: {
        type: "inspect",
        text: "Кровать. Уже застелена — точнее, почти.",
      },
    },
  ],

  exits: [
    {
      id: "to_hallway",
      targetSceneId: "hallway",
      label: "В коридор",
      x: 88,
      y: 15,
      width: 12,
      height: 80,
      // Нельзя выйти из комнаты, пока не осмотрен рюкзак (та же переменная,
      // что открывает инвентарь, см. хотспот "backpack" выше) — жёсткая
      // блокировка, но с объяснением причины (CLAUDE_CODE_PROMPT.md §17).
      conditions: [{ type: "variable", key: "inventoryUnlocked", operator: "==", value: 1 }],
      lockedMessage: "Без рюкзака в школу как-то не пойдёшь — сначала собери вещи.",
    },
  ],
};
