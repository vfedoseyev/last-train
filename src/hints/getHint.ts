import type { GameState } from "../game/GameState";
import { evaluateConditions } from "../utils/conditions";
import { hintRules } from "./hintRules";

// Последнее правило в hintRules имеет пустые conditions ([]), которые
// evaluateConditions всегда считает выполненными — так что find() гарантированно
// находит совпадение, и резервный текст здесь не должен понадобиться.
export function getHint(state: GameState): string {
  const rule = hintRules.find((r) => evaluateConditions(r.conditions, state));
  return rule?.text ?? "Продолжай исследовать посёлок.";
}
