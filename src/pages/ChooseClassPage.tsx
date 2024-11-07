import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Background } from "../components/Background";
import CachedImage from "../components/CachedImage";
import { PositionedGameMenu } from "../components/GameMenu";
import { useGame } from "../dojo/queries/useGame";
import { useGameContext } from "../providers/GameProvider";
import { LS_GREEN } from "../theme/colors";
import { useAudio } from "../hooks/useAudio";
import { beep } from "../constants/sfx";

const CLASSES = [
  {
    id: 0,
    title: "Overlord",
    element: "book",
    description: "• 100 HP /n • +2 multi modifiers /n • +2 points modifiers",
  },
  {
    id: 1,
    title: "Warrior",
    element: "sword",
    description: "• 120 HP /n • +1 multi modifier",
  },
  {
    id: 2,
    title: "Wizard",
    element: "wand",
    description: "• 80 HP /n • +2 Jokers",
  },
];

export const ChooseClassPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState<number | undefined>();
  const { play: beepSound } = useAudio(beep);

  const {
    selectDeckType,
    game,
    error,
    redirectBasedOnGameState,
    lockRedirection,
  } = useGameContext();

  useEffect(() => {
    redirectBasedOnGameState();
  }, [game?.state, lockRedirection]);

  if (error) {
    return (
      <Background bgDecoration type="skulls">
        <Heading size="xxl">ERROR</Heading>
      </Background>
    );
  }

  return (
    <Background bgDecoration type="skulls">
      <PositionedGameMenu decoratedPage />
      <Flex
        width="100%"
        height="100%"
        justifyContent="space-between"
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box>
          <Heading textAlign="center" size="xxl" variant="neonGreen">
            - Choose your class -
          </Heading>
          <Text size="xl" textAlign="center">
            Your choice determines how your initial deck is formed, giving it a
            unique setup from the start
          </Text>
        </Box>
        <Flex justifyContent={"space-around"} width="70%" mt={8}>
          {CLASSES.map((classBox) => (
            <ClassBox
              key={classBox.id}
              {...classBox}
              onClick={() => {
                beepSound();
                setSelectedClass(classBox.id);
              }}
              selected={selectedClass === classBox.id}
            />
          ))}
        </Flex>
        <Flex>
          <Button
            mb={8}
            size="lg"
            isDisabled={selectedClass === undefined || isLoading}
            onClick={() => {
              if (selectedClass !== undefined) {
                beepSound();
                setIsLoading(true);
                selectDeckType(selectedClass).finally(() => {
                  setIsLoading(false);
                });
              }
            }}
          >
            {isLoading ? "Loading..." : "CONTINUE"}
          </Button>
        </Flex>
      </Flex>
    </Background>
  );
};

interface ClassBoxProps {
  title: string;
  element: string;
  description: string;
  onClick: () => void;
  selected?: boolean;
}

const HIGHLIGHT_STYLE = {
  borderColor: "lsGreen",
  boxShadow: `0px 0px 15px 1px ${LS_GREEN}, inset 0px 0px 15px 1px ${LS_GREEN}`,
};

const ClassBox = ({
  title,
  element,
  description,
  selected = false,
  onClick,
}: ClassBoxProps) => {
  const descriptionLines = description.split("/n");
  return (
    <Flex
      onClick={onClick}
      flexDirection="column"
      alignItems="center"
      gap={4}
      width="280px"
      height="440px"
      p={"20px"}
      cursor="pointer"
      opacity={0.8}
      border={`1px solid transparent`}
      _hover={HIGHLIGHT_STYLE}
      {...(selected && HIGHLIGHT_STYLE)}
    >
      <Heading size="xl" variant="neonWhite">
        {title}
      </Heading>
      <Box
        height="220px"
        width="220px"
        display="flex"
        borderRadius="20px"
        justifyContent="center"
        backgroundColor="black"
      >
        <CachedImage src={`/weapons/${element}.png`} alt={element} />
      </Box>
      <Box>
        {descriptionLines.map((line, index) => (
          <Text key={index} size="l" variant="neonWhite">
            {line}
          </Text>
        ))}
      </Box>
    </Flex>
  );
};
