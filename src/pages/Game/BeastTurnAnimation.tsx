import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useGameContext } from "../../providers/GameProvider";

export const BeastTurnAnimation = () => {
  const { beastAttack, setBeastAttack, gameOver } = useGameContext();
  const [showAnimationHeading, setShowAnimationHeading] = useState("");
  const [showAnimationText, setShowAnimationText] = useState("");

  const headingSpring = useSpring({
    from: { x: -1000, opacity: 0 },
    to: async (next) => {
      if (showAnimationHeading) {
        await next({ x: 0, opacity: 1 });
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await next({ x: 1000, opacity: 0 });
      }
    },
    config: { duration: 200 },
  });

  useEffect(() => {
    setShowAnimationHeading("YOUR TURN");
    const timer = setTimeout(() => {
      setShowAnimationHeading("");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (beastAttack > 0) {
      setShowAnimationHeading("BEAST TURN");
      setTimeout(() => {
        setShowAnimationText(
          `Beast attacked you causing ${beastAttack} damage`
        );
      }, 800);
      const timer = setTimeout(() => {
        setShowAnimationHeading("");
        setShowAnimationText("");
        const timer = setTimeout(() => {
          if (!gameOver) {
            setShowAnimationHeading("YOUR TURN");
            const timer = setTimeout(() => {
              setShowAnimationHeading("");
              setBeastAttack(0);
            }, 2300);
            return () => clearTimeout(timer);
          }
        }, 500);
        return () => clearTimeout(timer);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [beastAttack]);

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
          backgroundColor="rgba(0,0,0,0.7)"
        >
          <animated.div style={headingSpring}>
            <Heading fontSize={"120px"}>{showAnimationHeading}</Heading>
          </animated.div>
          <animated.div style={textSpring}>
            <Text fontSize="2rem" color="white">
              {showAnimationText}
            </Text>
          </animated.div>
        </Flex>
      )}
    </>
  );
};
