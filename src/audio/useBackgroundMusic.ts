import { useEffect, useRef } from "react";

// Общий <audio> на всё приложение, а не по экземпляру хука/компонента — иначе
// смена src при каждом ре-рендере пересоздавала бы элемент и сбрасывала бы
// прогресс трека.
let sharedAudio: HTMLAudioElement | null = null;
function getAudio(): HTMLAudioElement | null {
  if (typeof Audio === "undefined") return null;
  if (!sharedAudio) {
    sharedAudio = new Audio();
    sharedAudio.loop = true;
  }
  return sharedAudio;
}

// Браузеры блокируют autoplay со звуком до первого жеста пользователя на
// странице — если play() сорвался по этой причине, повторяем на первый же
// клик/нажатие клавиши где угодно, а не молчим до следующей смены трека.
function playWithAutoplayRetry(audio: HTMLAudioElement) {
  audio.play().catch(() => {
    const retry = () => {
      audio.play().catch(() => {});
    };
    document.addEventListener("pointerdown", retry, { once: true });
    document.addEventListener("keydown", retry, { once: true });
  });
}

// volume: 0..1 — 0 просто ставит на паузу (экономит ресурсы), а не оставляет
// звук крутиться беззвучно.
export function useBackgroundMusic(src: string | null, volume: number) {
  const lastSrcRef = useRef<string | null>(null);

  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;

    audio.volume = volume;

    if (volume <= 0 || !src) {
      audio.pause();
      return;
    }

    if (lastSrcRef.current !== src) {
      lastSrcRef.current = src;
      audio.src = src;
    }

    playWithAutoplayRetry(audio);
  }, [src, volume]);
}
