import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Animation from "./Animation";
import CachedImage from "../CachedImage";
import { Box } from "@chakra-ui/react";
import "./AttackAnimation.css";

type AttackAnimationProps = {
  duration: number;
  damagePoints: number;
  image: string;
  onEnd?: () => void;
};

const AttackAnimation = forwardRef(
  ({ duration, damagePoints, image, onEnd }: AttackAnimationProps, ref) => {
    const animationRef = useRef<{ runAnim: () => void }>(null);
    const [showDamage, setShowDamage] = useState(false);
    const [shake, setShake] = useState(false);
    const attackParticle = "/animations/attack_anim_02.gif";

    const attackParticleAudio = "/music/attack.mp3";
    const takeDamageAudio = "/music/attack_02.mp3";
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const runAnim = () => {
      animationRef.current?.runAnim();
    };

    useImperativeHandle(ref, () => ({
      runAnim,
    }));

    const handleOnParticleEnd = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }

      setShake(true);
      setShowDamage(true);

      setTimeout(() => {
        setShake(false);
        setShowDamage(false);

        if (onEnd) onEnd();
      }, 600);
    };

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CachedImage
          zIndex={1}
          src={image}
          className={shake ? "shake" : ""}
          sx={{
            height: "45vh",
            position: "relative",
          }}
        />
        <Box
          position={"absolute"}
          top={0}
          left={"42%"}
          height={"300px"}
          width={"100px"}
          zIndex={100}
        >
          <Animation
            ref={animationRef}
            gifSrc={attackParticle}
            sfxSrc={attackParticleAudio}
            duration={duration}
            onEnd={handleOnParticleEnd}
          />
        </Box>
        <audio ref={audioRef} src={takeDamageAudio} preload="auto" />

        {showDamage && (
          <span
            className="damage-text"
            style={{
              position: "absolute",
              top: "40%",
              left: "46%",
              transform: "translate(-50%, -50%)",
              zIndex: 200,
            }}
          >
            -{damagePoints}
          </span>
        )}
      </div>
    );
  }
);

export default AttackAnimation;
