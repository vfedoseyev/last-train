import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { GameProvider, useGame, SCENE_TRANSITION_MS } from "../game/GameContext";
import { Game } from "../game/Game";
import { MainMenu } from "../menu/MainMenu";
import { Epilogue } from "../epilogue/Epilogue";
import { Intro } from "../intro/Intro";
import { hasSaveGame } from "../save/loadGame";
import { loadSettings, saveSettings } from "../menu/settings";
import type { Settings } from "../menu/settings";
import { useBackgroundMusic } from "../audio/useBackgroundMusic";
import { setSfxVolume } from "../audio/sfx";
import { asset } from "../utils/asset";
import "../scenes/SceneTransitionOverlay.css";
import "./App.css";

type Screen = "menu" | "intro" | "playing";
type TransitionPhase = "idle" | "out" | "in";

function AppShell() {
  const { state, dispatch } = useGame();
  const [screen, setScreen] = useState<Screen>("menu");
  const [settings, setSettings] = useState<Settings>(() => loadSettings());
  // Затемнение при старте новой игры (меню -> вступление) — тот же приём, что и
  // смена сцен/слайдов, но здесь нет CHANGE_SCENE для перехвата, поэтому локальная
  // фаза. Таймеры чистим на всякий случай при размонтировании (StrictMode/навигация).
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>("idle");
  const timeoutsRef = useRef<number[]>([]);

  useEffect(
    () => () => timeoutsRef.current.forEach((id) => window.clearTimeout(id)),
    [],
  );

  const handleNewGame = () => {
    setTransitionPhase("out");
    timeoutsRef.current.push(
      window.setTimeout(() => {
        dispatch({ type: "RESET_GAME" });
        setScreen("intro");
        setTransitionPhase("in");
        timeoutsRef.current.push(window.setTimeout(() => setTransitionPhase("idle"), SCENE_TRANSITION_MS));
      }, SCENE_TRANSITION_MS),
    );
  };

  const handleIntroFinish = () => {
    setScreen("playing");
  };

  const handleReturnToMenuFromEnding = () => {
    dispatch({ type: "RESET_GAME" });
    setScreen("menu");
  };

  const handleSettingsChange = (next: Settings) => {
    setSettings(next);
    saveSettings(next);
  };

  // rem-единицы во всём приложении завязаны на font-size <html>, поэтому
  // переключатель размера текста работает через класс на корневом элементе.
  useEffect(() => {
    document.documentElement.classList.toggle("text-size-large", settings.textSize === "large");
  }, [settings.textSize]);

  // Меню и вступление — один трек, игра (и финал) — другой. Хук должен
  // вызываться безусловно (до любых ранних return), поэтому считаем src здесь,
  // а не внутри веток ниже.
  const musicSrc = asset(screen === "playing" || state.ending ? "audio/game-theme.mp3" : "audio/menu-theme.mp3");
  useBackgroundMusic(musicSrc, settings.musicVolume);

  // Громкость эффектов живёт вне React (audio/sfx.ts) — Hotspot.tsx и
  // GameContext.tsx, которые реально проигрывают звуки, не имеют доступа к
  // Settings (тот живёт здесь, в AppShell), поэтому синхронизируем значение
  // при каждом изменении, а не передаём его туда пропсами через полдерева.
  useEffect(() => {
    setSfxVolume(settings.sfxVolume);
  }, [settings.sfxVolume]);

  // Концовка вычисляется один раз в конце игры (см. game/ending.ts) — как только
  // она есть, игра закончена, и экран сцены больше не показывается.
  if (state.ending) {
    return <Epilogue onReturnToMenu={handleReturnToMenuFromEnding} />;
  }

  const content =
    screen === "intro" ? (
      <Intro onFinish={handleIntroFinish} />
    ) : screen === "menu" ? (
      <MainMenu
        hasSave={hasSaveGame()}
        onNewGame={handleNewGame}
        onContinue={() => setScreen("playing")}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
    ) : (
      <Game onOpenMenu={() => setScreen("menu")} />
    );

  return (
    <>
      {content}
      {transitionPhase !== "idle" && (
        <div
          className={`app__transition-overlay app__transition-overlay--${transitionPhase}`}
          style={{ "--scene-transition-ms": `${SCENE_TRANSITION_MS}ms` } as CSSProperties}
        />
      )}
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <AppShell />
    </GameProvider>
  );
}

export default App;
