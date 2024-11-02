import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

type AnimationProps = {
  gifSrc: string;
  duration: number;
  onEnd?: () => void;
};

const Animation = forwardRef(
  ({ gifSrc, duration, onEnd }: AnimationProps, ref) => {
    const [animKey, setAnimKey] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const runAnim = () => {
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
        {isRunning && (
          <img
            key={animKey}
            src={gifSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
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
