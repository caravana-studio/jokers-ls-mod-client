import { Center, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { RollingNumber } from "../RollingNumber";

interface INumberBoxProps {
  number: number;
  color: string;
  spreadIncrease?: number;
}

export const NumberBox = ({
  number,
  color,
  spreadIncrease = 100,
}: INumberBoxProps) => {
  const [prevNumber, setPrevNumber] = useState(number);

  const [{ boxShadow }, set] = useSpring(() => ({
    boxShadow: `0px 0px 3px 1px ${color}`,
  }));

  useEffect(() => {
    if (number > prevNumber) {
      const spread = 4 + Math.floor(number / spreadIncrease) * 2;
      set({ boxShadow: `0px 0px ${spread}px ${spread / 2}px ${color}` });

      const timeout = setTimeout(() => {
        set({ boxShadow: `0px 0px 3px 1px ${color}` });
      }, 700);

      return () => clearTimeout(timeout);
    }

    setPrevNumber(number);
  }, [number, color, set, prevNumber]);

  return (
    <animated.div
      style={{
        boxShadow,
        borderRadius: "80px",
        width: "70px",
        marginLeft: "7px",
        marginRight: "7px",
        border: `2px solid ${color}`,
      }}
    >
      <Center>
        <Heading fontSize="sm">
          <RollingNumber n={number} />
        </Heading>
      </Center>
    </animated.div>
  );
};
