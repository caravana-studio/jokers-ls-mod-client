import { confetti } from "tsparticles-confetti";
import {
    BLUE,
    BLUE_LIGHT,
    NEON_GREEN,
    NEON_PINK,
    PASTEL_PINK,
    VIOLET,
    VIOLET_LIGHT,
} from "../theme/colors";

const duration = 2000,
  defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    colors: [
      BLUE,
      BLUE_LIGHT,
      VIOLET,
      VIOLET_LIGHT,
      PASTEL_PINK,
      NEON_GREEN,
      "#FFF",
      NEON_PINK,
    ],
  };

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const runConfettiAnimation = (count = 50) => {
  const animationEnd = Date.now() + duration;
  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = count * (timeLeft / duration);

    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};
