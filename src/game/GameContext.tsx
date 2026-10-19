import { createContext, useCallback, useContext, useEffect, useReducer, useRef, useState } from "react";
import type { Dispatch, ReactNode } from "react";
import { gameReducer } from "./gameReducer";
import { initialGameState } from "./GameState";
import type { GameState } from "./GameState";
import type { GameAction } from "./gameActions";
import { loadGame } from "../save/loadGame";
import { saveGame } from "../save/saveGame";
import { playSfx } from "../audio/sfx";
import { asset } from "../utils/asset";

export type SceneTransitionPhase = "idle" | "out" | "in";

// Длительность одной фазы (затухание ИЛИ осветление) в мс — держи в паре с
// анимациями в scenes/SceneTransitionOverlay.css, иначе задержка dispatch
// разойдётся с тем, что видит игрок.
export const SCENE_TRANSITION_MS = 250;

interface GameContextValue {
  state: GameState;
  dispatch: Dispatch<GameAction>;
  transitionPhase: SceneTransitionPhase;
}

const GameContext = createContext<GameContextValue | null>(null);

function initGameState(): GameState {
  return loadGame() ?? initialGameState;
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, realDispatch] = useReducer(gameReducer, undefined, initGameState);
  const [transitionPhase, setTransitionPhase] = useState<SceneTransitionPhase>("idle");
  // Источник истины для гонок между быстрыми повторными CHANGE_SCENE — состояние
  // React обновляется асинхронно, а решение "уже идёт переход?" нужно синхронно
  // в момент dispatch, поэтому ref, а не проверка transitionPhase из замыкания.
  const phaseRef = useRef<SceneTransitionPhase>("idle");

  const setPhase = useCallback((phase: SceneTransitionPhase) => {
    phaseRef.current = phase;
    setTransitionPhase(phase);
  }, []);

  // Любой CHANGE_SCENE (из SceneExit, WorldMap, будущих GameEffect) проходит через
  // затухание/осветление здесь — на уровне dispatch, а не в каждом месте, которое
  // меняет сцену. Пока фаза не идёт "idle", повторные CHANGE_SCENE игнорируются —
  // иначе быстрый повторный клик мог бы запустить два перекрывающихся перехода.
  const dispatch = useCallback<Dispatch<GameAction>>(
    (action) => {
      if (action.type !== "CHANGE_SCENE") {
        realDispatch(action);
        return;
      }

      if (phaseRef.current !== "idle") return;

      playSfx(asset("audio/sfx/scene-transition.mp3"));
      setPhase("out");
      window.setTimeout(() => {
        realDispatch(action);
        setPhase("in");
        window.setTimeout(() => setPhase("idle"), SCENE_TRANSITION_MS);
      }, SCENE_TRANSITION_MS);
    },
    [setPhase]
  );

  // Автосохранение после любого изменения состояния — покрывает переход сцены,
  // получение предмета, диалог и т.д. (TECHNICAL ARCHITECTURE.md §57).
  useEffect(() => {
    saveGame(state);
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch, transitionPhase }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
