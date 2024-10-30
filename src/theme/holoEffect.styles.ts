import styled, { keyframes, css } from 'styled-components';

const holoSparkle = keyframes`
  0%, 100% {
    opacity: .75;  filter: brightness(1.2) contrast(1.25);
  }
  5%, 8% {
    opacity: 1; filter: brightness(.8) contrast(1.2);
  }
  13%, 16% {
    opacity: .5; filter: brightness(1.2) contrast(.8);
  }
  35%, 38% {
    opacity: 1;  filter: brightness(1) contrast(1);
  }
  55% {
    opacity: .33; filter: brightness(1.2) contrast(1.25);
  }
`;

const holoGradient = keyframes`
  0%, 100% {
    opacity: 0.5;
    background-position: 50% 50%;
    filter: brightness(.5) contrast(1);
  }
  5%, 9% {
    background-position: 100% 100%;
    opacity: 1;
    filter: brightness(.75) contrast(1.25);
  }
  13%, 17% {
    background-position: 0% 0%;
    opacity: .88;
  }
  35%, 39% {
    background-position: 100% 100%;
    opacity: 1;
    filter: brightness(.5) contrast(1);
  }
  55% {
    background-position: 0% 0%;
    opacity: 1;
    filter: brightness(.75) contrast(1.25);
  }
`;

interface HoloEffectStyledProps {
  active: boolean;
  activeBackgroundPosition: {
    tp: number;
    lp: number;
  };
  activeRotation: {
    x: number;
    y: number;
  };
  url: string;
  animated: boolean;
  width: string;
  height: string;
  borderRadius: { base?: string; sm?: string } | {}; 
  useParticles?: boolean;
}

export const HoloEffectStyled = styled.div<HoloEffectStyledProps>`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: #211799;
  background-image: url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: ${props => {
    if (!props.borderRadius || Object.keys(props.borderRadius).length === 0) {
      return '0px';
    }
    return (props.borderRadius as { base?: string; sm?: string }).base || '0px';
  }};
  position: relative;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  transform: rotateX(${props => props.activeRotation.y}deg) rotateY(${props => props.activeRotation.x}deg);
  transition: none;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-position: 0% 0%;
    background-repeat: no-repeat;
    background-size: 300% 300%;
    mix-blend-mode: color-dodge;
    opacity: 0.2;
    z-index: 1;
    background-image: linear-gradient(
      115deg,
      transparent 0%,
      #54a29e 25%,
      transparent 47%,
      transparent 53%,
      #a79d66 75%,
      transparent 100%
    );
  }

  &:after {
    background-image: ${props => {
      if (props.useParticles) {
        return "url('/vfx/sparkles.gif'), url('/vfx/holo.png')";
      }
      return "url('/vfx/holo.png')";;
    }};
      linear-gradient(
        125deg,
        #ff008450 15%,
        #fca40040 30%,
        #ffff0030 40%,
        #00ff8a20 60%,
        #00cfff40 70%,
        #cc4cfa50 85%
      );
    position: center;
    background-size: 180%;
    mix-blend-mode: color-dodge;
    opacity: 1;
    z-index: 1;
  }

  ${props =>
    props.active &&
    css`
      &:before {
        opacity: 1;
        animation: none;
        transition: none;
        background-image: linear-gradient(
          110deg,
          transparent 25%,
          #54a29e 48%,
          #a79d66 52%,
          transparent 75%
        );
        background-position: ${props.activeBackgroundPosition.lp}% ${props.activeBackgroundPosition.tp}%;
      }
    `}

  ${props =>
    props.animated &&
    css`
      transition: opacity 1s, background-position 1s
      transform: rotateX(0deg) rotateY(0deg);
      &:before {
        transition: 1s;
        animation: ${holoGradient} 12s ease infinite;
      }
      &:after {
        transition: 1s;
        animation: ${holoSparkle} 12s ease infinite;
      }
    `}
`;