import type { Dialogue } from "../../../src/dialogue/dialogueTypes";

// Перенесено из src/data/dialogue/misha_home.ts при решении сосредоточиться на
// Прологе/Главе 1 (см. TODO.md). Возвращать при продолжении работы над Главами 3/7/8.

// Глава 3 (GDD §26): Миша отказывается говорить — игрок понимает, что он знает больше.
export const mishaRefuses: Dialogue = {
  id: "misha_refuses",
  startNodeId: "start",
  nodes: [
    {
      id: "start",
      speaker: "Артём",
      text: "Миша, ты вообще знаешь что-нибудь про Лену?",
      next: "misha1",
    },
    { id: "misha1", speaker: "Миша", text: "Слушай, давай не сейчас, а?", next: "misha2" },
    { id: "misha2", speaker: "Миша", text: "Я... просто не хочу об этом. Ладно?" },
  ],
};

// Глава 7 (GDD §30-32): признание отца Миши.
export const mishaFatherConfession: Dialogue = {
  id: "misha_father_confession",
  startNodeId: "start",
  nodes: [
    {
      id: "start",
      speaker: "Артём",
      text: "Вы ведь тоже там были. В ту ночь, на вокзале.",
      next: "father1",
    },
    {
      id: "father1",
      speaker: "Отец Миши",
      text: "Да. Я был одним из последних, кто с ней говорил.",
      next: "father2",
    },
    {
      id: "father2",
      speaker: "Отец Миши",
      text: "Я должен был пойти за ней. Столько лет думаю об этом.",
      effects: [
        { type: "setFlag", flag: "fatherMishaConfession", value: true },
        { type: "discoverClue", clueId: "father_misha_confession" },
      ],
    },
  ],
};

// Глава 7 (GDD §30-32): Миша раскрывает главную тайну — доступно только после того,
// как оба отца признались. Это и есть "полная правда" (GDD §31): дальше игра
// переходит в Главу 8.
export const mishaRevealsTruth: Dialogue = {
  id: "misha_reveals_truth",
  startNodeId: "start",
  nodes: [
    {
      id: "start",
      speaker: "Миша",
      text: "Я всю жизнь думал, что это он виноват. Что если бы он тогда пошёл за ней...",
      next: "misha2",
    },
    {
      id: "misha2",
      speaker: "Миша",
      text: "Но теперь понимаю — дело не в одном человеке. Просто никто не сделал того, что мог.",
      effects: [
        { type: "setFlag", flag: "mishaKnowsTruth", value: true },
        { type: "setFlag", flag: "mishaConfession", value: true },
        { type: "setFlag", flag: "allCluesFound", value: true },
        { type: "discoverClue", clueId: "full_truth" },
        { type: "setChapter", chapter: 8 },
      ],
    },
  ],
};

// Глава 8 (GDD §33): Миша собирает вещи, готовится уехать из посёлка.
export const mishaPacking: Dialogue = {
  id: "misha_packing",
  startNodeId: "start",
  nodes: [
    { id: "start", speaker: "Миша", text: "Ну вот. Собираю вещи.", next: "misha2" },
    { id: "misha2", speaker: "Миша", text: "Не знаю, когда вернусь. Может, и не вернусь." },
  ],
};
