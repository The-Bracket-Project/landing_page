"use client";
import React, { useEffect, useRef } from "react";

type Props = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src" | "controls"> & {
  src: string;
  poster?: string; // optional; leave undefined to start from first frame
};

export default function AutoPlayVideo({
  src,
  poster,
  className = "",
  style,
  ...rest
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Make it autoplay-eligible BEFORE loading the source
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.autoplay = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.setAttribute("muted", "");
    v.setAttribute("autoplay", "");

    // Set/refresh src AFTER flags are set
    v.src = src;

    let cancelled = false;

    const tryPlay = async () => {
      if (!videoRef.current || cancelled) return;
      try {
        await v.play();
      } catch {
        // ignore; we'll retry on more events or user interaction
      }
    };

    // Retry on multiple readiness signals (covers more iOS paths)
    const onLoadedMetadata = () => tryPlay();
    const onLoadedData = () => tryPlay();
    const onCanPlay = () => tryPlay();
    const onCanPlayThrough = () => tryPlay();
    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    v.addEventListener("loadedmetadata", onLoadedMetadata);
    v.addEventListener("loadeddata", onLoadedData);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("canplaythrough", onCanPlayThrough);
    document.addEventListener("visibilitychange", onVisibility);

    // First attempt (some devices accept an immediate call)
    tryPlay();

    // Fallback: first user pointer (anywhere) -> try play once
    const onPointer = () => tryPlay();
    window.addEventListener("pointerdown", onPointer, { passive: true, once: true });

    return () => {
      cancelled = true;
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("loadeddata", onLoadedData);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("canplaythrough", onCanPlayThrough);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      // src set programmatically in effect
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      controls={false}
      controlsList="nodownload nofullscreen noplaybackrate noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      className={`w-full h-full object-cover block ${className}`}
      style={{ outline: "none", ...(style || {}) }}
      {...rest}
    />
  );
}
