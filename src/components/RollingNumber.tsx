import { Box } from "@chakra-ui/react";
import { animated, useSpring } from "react-spring";
interface RollingNumberProps {
  n: number;
  className?: string;
}

export const RollingNumber = ({ n, className = 'headline' }: RollingNumberProps) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 100,
    config: { mass: 1, tension: 26, friction: 10 },
  });
  return (
    <Box sx={{ display: "inline-block" }}>
      <animated.div className={className}>{number.to((n) => n.toFixed(0))}</animated.div>
    </Box>
  );
};
