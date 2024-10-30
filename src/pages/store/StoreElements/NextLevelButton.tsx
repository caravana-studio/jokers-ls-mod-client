import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../types/Card";
import { useTranslation } from "react-i18next";

interface NextLevelButtonProps {
  setLoading: (value: boolean) => void;
  onShopSkip: () => void;
  skipShop: (gameId: number) => Promise<{ success: boolean; cards: Card[] }>;
  gameId: number;
  setHand: (cards: Card[]) => void;
  locked: boolean;
  isSmallScreen: boolean;
}

const NextLevelButton: React.FC<NextLevelButtonProps> = ({
  setLoading,
  onShopSkip,
  skipShop,
  gameId,
  setHand,
  locked,
  isSmallScreen,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["store"]);

  const handleNextLevelClick = () => {
    setLoading(true);
    onShopSkip();
    skipShop(gameId).then((response): void => {
      if (response.success) {
        setHand(response.cards);
        navigate("/redirect/demo");
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <Button
      className="game-tutorial-step-7"
      my={isSmallScreen ? 0 : { base: 0, md: 6 }}
      w={isSmallScreen ? "unset" : ["unset", "unset", "unset", "100%", "100%"]}
      onClick={handleNextLevelClick}
      isDisabled={locked}
      lineHeight={1.6}
      variant="secondarySolid"
      fontSize={isSmallScreen ? 10 : [10, 10, 10, 14, 14]}
    >
      {t("store.labels.next-level").toUpperCase()}
    </Button>
  );
};

export default NextLevelButton;
