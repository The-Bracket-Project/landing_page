// ./components/AutoPlayVideo.tsx
"use client";
import { useEffect, useRef } from "react";

type Props = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** How long to hold the last frame before looping (ms) */
  holdOnEndMs?: number;
  /** Force normal loop with no hold (optional) */
  loop?: boolean;
};

export default function AutoPlayVideo({
  src,
  className,
  style,
  holdOnEndMs = 10000, // 10s
  loop = false,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Ensure autoplay works cross-browser
    el.muted = true;

    const playWithCatch = (video: HTMLVideoElement | null) => {
      if (!video) return;
      const playResult = video.play();
      if (playResult && typeof playResult.catch === "function") {
        playResult.catch(() => {
          // Browsers may pause background videos to save power; ignore the rejection.
        });
      }
    };

    const cleanupTimer = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const onEnded = () => {
      if (loop) {
        el.currentTime = 0;
        playWithCatch(el);
        return;
      }
      // Keep last frame visible; Safari-safe: seek slightly before the end
      const d = el.duration || 0;
      if (isFinite(d) && d > 0) {
        try { el.currentTime = Math.max(0, d - 0.05); } catch { /* no-op */ }
      }
      el.pause();

      // Wait, then loop
      cleanupTimer();
      timerRef.current = window.setTimeout(() => {
        const v = ref.current;
        if (!v) return;
        v.currentTime = 0;
        playWithCatch(v);
      }, holdOnEndMs);
    };

    const tryPlay = () => playWithCatch(el);

    el.addEventListener("ended", onEnded);
    el.addEventListener("play", cleanupTimer); // if it restarts early, clear timer
    if (el.readyState >= 2) tryPlay();
    else el.addEventListener("canplay", tryPlay, { once: true });

    return () => {
      cleanupTimer();
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", cleanupTimer);
      el.removeEventListener("canplay", tryPlay);
    };
  }, [src, holdOnEndMs, loop]);

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      style={style}
      playsInline
      muted
      autoPlay
      preload="auto"
      // no `loop` attribute — we control it manually
    />
  );
}
