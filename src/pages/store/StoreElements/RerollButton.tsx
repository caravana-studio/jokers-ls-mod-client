import { Button, Tooltip } from "@chakra-ui/react";
import { CashSymbol } from "../../../components/CashSymbol";
import { useTranslation } from "react-i18next";

interface RerollButtonProps {
  rerolled: boolean;
  locked: boolean;
  notEnoughCash: boolean;
  rerollCost: number;
  setRerolled: (value: boolean) => void;
  isSmallScreen: boolean;
  reroll: () => Promise<boolean>;
}

const RerollButton: React.FC<RerollButtonProps> = ({
  rerolled,
  locked,
  notEnoughCash,
  rerollCost,
  setRerolled,
  isSmallScreen,
  reroll,
}) => {
  const { t } = useTranslation(["store"]);
  const rerollDisabled = rerolled || locked || notEnoughCash;

  return (
    <Tooltip
      placement={isSmallScreen ? "top" : "right"}
      label={
        rerolled
          ? t("store.tooltip.rerolled")
          : t("store.tooltip.reroll-default")
      }
    >
      <Button
        className="game-tutorial-step-6"
        fontSize={isSmallScreen ? 10 : [10, 10, 10, 14, 14]}
        w={
          isSmallScreen ? "unset" : ["unset", "unset", "unset", "100%", "100%"]
        }
        variant={rerollDisabled ? "defaultOutline" : "solid"}
        isDisabled={rerollDisabled}
        onClick={() => {
          reroll().then((response) => {
            if (response) {
              setRerolled(true);
            }
          });
        }}
      >
        {t("store.labels.reroll").toUpperCase()}
        {isSmallScreen && <br />} {rerollCost}
        <CashSymbol />
      </Button>
    </Tooltip>
  );
};

export default RerollButton;
