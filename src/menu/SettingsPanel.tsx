import type { Settings } from "./settings";

interface SettingsPanelProps {
  settings: Settings;
  onChange: (settings: Settings) => void;
  onClose: () => void;
}

export function SettingsPanel({ settings, onChange, onClose }: SettingsPanelProps) {
  return (
    <div className="menu__panel">
      <div className="menu__row">
        <span>Размер текста:</span>
        <button
          type="button"
          className="menu__button"
          onClick={() =>
            onChange({ ...settings, textSize: settings.textSize === "normal" ? "large" : "normal" })
          }
        >
          {settings.textSize === "normal" ? "Обычный" : "Крупный"}
        </button>
      </div>
      <div className="menu__row">
        <span>Громкость музыки:</span>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={Math.round(settings.musicVolume * 100)}
          onChange={(event) => onChange({ ...settings, musicVolume: Number(event.target.value) / 100 })}
          aria-label="Громкость музыки"
        />
        <span>{Math.round(settings.musicVolume * 100)}%</span>
      </div>
      <div className="menu__row">
        <span>Громкость эффектов:</span>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={Math.round(settings.sfxVolume * 100)}
          onChange={(event) => onChange({ ...settings, sfxVolume: Number(event.target.value) / 100 })}
          aria-label="Громкость эффектов"
        />
        <span>{Math.round(settings.sfxVolume * 100)}%</span>
      </div>
      <button type="button" className="menu__button" onClick={onClose}>
        Назад
      </button>
    </div>
  );
}
