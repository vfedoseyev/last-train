import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { introSlides } from "./introSlides";
import { SCENE_TRANSITION_MS } from "../game/GameContext";
import "../scenes/SceneTransitionOverlay.css";
import "./Intro.css";

const SLIDE_DURATION_MS = 3000;

type Phase = "visible" | "out" | "in";

interface IntroProps {
  onFinish: () => void;
}

export function Intro({ onFinish }: IntroProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("visible");
  // Клик по экрану пропускает ожидание и продвигает слайд сразу же — таймеры
  // из обоих источников (авто-таймер и ручной клик) должны гаситься друг другом.
  const timeoutsRef = useRef<number[]>([]);

  const clearTimers = () => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

  useEffect(() => clearTimers, []);

  const advance = () => {
    if (phase !== "visible") return;
    clearTimers();

    if (index + 1 >= introSlides.length) {
      // Затемняем перед уходом из вступления, чтобы переход в игру не был резким.
      setPhase("out");
      timeoutsRef.current.push(window.setTimeout(onFinish, SCENE_TRANSITION_MS));
      return;
    }

    setPhase("out");
    timeoutsRef.current.push(
      window.setTimeout(() => {
        setIndex((current) => current + 1);
        setPhase("in");
        timeoutsRef.current.push(window.setTimeout(() => setPhase("visible"), SCENE_TRANSITION_MS));
      }, SCENE_TRANSITION_MS),
    );
  };

  useEffect(() => {
    if (phase !== "visible") return undefined;
    const id = window.setTimeout(advance, SLIDE_DURATION_MS);
    timeoutsRef.current.push(id);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, phase]);

  const handleSkip: React.MouseEventHandler = (event) => {
    // Останавливаем всплытие, иначе клик по кнопке ещё и сработает как advance
    // на родительском div — двойное срабатывание.
    event.stopPropagation();
    clearTimers();
    onFinish();
  };

  const slide = introSlides[index];

  return (
    <div className="intro" onClick={advance}>
      <button type="button" className="intro__skip" onClick={handleSkip}>
        Пропустить
      </button>
      {slide.image ? (
        <img className="intro__background" src={slide.image} alt="" />
      ) : (
        <div className="intro__background--placeholder">{slide.imageLabel}</div>
      )}
      <div className="intro__scrim" />
      <div className="intro__text">{slide.text}</div>
      {phase !== "visible" && (
        <div
          className={`scene-transition-overlay scene-transition-overlay--${phase}`}
          style={{ "--scene-transition-ms": `${SCENE_TRANSITION_MS}ms` } as CSSProperties}
        />
      )}
    </div>
  );
}
