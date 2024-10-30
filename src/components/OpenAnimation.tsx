import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Particle = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1000;
  mix-blend-mode: screen;
  filter: sepia(1) saturate(0) brightness(1);
`;

interface GlowEffectProps {
  glow: boolean;
}

const GlowEffect = motion(styled.div<GlowEffectProps>`
  filter: ${(props) => (props.glow ? "drop-shadow(0 0 20px white)" : "none")};
  z-index: 1500;
`);

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const ExplosionEffect = motion(styled.img<{opacity: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 9999;
  opacity: ${(props) => props.opacity};
  will-change: transform;
`);

const ShakeEffect = motion.div;

interface OpenAnimationProps {
  children: React.ReactNode;
  startAnimation: boolean;
  onAnimationEnd?: () => void;
}

const OpenAnimation = ({
  children,
  startAnimation,
  onAnimationEnd,
}: OpenAnimationProps) => {
  const controls = useAnimation();
  const [shake, setShake] = useState(false);
  const [glow, setGlow] = useState(false);
  const [explosion, setExplosion] = useState(false);
  const [particle, setParticle] = useState<string | null>(null);

  useEffect(() => {
    if (startAnimation) {
      setParticle("url(/vfx/particle2.gif)");

      const sequence = async () => {
        await controls.start({
          rotate: [0, -5, 5, 0],
          transition: {
            duration: 0.3,
            repeat: 5, 
            repeatType: "reverse",
          },
        });
        setShake(true);
        setGlow(true);
        setParticle("url(/vfx/glow_particle.gif)");

        await new Promise((resolve) => setTimeout(resolve, 300));

/*         setExplosion(true);
        await controls.start({
          scale: [0.1, 2],
          transition: { duration: 0.5, ease: "easeOut" },
        });*/

        await new Promise((resolve) => setTimeout(resolve, 500)); 

        setParticle(null);
        setShake(false);
        setGlow(false);
        // setExplosion(false);

        if (onAnimationEnd) onAnimationEnd();
      };

      sequence();
    }
  }, [startAnimation, controls, onAnimationEnd]);

  return (
    <motion.div style={{ position: "relative", display: "inline-block" }}>
      {particle && <Particle style={{ backgroundImage: particle }} />}
      <Container>
{/*         {explosion && (
          <ExplosionEffect
            opacity={1}
            src="/vfx/explosion_blue.gif"
            animate={{ scale: [0.5, 10] }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        )} */}
        <GlowEffect glow={glow}>
          <ShakeEffect
            animate={shake ? { rotate: [0, -5, 5, 0] } : { rotate: 0 }}
            transition={{
              duration: 0.3,
              repeat: shake ? 5 : 0, 
              repeatType: "reverse",
            }}
          >
            {children}
          </ShakeEffect>
        </GlowEffect>
      </Container>
    </motion.div>
  );
};


export default OpenAnimation;
