import { Flex, Heading } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import CoinsIcon from "../../assets/coins.svg?component";
import { CashSymbol } from "../../components/CashSymbol";
import { RollingNumber } from "../../components/RollingNumber";
import { useGame } from "../../dojo/queries/useGame";

interface ICoinsProps {
  rolling?: boolean;
}

export const Coins = ({ rolling = false }: ICoinsProps) => {
  const game = useGame();
  const cash = game?.cash ?? 0;
  const { t } = useTranslation(["store"]);

  return (
    <Flex alignItems={"center"} className="game-tutorial-step-1">
      <CoinsIcon
        style={{ transform: `translateY(${isMobile ? "4px" : "6px"})` }}
        width={isMobile ? "35px" : "50px"}
        height={"auto"}
      />
      <Heading
        variant={"italic"}
        size={{base: 's', sm: "m"}}
        sx={{
          ml: 2,
          position: "relative",
          textShadow: `0 0 10px white`,
          _before: {
            content: '""',
            position: "absolute",
            bottom: "-5px",
            width: "100%",
            height: "1px",
            backgroundColor: "white",
            boxShadow:
              "0px 0px 12px 2px rgba(255, 255, 255, 0.8), 0px 6px 20px rgba(255, 255, 255, 0.5)",
          },
        }}
      >
        {t('store.labels.coins').toString() + " "}
        {rolling ? <RollingNumber className="italic" n={cash} /> : cash}
        <CashSymbol />
      </Heading>
    </Flex>
  );
};
