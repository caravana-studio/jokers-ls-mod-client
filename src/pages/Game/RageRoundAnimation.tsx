import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useGameContext } from "../../providers/GameProvider";
import { getCardData } from "../../utils/getCardData";

export const RageRoundAnimation = () => {
  const [showAnimationHeading, setShowAnimationHeading] = useState(false);
  const [showAnimationText, setShowAnimationText] = useState(false);

  const { isRageRound, rageCards } = useGameContext();

  const descriptions = rageCards?.map((card) => getCardData(card).description);

  const headingSpring = useSpring({
    from: { x: -1000, opacity: 0 },
    to: async (next) => {
      if (showAnimationHeading) {
        await next({ x: 0, opacity: 1 });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await next({ x: 1000, opacity: 0 });
      }
    },
    config: { duration: 200 },
  });

  const textSpring = useSpring({
    from: { x: -1000, opacity: 0 },
    to: async (next) => {
      if (showAnimationText) {
        await next({ x: 0, opacity: 1 });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await next({ x: 1000, opacity: 0 });
      }
    },
    config: { duration: 200 },
  });

  useEffect(() => {
    if (isRageRound) {
      setShowAnimationHeading(true);
      setTimeout(() => {
        setShowAnimationText(true);
      }, 500);
      const timer = setTimeout(() => {
        setShowAnimationHeading(false);
        setShowAnimationText(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isRageRound]);
  return (
    <>
      {showAnimationHeading && (
        <Flex
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          zIndex={1000}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <animated.div style={headingSpring}>
            <Heading fontSize={{ base: "2rem", sm: "4rem" }}>
              RAGE ROUND
            </Heading>
          </animated.div>
          <animated.div style={textSpring}>
            {descriptions.map((description) => {
              return (
                <Text key={description} size="xl">
                  {description}
                </Text>
              );
            })}
          </animated.div>
        </Flex>
      )}
    </>
  );
};
