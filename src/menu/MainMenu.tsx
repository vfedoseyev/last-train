import { useState } from "react";
import type { Settings } from "./settings";
import { SettingsPanel } from "./SettingsPanel";
import { asset } from "../utils/asset";
import "./Menu.css";

// Путь к фоновой картинке должен учитывать Vite base (GitHub Pages отдаёт не с
// корня домена) — инлайн background-image полностью перекрывает значение из
// Menu.css, а не складывается с ним, поэтому градиент собран здесь же, одной
// строкой, а не разнесён между CSS и компонентом.
const menuBackgroundStyle = {
  backgroundImage: `linear-gradient(90deg, rgba(8, 11, 18, 0.88) 0%, rgba(8, 11, 18, 0.55) 45%, rgba(8, 11, 18, 0.25) 100%), url("${asset("images/intro/slide1.webp")}")`,
};

interface MainMenuProps {
  hasSave: boolean;
  onNewGame: () => void;
  onContinue: () => void;
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export function MainMenu({
  hasSave,
  onNewGame,
  onContinue,
  settings,
  onSettingsChange,
}: MainMenuProps) {
  const [showSettings, setShowSettings] = useState(false);

  if (showSettings) {
    return (
      <div className="menu" style={menuBackgroundStyle}>
        <div className="menu__title">Последний поезд</div>
        <SettingsPanel
          settings={settings}
          onChange={onSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      </div>
    );
  }

  return (
    <div className="menu" style={menuBackgroundStyle}>
      <div className="menu__title">Последний поезд</div>
      <div className="menu__tagline">Не было злодея. Не было убийцы.</div>
      <button type="button" className="menu__button" onClick={onNewGame}>
        Новая игра
      </button>
      <button type="button" className="menu__button" onClick={onContinue} disabled={!hasSave}>
        Продолжить
      </button>
      <button type="button" className="menu__button" onClick={() => setShowSettings(true)}>
        Настройки
      </button>
    </div>
  );
}
