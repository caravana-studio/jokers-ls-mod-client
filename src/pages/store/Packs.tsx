import { Box, Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TiltCard } from "../../components/TiltCard";
import { useShopItems } from "../../dojo/queries/useShopItems";
import { useResponsiveValues } from "../../theme/responsiveSettings";

export const Packs = () => {
  const { packs } = useShopItems();
  const navigate = useNavigate();
  const { t } = useTranslation(["store"]);
  const { cardScale, isCardScaleCalculated } = useResponsiveValues();

  if (!isCardScaleCalculated) {
    return null;
  }

  return (
    <Box m={4} className="game-tutorial-step-packs">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size={"s"} mb={[1, 1, 1, 2, 2]} fontWeight={"400"}>
          {t("store.titles.packs")}
        </Heading>
      </Flex>
      <Flex flexDirection="row" justifyContent="flex-start" gap={[2, 4, 6]}>
        {packs.map((pack) => {
          return (
            <Flex key={`pack-${pack.blister_pack_id}`} justifyContent="center">
              <TiltCard
                cursor="pointer"
                card={{
                  id: pack.blister_pack_id.toString(),
                  card_id: Number(pack.blister_pack_id),
                  img: `packs/${pack.blister_pack_id}.png`,
                  idx: Number(pack.blister_pack_id),
                  purchased: Boolean(pack.purchased),
                  price: Number(pack.cost),
                }}
                isPack
                scale={cardScale * 1.2}
                onClick={() => {
                  if (!pack.purchased) {
                    navigate("/preview/pack", {
                      state: {
                        card: {
                          id: pack.blister_pack_id.toString(),
                          img: `packs/${pack.blister_pack_id}`,
                          idx: Number(pack.blister_pack_id),
                          price: Number(pack.cost),
                          card_id: Number(pack.blister_pack_id),
                        },
                        isPack: true,
                        pack: pack,
                      },
                    });
                  }
                }}
                isHolographic
              />
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};
