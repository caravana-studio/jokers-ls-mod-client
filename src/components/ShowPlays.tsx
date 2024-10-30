import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { Button, Flex, Text } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

export const ShowPlays = () => {
  const [hoveredButton, setHoveredButton] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(["game"]);

  return (
    <Button
      variant={hoveredButton ? "defaultGreenOutlineGlow" : "defaultOutline"}
      borderRadius={"8px"}
      height={isMobile ? 6 : 8}
      borderColor="transparent !important"
      _hover={{
        borderColor: "white !important",
      }}
      size={"xs"}
      className="game-tutorial-step-5"
      onMouseEnter={() => setHoveredButton(true)}
      onMouseLeave={() => setHoveredButton(false)}
      onClick={(e) => {
        e.stopPropagation();
        navigate("/plays");
      }}
    >
      <Flex gap={2} alignItems={"center"} justifyContent={"space-between"}>
        <InfoIcon
          color="white"
          fontSize={{ base: "14px", md: "20px" }}
          sx={{ cursor: "pointer" }}
          className="game-tutorial-step-5"
        />
        <Text textTransform="initial">{t("game.hand-section.show-plays")}</Text>
      </Flex>
    </Button>
  );
};
