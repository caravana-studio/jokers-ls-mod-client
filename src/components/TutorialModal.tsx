import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SKIP_TUTORIAL } from "../constants/localStorage";

const GAME_STEPS = [
  "The goal of Jokers of Neon is to score a certain amount of points to pass each level by creating poker hands. Click on up to 5 cards from your hand to preselect them, then choose to either play them to score points or discard them to draw new cards from your deck. Strategically use your plays and discards to maximize your points and progress through increasingly challenging levels.",
  "Each hand has associated points and a multiplier, when you play it, each card's value is added to the base points, and the total is then multiplied by the multi to calculate your score. Be strategic, as running out of hands without meeting the point target means you lose the game.",
];

const STORE_STEPS = [
  "When you pass a level, you go to the store, where you can buy cards using the coins earned in the previous level. You can buy traditional cards, jokers, modifier cards, and special cards.",
  "Modifier cards apply effects to a single card, such as changing the card's suit, adding points, or increasing the multiplier. To use a modifier card, simply drag and drop it onto the card you want to enhance.",
  "Special cards have global effects that impact multiple cards or the entire game. For example, a special card might make all heart-suited cards gain an additional 5 multi or cause all modifiers to score double points. These powerful cards can significantly enhance your strategy and overall score.",
  "You can level up your poker plays to increase their base points and multiplier, making them more powerful. Higher-level plays offer greater scoring potential, allowing you to achieve higher scores and progress through the game more effectively.",
  "You have the option to reroll the store items once per level, refreshing both the available cards for purchase and the plays you can level up. This allows you to find new and potentially more useful options to enhance your deck and strategy.",
];

interface TutorialModalProps {
  inStore?: boolean;
  onClose: () => void;
}

export const TutorialModal = ({
  onClose,
  inStore = false,
}: TutorialModalProps) => {
  const maxIndex = STORE_STEPS.length - 1;
  const skipTutorial = () => {
    window.localStorage.setItem(SKIP_TUTORIAL, "true");
  };

  const onCarouselChange = (index: number) => {
    if (inStore && index === maxIndex) {
      skipTutorial();
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="4xl">
      <ModalOverlay
        bg='blackAlpha.400'
        backdropFilter='auto'
        backdropBlur='5px'
      />
      <ModalContent sx={{ marginTop: isMobile ? 0 : "5vh" }}>
        <ModalBody>
          <Carousel onChange={onCarouselChange} swipeable>
            {(inStore ? STORE_STEPS : GAME_STEPS).map((step, index) => {
              return (
                <div key={index}>
                  {isMobile ? (
                    <Image
                      src={`tutorial/${inStore ? "store" : "game"}-${index}-m.gif`}
                      width="80px"
                    />
                  ) : (
                    <Image
                      src={`tutorial/${inStore ? "store" : "game"}-${index}.gif`}
                      width="80vw"
                    />
                    
                  )}
                  <Text mt={2}>{step}</Text>
                </div>
              );
            })}
          </Carousel>
        </ModalBody>
        <ModalFooter >
          <Button
            size="s"
            fontSize={{ base: 10, sm: 12 }}
            py={2}
            mr={3}
            variant="outline"
            onClick={() => {
              skipTutorial();
              onClose();
            }}
          >
            skip {isMobile ? "" : "tutorial"}
          </Button>
          <Button
            size="s"
            fontSize={{ base: 10, sm: 12 }}
            py={2}
            variant="secondarySolid"
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
