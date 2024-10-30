import { useCallback, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { SOUND_OFF } from '../constants/localStorage';

export const useAudio = (audioPath: string, volume?: number) => {
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [audioPath],
      preload: true,
      volume: volume? volume : 1.0,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [audioPath]);

  const play = useCallback(() => {
    const isSoundOff = localStorage.getItem(SOUND_OFF) === 'true';
    if (!isSoundOff && soundRef.current) {
      soundRef.current.stop(); // Stop any currently playing instances
      soundRef.current.play();
    }
  }, []);

  const stop = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  }, []);

  return { play, stop };
};