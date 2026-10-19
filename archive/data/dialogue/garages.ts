import type { Dialogue } from "../../dialogue/dialogueTypes";

// Глава 2 — Гаражи (GDD §25): содержимое кассеты.
export const garageCassetteTape: Dialogue = {
  id: "garage_cassette_tape",
  startNodeId: "start",
  nodes: [
    {
      id: "start",
      speaker: "Кассета",
      text: "(Шипение. Слышны голоса — несколько подростков о чём-то спорят.)",
      next: "n2",
    },
    { id: "n2", speaker: "Лена", text: "Я сама решу, что мне делать.", next: "n3" },
    {
      id: "n3",
      speaker: "Кассета",
      text: "(Голоса становятся громче, потом запись резко обрывается.)",
      next: "misha1",
    },
    {
      id: "misha1",
      speaker: "Миша",
      text: "Погоди... это же голос моего отца. А девушка — кто это вообще?",
    },
  ],
};
