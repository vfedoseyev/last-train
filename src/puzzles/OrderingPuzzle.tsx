import { useEffect, useState } from "react";
import { useGame } from "../game/GameContext";
import { puzzles } from "./puzzleRegistry";
import { executeEffects } from "../game/effectExecutor";
import "./OrderingPuzzle.css";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function OrderingPuzzle() {
  const { state, dispatch } = useGame();
  const puzzle = state.activePuzzleId ? puzzles[state.activePuzzleId] : null;

  const [shuffledIds, setShuffledIds] = useState<string[]>([]);
  const [pickedIds, setPickedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "solved">("idle");

  // Перемешиваем один раз при открытии конкретной головоломки, а не на каждый рендер.
  useEffect(() => {
    if (puzzle) {
      setShuffledIds(shuffle(puzzle.cards.map((card) => card.id)));
      setPickedIds([]);
      setFeedback("idle");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activePuzzleId]);

  if (!puzzle) return null;

  const cardsById = Object.fromEntries(puzzle.cards.map((card) => [card.id, card]));
  const correctOrder = puzzle.cards.map((card) => card.id);

  const handlePick = (cardId: string) => {
    if (feedback === "solved") return;

    const next = [...pickedIds, cardId];
    setPickedIds(next);

    if (next.length === correctOrder.length) {
      const isCorrect = next.every((id, index) => id === correctOrder[index]);
      if (isCorrect) {
        setFeedback("solved");
        dispatch({ type: "SOLVE_PUZZLE", puzzleId: puzzle.id });
        if (puzzle.effects) executeEffects(puzzle.effects, dispatch);
      } else {
        setFeedback("wrong");
      }
    }
  };

  const handleReset = () => {
    setPickedIds([]);
    setFeedback("idle");
  };

  const handleClose = () => dispatch({ type: "SET_PUZZLE", puzzleId: null });

  return (
    <div className="ordering-puzzle">
      <div className="ordering-puzzle__title">{puzzle.title}</div>
      <div className="ordering-puzzle__instructions">{puzzle.instructions}</div>

      <div className="ordering-puzzle__picked">
        {pickedIds.map((id, index) => (
          <div key={id} className="ordering-puzzle__picked-item">
            {index + 1}. {cardsById[id].text}
          </div>
        ))}
      </div>

      {feedback === "wrong" && (
        <div className="ordering-puzzle__feedback">Не то. Попробуй ещё раз.</div>
      )}

      {feedback === "solved" ? (
        <>
          <div className="ordering-puzzle__feedback ordering-puzzle__feedback--solved">
            Порядок событий восстановлен.
          </div>
          <button type="button" onClick={handleClose}>
            Закрыть
          </button>
        </>
      ) : (
        <>
          <div className="ordering-puzzle__cards">
            {shuffledIds
              .filter((id) => !pickedIds.includes(id))
              .map((id) => (
                <button key={id} type="button" onClick={() => handlePick(id)}>
                  {cardsById[id].text}
                </button>
              ))}
          </div>
          <div className="ordering-puzzle__actions">
            <button type="button" onClick={handleReset} disabled={pickedIds.length === 0}>
              Сбросить
            </button>
            <button type="button" onClick={handleClose}>
              Отложить
            </button>
          </div>
        </>
      )}
    </div>
  );
}
