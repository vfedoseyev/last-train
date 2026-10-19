import type { Condition } from "../utils/conditions";

export interface HintRule {
  id: string;
  // ANDed внутри одного правила. Правила проверяются по порядку — первое
  // подошедшее и есть подсказка, так что более специфичные/поздние состояния
  // должны идти раньше общих (тот же принцип, что у variants хотспотов).
  conditions: Condition[];
  text: string;
}

export const hintRules: HintRule[] = [
  {
    id: "chapter1_clue_found",
    conditions: [{ type: "chapter", value: 1 }, { type: "clueFound", clueId: "teacher_hint" }],
    text: "Ты уже кое-что заметил сегодня. Можно просто исследовать посёлок — вдруг найдётся что-то ещё интересное.",
  },
  {
    id: "chapter1_explore",
    conditions: [{ type: "chapter", value: 1 }],
    text: "Попробуй зайти в школу и снова поговорить с учительницей — или загляни к Мише домой.",
  },
  {
    id: "after_school",
    conditions: [{ type: "flag", flag: "schoolTaskDone", value: true }],
    text: "После уроков тебя, кажется, кто-то ищет — не в школе, а на улице.",
  },
  {
    id: "go_to_school",
    conditions: [{ type: "flag", flag: "metMisha", value: true }],
    text: "Пора в школу — учитель, наверное, уже начал урок.",
  },
  {
    id: "need_backpack",
    // Из комнаты не выйти без рюкзака (data/scenes/home.ts, exit "to_hallway") —
    // подсказка должна указывать именно на это, а не на общее "осмотрись".
    conditions: [{ type: "variable", key: "inventoryUnlocked", operator: "!=", value: 1 }],
    text: "Без рюкзака из дома не выйти — собери вещи в своей комнате.",
  },
  {
    id: "start",
    conditions: [],
    text: "Может, стоит выйти во двор?",
  },
];
