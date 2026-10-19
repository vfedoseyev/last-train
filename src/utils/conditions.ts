import type { GameState } from "../game/GameState";
import type { StoryFlag } from "../game/storyFlags";
import type { ItemId } from "../inventory/inventoryTypes";

export type Condition =
  | { type: "flag"; flag: StoryFlag; value: boolean }
  | { type: "hasItem"; itemId: ItemId }
  | { type: "questComplete"; questId: string }
  | { type: "chapter"; value: number }
  | { type: "clueFound"; clueId: string }
  | { type: "variable"; key: string; operator: "==" | "!=" | ">" | "<"; value: number | string }
  | { type: "all"; conditions: Condition[] }
  | { type: "any"; conditions: Condition[] }
  | { type: "not"; condition: Condition };

export function evaluateCondition(condition: Condition, state: GameState): boolean {
  switch (condition.type) {
    case "flag":
      return (state.flags[condition.flag] ?? false) === condition.value;
    case "hasItem":
      return state.inventory.includes(condition.itemId);
    case "questComplete":
      return state.completedQuests.includes(condition.questId);
    case "chapter":
      return state.currentChapter >= condition.value;
    case "clueFound":
      return state.discoveredClues.includes(condition.clueId);
    case "variable":
      return evaluateVariableCondition(condition, state);
    case "all":
      return condition.conditions.every((c) => evaluateCondition(c, state));
    case "any":
      return condition.conditions.some((c) => evaluateCondition(c, state));
    case "not":
      return !evaluateCondition(condition.condition, state);
  }
}

function evaluateVariableCondition(
  condition: Extract<Condition, { type: "variable" }>,
  state: GameState
): boolean {
  const current = state.variables[condition.key];

  if (condition.operator === "==") return current === condition.value;
  if (condition.operator === "!=") return current !== condition.value;

  if (typeof current !== "number" || typeof condition.value !== "number") return false;
  return condition.operator === ">" ? current > condition.value : current < condition.value;
}

export function evaluateConditions(
  conditions: Condition[] | undefined,
  state: GameState
): boolean {
  if (!conditions || conditions.length === 0) return true;
  return conditions.every((condition) => evaluateCondition(condition, state));
}
