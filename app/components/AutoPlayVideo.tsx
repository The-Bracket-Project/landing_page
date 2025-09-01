"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'controls'> & {
  src: string;
  poster?: string;
};

export default function AutoPlayVideo({ src, poster = "/placeholder.jpg", className = "", style, ...rest }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const triedRef = useRef(false);
  const [needsPlay, setNeedsPlay] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Ensure iOS/WebKit-friendly inline muted autoplay
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.setAttribute("muted", "");

    const tryPlay = async () => {
      if (!v) return;
      try {
        await v.play();
        setNeedsPlay(false);
      } catch {
        // iOS may still require a user gesture; show overlay to hint tap-to-play
        setNeedsPlay(true);
      }
    };

    // Initial attempt
    tryPlay();

    // Retry on canplay and visibility user interactions
    const onCanPlay = () => tryPlay();
    const onLoadedMeta = () => tryPlay();
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("loadedmetadata", onLoadedMeta);

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
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      window.removeEventListener("touchstart", onFirstInteract);
      window.removeEventListener("click", onFirstInteract, true);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className={className} style={style}>
      <video
        ref={videoRef}
        src={src}
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
        className="w-full h-full object-cover block"
        style={{ outline: 'none' }}
        {...rest}
      />
      {needsPlay && (
        <button
          type="button"
          aria-label="Play video"
          onClick={() => {
            const v = videoRef.current;
            if (!v) return;
            v.muted = true;
            v.defaultMuted = true;
            v.playsInline = true;
            v.play().then(() => setNeedsPlay(false)).catch(() => setNeedsPlay(true));
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/20 text-white"
        >
          <svg width="54" height="54" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );
}
