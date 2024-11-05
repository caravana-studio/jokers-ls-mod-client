import { useState, useEffect, useCallback } from "react";
import { TypeAnimation } from "react-type-animation";
import { Button, Flex } from "@chakra-ui/react";
import { LS_GREEN } from "../../theme/colors";

interface LoreProps {
  onComplete: () => void;
  sequence: string[];
}

const Lore: React.FC<LoreProps> = ({ onComplete, sequence }) => {
  const [screen, setScreen] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          setSelectedIndex((prev) => {
            const newIndex = Math.min(prev + 1, 1);
            return newIndex;
          });
          break;
        case "ArrowLeft":
          setSelectedIndex((prev) => {
            const newIndex = Math.max(prev - 1, 0);
            return newIndex;
          });
          break;
        case "Enter":
          setScreen(selectedIndex + 1);
          break;
      }
    },
    [selectedIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handleKeyDown]);

  useEffect(() => {
    if (screen === sequence.length) {
      onComplete();
    }
  }, [screen, onComplete]);

  const renderScreen = (text: any) => (
    <Flex width={"70%"}>
      <Flex
        flexDirection={"column"}
        color={LS_GREEN}
        width={"100%"}
        p={8}
        justifyContent={"center"}
        alignItems={"center"}
        gap={8}
      >
        <Flex width={"100%"} height={"50vh"} alignItems={"center"}>
          <TypeAnimation
            key={screen.toString()}
            sequence={text}
            wrapper="span"
            cursor={true}
            speed={40}
            style={{ fontSize: "2em" }}
          />
        </Flex>

        <Flex>
          <Button
            size={"sm"}
            variant={"defaultGreenOutlineGlow"}
            onClick={() => setScreen(sequence.length)}
          >
            [skip]
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );

  return (
    <>
      {screen < sequence.length &&
        renderScreen([
          sequence[screen],
          () => setTimeout(() => setScreen(screen + 1), 3000),
        ])}
    </>
  );
};

export default Lore;
