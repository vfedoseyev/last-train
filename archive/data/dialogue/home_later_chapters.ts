import type { Dialogue } from "../../../src/dialogue/dialogueTypes";

// Перенесено из src/data/dialogue/home.ts при решении сосредоточиться на
// Прологе/Главе 1 (см. TODO.md). Возвращать при продолжении работы над Главой 3/7.

// Глава 3 (GDD §26): первая серьёзная реакция отца на имя Лены.
export const fatherAboutLena: Dialogue = {
  id: "father_about_lena",
  startNodeId: "start",
  nodes: [
    { id: "start", speaker: "Артём", text: "Пап, ты знал Лену?", next: "father1" },
    { id: "father1", speaker: "Отец", text: "Откуда ты это имя взял?", next: "artem2" },
    { id: "artem2", speaker: "Артём", text: "Просто... слышал где-то.", next: "father2" },
    {
      id: "father2",
      speaker: "Отец",
      text: "Мало ли что где услышишь. Иди готовиться к школе.",
      effects: [
        { type: "setFlag", flag: "fatherAsked", value: true },
        { type: "discoverClue", clueId: "father_reaction" },
      ],
    },
  ],
};

// Глава 7 (GDD §30): признание отца Артёма.
export const fatherConfession: Dialogue = {
  id: "father_confession",
  startNodeId: "start",
  nodes: [
    {
      id: "start",
      speaker: "Артём",
      text: "Пап... я знаю, что тогда произошло. Почему ты столько лет молчал?",
      next: "father1",
    },
    {
      id: "father1",
      speaker: "Отец",
      text: "Я знал, что она ушла после ссоры. Знал, что началась метель.",
      next: "father2",
    },
    {
      id: "father2",
      speaker: "Отец",
      text: "Мы просто... решили, что так будет проще. Для всех.",
      effects: [
        { type: "setFlag", flag: "fatherConfession", value: true },
        { type: "discoverClue", clueId: "father_confession" },
      ],
    },
  ],
};
