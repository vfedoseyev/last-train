import type { GameEffect } from "../game/gameEffects";

export interface OrderingPuzzleCard {
  id: string;
  text: string;
}

// Пока нужен только один тип головоломки (ordering — см. TODO.md §24). Не заводи
// обобщённый PuzzleDefinition с полем type/data "на будущее" раньше, чем появится
// второй реальный тип (matching/combination) — см. правило "не проектируй заранее".
export interface OrderingPuzzleDefinition {
  id: string;
  title: string;
  instructions: string;
  // Порядок карточек в этом массиве — правильный ответ; при показе игроку
  // перемешивается (см. OrderingPuzzle.tsx).
  cards: OrderingPuzzleCard[];
  // Применяются при успешном решении.
  effects?: GameEffect[];
}
