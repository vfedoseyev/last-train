import type { SceneId } from "../scenes/sceneTypes";
import type { Condition } from "../utils/conditions";

export interface LocationInfo {
  sceneId: SceneId;
  label: string;
  // Единый источник условий разблокировки — переиспользуется и в hotspot-переходах
  // (data/scenes/street.ts), и на экране карты (world/WorldMap.tsx),
  // чтобы они не могли разъехаться между собой.
  unlockConditions?: Condition[];
  lockedMessage?: string;
  // Позиция метки на карте (% от settlement.webp, см. WorldMap.tsx). Подобрано на
  // глаз по атмосферным ориентирам картинки (крупное здание, кластеры домов) —
  // это стилизованные пины, а не привязка к конкретному дому на изображении:
  // сгенерированная карта не подписана и не имеет узнаваемых конкретных зданий
  // (см. CLAUDE_CODE_PROMPT.md §35.1).
  x: number;
  y: number;
}

// Гаражи/Вокзал/Старый участок (Главы 2/4/6) убраны при решении сосредоточиться на
// Прологе/Главе 1 (см. TODO.md) — вернуть записи при восстановлении этих глав из
// last-train/archive/.
//
// Артём и Миша — соседи с общим двором (data/scenes/yard.ts соединён напрямую с
// misha_home, не только через street), поэтому их метки на карте специально
// сгруппированы рядом друг с другом, а не раскиданы по разным концам посёлка.
export const locations: LocationInfo[] = [
  { sceneId: "home", label: "Дом Артёма", x: 23, y: 49 },
  { sceneId: "yard", label: "Двор", x: 19, y: 60 },
  { sceneId: "street", label: "Улица", x: 42, y: 55 },
  { sceneId: "school", label: "Школа", x: 57, y: 39 },
  { sceneId: "shop_exterior", label: "Магазин", x: 71, y: 58 },
  {
    sceneId: "misha_home",
    label: "Дом Миши",
    x: 30,
    y: 57,
    unlockConditions: [{ type: "chapter", value: 1 }],
    lockedMessage: "Сейчас ещё рано идти к Мише домой.",
  },
];

// Общий хелпер для hotspot-переходов, у которых условие разблокировки берётся
// из этого файла (единственный источник истины, см. комментарий у unlockConditions
// выше) — переиспользуется в нескольких сценах (street.ts, yard.ts), чтобы не
// копировать одну и ту же логику поиска.
export function unlockOf(sceneId: SceneId) {
  const location = locations.find((l) => l.sceneId === sceneId);
  return { conditions: location?.unlockConditions, lockedMessage: location?.lockedMessage };
}
