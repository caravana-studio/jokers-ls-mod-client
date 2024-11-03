import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Background } from "../components/Background";
import CachedImage from "../components/CachedImage";
import { PositionedGameMenu } from "../components/GameMenu";
import { Loading } from "../components/Loading";
import { useGame } from "../dojo/queries/useGame";
import { useDojo } from "../dojo/useDojo";
import { useGameContext } from "../providers/GameProvider";
import { LS_GREEN } from "../theme/colors";

const CLASSES = [
  {
    id: 0,
    title: "Scribe",
    element: "book",
    description: "- +4 Jokers",
  },
  {
    id: 1,
    title: "Warrior",
    element: "sword",
    description: "- +1 Joker /n - +2 point modifiers /n - +2 multi modifiers",
  },
  {
    id: 2,
    title: "Wizard",
    element: "wand",
    description: "- +1 special card /n - +2 Jokers",
  },
];

export const ChooseClassPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState<number | undefined>();
  const {
    setup: { masterAccount },
    account: { account },
  } = useDojo();

  const {
    checkOrCreateGame,
    selectDeckType,
    gameLoading,
    error,
    redirectBasedOnGameState,
    lockRedirection,
  } = useGameContext();

  const game = useGame();

  useEffect(() => {
    if (account !== masterAccount) {
      checkOrCreateGame();
    }
  }, [account, masterAccount]);

  useEffect(() => {
    redirectBasedOnGameState();
  }, [game?.state, lockRedirection]);

  if (gameLoading || error) {
    return (
      <Background bgDecoration type="skulls">
        {gameLoading ? <Loading /> : <Heading size="xxl">ERROR</Heading>}
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
