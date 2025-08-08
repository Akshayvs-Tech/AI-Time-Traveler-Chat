import React, { useEffect, useRef, useState } from "react";

export default function BackgroundMusic({ currentCharacter }) {
  const audioRef = useRef(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  // Array of sound files - make sure these files exist
  const soundFiles = [
    "/audio/eerie-loop-1.mp3",
    "/audio/eerie-loop-2.mp3",
    "/audio/eerie-loop-3.mp3",
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    // Preload audio files
    const preloadAudio = async (src) => {
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error(`Failed to load audio: ${src}`);
        return true;
      } catch (error) {
        console.error(`Error loading audio ${src}:`, error);
        return false;
      }
    };

    const getRandomSound = async () => {
      const availableSounds = await Promise.all(
        soundFiles.map(async (file) => ({
          file,
          available: await preloadAudio(file),
        }))
      );

      const validSounds = availableSounds.filter((s) => s.available);
      if (validSounds.length === 0) return null;

      const randomIndex = Math.floor(Math.random() * validSounds.length);
      return validSounds[randomIndex].file;
    };

    const playSound = async () => {
      try {
        const soundFile = await getRandomSound();
        if (!soundFile) return;

        audio.src = soundFile;
        await audio.load();

        const playPromise = audio.play();
        if (playPromise) {
          playPromise
            .then(() => {
              setTimeout(() => {
                if (audio) {
                  audio.pause();
                  audio.currentTime = 0;
                }
              }, 10000);
            })
            .catch((error) => {
              if (error.name === "AbortError") {
                console.log("Playback aborted");
              } else {
                console.error("Playback error:", error);
              }
            });
        }
      } catch (error) {
        console.error("Error in playSound:", error);
      }
    };

    const scheduleNextSound = () => {
      const delay = 45000 + Math.random() * 30000;
      return setTimeout(() => {
        playSound();
        timeoutRef.current = scheduleNextSound();
      }, delay);
    };

    const timeoutRef = { current: null };

    const handleFirstInteraction = async () => {
      await playSound();
      timeoutRef.current = scheduleNextSound();
      setIsAudioLoaded(true);

      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    // Handle character-specific sounds
    if (currentCharacter && isAudioLoaded) {
      const glitchAudio = new Audio("/sounds/glitch.mp3");
      glitchAudio.volume = 0.5;

      const alerts = {
        pirate: "Arrr! Ye be trippin' the wires, matey!",
        robot: "SYSTEM ERROR: Glitch detected. Rebooting protocols.",
        farmer: "Well, butter my biscuit! Somethin's gone wonky.",
        knight: "By the king's decree! A foul glitch hath appeared!",
        scientist: "Eureka! An anomaly in the system detected.",
      };

      if (alerts[currentCharacter]) {
        glitchAudio.play().catch(console.error);
        alert(alerts[currentCharacter]);
      }
    }

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [currentCharacter, isAudioLoaded]);

  return <audio ref={audioRef} preload="auto" />;
}
