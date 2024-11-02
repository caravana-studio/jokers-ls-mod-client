import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";

type AnimationProps = {
  gifSrc: string;
  duration: number;
  onEnd?: () => void;
  sfxSrc: string;
};

const Animation = forwardRef(
  ({ gifSrc, duration, onEnd, sfxSrc }: AnimationProps, ref) => {
    const [animKey, setAnimKey] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const runAnim = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }

      setAnimKey((prevKey) => prevKey + 1);
      setIsRunning(true);
    };

    useImperativeHandle(ref, () => ({
      runAnim,
    }));

    useEffect(() => {
      if (isRunning) {
        const timer = setTimeout(() => {
          setIsRunning(false);
          if (onEnd) onEnd();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [isRunning, duration, onEnd]);

    return (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <audio ref={audioRef} src={sfxSrc} preload="auto" />
        {isRunning && (
          <img
            key={animKey}
            src={gifSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        )}
      </div>
    );
  }
);

export default Animation;
