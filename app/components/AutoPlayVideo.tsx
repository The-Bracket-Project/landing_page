"use client";
import React, { useEffect, useRef } from "react";

type Props = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src" | "controls"> & {
  src: string;
  poster?: string;
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

    // Ensure autoplay-eligibility BEFORE loading the source
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.setAttribute("muted", "");

    // Always set src AFTER muted/playsInline are in place
    v.src = src;
    v.load();

    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        // ignore; will retry on events or user interaction
      }
    };

    // Retry on ready events
    const onLoadedMeta = () => tryPlay();
    const onCanPlay = () => tryPlay();
    const onLoadedData = () => tryPlay();
    v.addEventListener("loadedmetadata", onLoadedMeta);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("loadeddata", onLoadedData);

    // As a last resort, retry on visibility or first pointer
    const onVisibility = () =>
      document.visibilityState === "visible" && tryPlay();
    const onPointer = () => tryPlay();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointerdown", onPointer, {
      passive: true,
      once: true,
    });

    // Kick off initial attempt
    tryPlay();

    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("loadeddata", onLoadedData);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      // src is set programmatically in useEffect
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
