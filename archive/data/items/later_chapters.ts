import type { InventoryItemDefinition, ItemId } from "../../../src/inventory/inventoryTypes";

// Перенесено из src/data/items/items.ts при решении сосредоточиться на
// Прологе/Главе 1 (см. TODO.md). Возвращать записи по мере восстановления Глав 2-8.
export const laterChapterItems: Partial<Record<ItemId, InventoryItemDefinition>> = {
  batteries: {
    id: "batteries",
    name: "Батарейки",
    description: "Пара старых батареек из шкафа в гараже.",
    icon: "placeholder",
  },
  cassette: {
    id: "cassette",
    name: "Кассета",
    description: "Старая запись с голосами из гаража. Лена и отец Миши поссорились.",
    icon: "placeholder",
  },
  old_photo: {
    id: "old_photo",
    name: "Старая фотография",
    description: "Подростки у гаражей. На обороте: «17 марта. Вокзал.»",
    icon: "placeholder",
  },
  school_archive: {
    id: "school_archive",
    name: "Школьный архив",
    description: "Личное дело, фотография, запись о пропаже и старое расписание.",
    icon: "placeholder",
  },
  train_schedule: {
    id: "train_schedule",
    name: "Расписание поездов",
    description: "Вечерний поезд отправлялся в 23:47. Лена на него не садилась.",
    icon: "placeholder",
  },
  station_log: {
    id: "station_log",
    name: "Журнал дежурного",
    description: "«23:05 — девушка возле второго пути».",
    icon: "placeholder",
  },
  lena_backpack: {
    id: "lena_backpack",
    name: "Рюкзак Лены",
    description: "Старый рюкзак, пролежавший на старом участке много лет.",
    icon: "placeholder",
  },
  voice_recorder: {
    id: "voice_recorder",
    name: "Диктофон",
    description: "Кассета внутри ещё цела — запись голоса Лены.",
    icon: "placeholder",
  },
  lena_letter: {
    id: "lena_letter",
    name: "Письмо Лены",
    description: "Незаконченное письмо: «...я вернусь, когда...»",
    icon: "placeholder",
  },
  lena_ticket: {
    id: "lena_ticket",
    name: "Старый билет",
    description: "Билет на автобус до города — хранился у неё в сумке.",
    icon: "placeholder",
  },
  photograph: {
    id: "photograph",
    name: "Фотография Лены",
    description: "Лена смеётся, рядом друзья.",
    icon: "placeholder",
  },
  pendant: {
    id: "pendant",
    name: "Кулон",
    description: "Простой кулон на тонкой цепочке.",
    icon: "placeholder",
  },
};
