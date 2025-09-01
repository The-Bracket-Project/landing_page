"use client";
import React, { useEffect, useRef } from "react";

type Props = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
};

export default function AutoPlayVideo({ src, className = "", style, ...rest }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const triedRef = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Ensure iOS/WebKit-friendly inline muted autoplay
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const tryPlay = async () => {
      if (!v) return;
      try {
        await v.play();
      } catch {
        // Swallow; iOS may still require a user gesture. We'll retry on interaction.
      }
    };

    // Initial attempt
    tryPlay();

    // Retry on canplay and visibility user interactions
    const onCanPlay = () => tryPlay();
    v.addEventListener("canplay", onCanPlay);

    const onFirstInteract = () => {
      if (triedRef.current) return;
      triedRef.current = true;
      tryPlay();
      window.removeEventListener("touchstart", onFirstInteract);
      window.removeEventListener("click", onFirstInteract, true);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    window.addEventListener("touchstart", onFirstInteract, { passive: true });
    window.addEventListener("click", onFirstInteract, true);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      window.removeEventListener("touchstart", onFirstInteract);
      window.removeEventListener("click", onFirstInteract, true);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      controls={false}
      controlsList="nodownload nofullscreen noplaybackrate"
      disablePictureInPicture
      {...rest}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
