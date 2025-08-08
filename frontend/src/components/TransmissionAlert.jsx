import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TransmissionAlert({ visible, text, onDone }) {
  const beepRef = useRef(null);
  const glitchRef = useRef(null);

  useEffect(() => {
    if (!visible) return;
    
    // Only try to play if we have valid audio references
    const playAudioSafely = async (audioRef) => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.log("Audio playback blocked:", error.message);
        }
      }
    };

    // Play alert sounds
    playAudioSafely(beepRef);
    
    // Stagger second SFX
    setTimeout(() => {
      playAudioSafely(glitchRef);
    }, 140);

    // Auto-clear after animation
    const timer = setTimeout(() => {
      onDone && onDone();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [visible, onDone]);

  return (
    <>
      {/* Pre-load audio elements */}
      <audio ref={beepRef} preload="auto" src="/audio/alert-beep.mp3" />
      <audio ref={glitchRef} preload="auto" src="/audio/glitch-sfx.mp3" />
      
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="pointer-events-auto bg-black/70 p-6 rounded-lg text-center portal portalPulse">
              <motion.h1
                data-text={text}
                className="text-3xl md:text-5xl glitch"
                initial={{ y: -8 }}
                animate={{ y: [-8, 0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 0.9 }}
              >
                {text}
              </motion.h1>
              <p className="mt-3 text-sm opacity-75">Incoming transmission…</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}