import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Background } from "../components/Background";
import CachedImage from "../components/CachedImage";
import { LS_GREEN } from "../theme/colors";

const CLASSES = [
  {
    id: 1,
    title: "Scribe",
    element: "book",
    description: "- +4 Jokers",
  },
  {
    id: 2,
    title: "Warrior",
    element: "sword",
    description: "- +1 Joker /n - +2 point modifiers /n - +2 multi modifiers",
  },
  {
    id: 3,
    title: "Wizard",
    element: "wand",
    description: "- +1 special card /n - +2 Jokers",
  },
];

export const ChooseClassPage = () => {
  const [selectedClass, setSelectedClass] = useState<number | undefined>();
  return (
    <Background bgDecoration type="skulls">
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
              onClick={() => setSelectedClass(classBox.id)}
              selected={selectedClass === classBox.id}
            />
          ))}
        </Flex>
        <Flex>
          <Button mb={8} size='lg' isDisabled={!selectedClass}>CONTINUE</Button>
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
