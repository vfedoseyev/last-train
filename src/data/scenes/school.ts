import type { SceneDefinition } from "../../scenes/sceneTypes";

// Пролог, Сцена 5 — Школа (GDD §23).
export const schoolScene: SceneDefinition = {
  id: "school",
  name: "Школа",
  background: "placeholder",

  hotspots: [
    {
      id: "schedule",
      label: "Расписание",
      x: 15,
      y: 30,
      width: 15,
      height: 25,
      interaction: { type: "inspect", text: "Расписание уроков на неделю." },
    },
    {
      id: "board",
      label: "Стенд",
      x: 45,
      y: 20,
      width: 20,
      height: 20,
      interaction: {
        type: "inspect",
        variants: [
          {
            conditions: [{ type: "clueFound", clueId: "teacher_hint" }],
            text: "Стенд выпускников прошлых лет. Где-то здесь, наверное, и класс отца — интересно, в каком году.",
          },
          { text: "Стенд выпускников прошлых лет." },
        ],
      },
    },
    {
      id: "wardrobe",
      label: "Гардероб",
      x: 75,
      y: 60,
      width: 15,
      height: 25,
      interaction: { type: "inspect", text: "Гардероб. Обычная толкотня перед уроками." },
    },
    // Хотспот "archive" (Глава 3 — школьный архив, itemId school_archive,
    // clueId school_archive, setChapter:4) убран при архивировании Главы 3+.
    // Текст восстановим из истории проекта, когда Глава 3 вернётся из архива.
  ],

  exits: [
    { id: "to_street", targetSceneId: "street", label: "Наружу", x: 2, y: 30, width: 8, height: 40 },
    { id: "to_classroom", targetSceneId: "classroom", label: "В класс", x: 90, y: 30, width: 8, height: 40 },
  ],
};
