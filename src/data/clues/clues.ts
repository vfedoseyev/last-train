import type { ClueDefinition } from "../../journal/clueTypes";

// Первая улика появляется в Главе 1 (GDD §24) — до этого Артём ещё не знает о Лене (GDD §23).
// Улики Глав 2-8 перенесены в archive/data/clues/later_chapters.ts —
// решение сосредоточиться на Прологе/Главе 1, см. TODO.md.
export const clues: Record<string, ClueDefinition> = {
  teacher_hint: {
    id: "teacher_hint",
    title: "Странная реакция учительницы",
    text: "Она вроде бы случайно спросила, не сын ли я Сергея — а потом сказала «тогда понятно» и ушла от ответа. Что понятно?",
  },
  misha_strange_feeling: {
    id: "misha_strange_feeling",
    title: "Что-то с Мишей не так",
    text: "Он сказал, что всё нормально. Но, кажется, сам не очень в это верит.",
  },
};
