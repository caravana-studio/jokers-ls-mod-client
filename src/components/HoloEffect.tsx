import React, { useRef, useState } from 'react';
import { HoloEffectStyled } from '../theme/holoEffect.styles';

interface HoloEffectProps {
  children?: React.ReactNode;
  url: string;
  width: string;
  height: string;
  borderRadius: { base?: string; sm?: string } | {};
  useParticles?: boolean; 
}

export const HoloEffect = ({ children, url, width, height, borderRadius, useParticles }: HoloEffectProps) => {
  const [hover, setHover] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [activeBackgroundPosition, setActiveBackgroundPosition] = useState({
    tp: 0,
    lp: 0,
  });
  const [activeRotation, setActiveRotation] = useState({
    y: 0,
    x: 0,
  });
  const ref = useRef<HTMLInputElement>(null);

  const handleOnMouseOver = (event: any) => {
    setAnimated(false);
    setHover(true);

    const card = ref.current;

    const l =
      event.type === 'touchmove'
        ? event.touches[0].clientX
        : event.nativeEvent.offsetX;

    const t =
      event.type === 'touchmove'
        ? event.touches[0].clientY
        : event.nativeEvent.offsetY;

    const h = card ? card.clientHeight : 0;
    const w = card ? card.clientWidth : 0;

    var px = Math.abs(Math.floor((100 / w) * l) - 100);
    var py = Math.abs(Math.floor((100 / h) * t) - 100);

    var lp = 50 + (px - 50) / 1.5;
    var tp = 50 + (py - 50) / 1.5;

    setActiveBackgroundPosition({ lp, tp });
  };

  const handleOnMouseOut = () => {
    setHover(false);
    setAnimated(true);
    setActiveRotation({ x: 0, y: 0 });
  };

  return (
    <HoloEffectStyled
        width={width}
        height={height}
        borderRadius={borderRadius}
        url={url}
        ref={ref}
        active={hover}
        animated={animated}
        activeRotation={activeRotation}
        activeBackgroundPosition={activeBackgroundPosition}
        onMouseMove={handleOnMouseOver}
        onTouchMove={handleOnMouseOver}
        onMouseOut={handleOnMouseOut}
        useParticles={useParticles}
    >
        {children}
    </HoloEffectStyled>
  );
};