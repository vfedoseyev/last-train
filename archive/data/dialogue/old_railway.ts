import type { Dialogue } from "../../dialogue/dialogueTypes";

// Глава 6 — Пурга (GDD §29): запись на диктофоне Лены.
export const lenaVoiceRecording: Dialogue = {
  id: "lena_voice_recording",
  startNodeId: "start",
  nodes: [
    {
      id: "start",
      speaker: "Диктофон",
      text: "(Щелчок, затем голос — усталый, чуть дрожащий.)",
      next: "lena1",
    },
    {
      id: "lena1",
      speaker: "Лена",
      text: "Не знаю, почему все вечно лезут советовать, что мне делать.",
      next: "lena2",
    },
    {
      id: "lena2",
      speaker: "Лена",
      text: "Я не собираюсь никуда пропадать. Просто хочу немного побыть одна.",
      // Эмоциональная кульминация главы — переводит игру в Главу 7.
      effects: [{ type: "setChapter", chapter: 7 }],
    },
  ],
};
