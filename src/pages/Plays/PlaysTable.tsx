import {
  Box,
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { CashSymbol } from "../../components/CashSymbol.tsx";
import { PLAYS } from "../../constants/plays.ts";
import { getPlayerPokerHands } from "../../dojo/getPlayerPokerHands.tsx";
import { useGame } from "../../dojo/queries/useGame";
import { useShopItems } from "../../dojo/queries/useShopItems";
import { LevelPokerHand } from "../../dojo/typescript/models.gen.ts";
import { useDojo } from "../../dojo/useDojo.tsx";
import { parseHand } from "../../enums/hands.ts";
import { useGameContext } from "../../providers/GameProvider";
import { useStore } from "../../providers/StoreProvider";
import { BLUE } from "../../theme/colors";
import theme from "../../theme/theme";

interface PlaysTableProps {
  inStore?: boolean;
}

const { blue, white, purple } = theme.colors;

export const PlaysTable = ({ inStore = false }: PlaysTableProps) => {
  const { gameId } = useGameContext();
  const { locked } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [plays, setPlays] = useState<LevelPokerHand[]>([]);

  const store = useStore();
  const { isPurchased } = store;
  const game = useGame();
  const cash = game?.cash ?? 0;
  const levelUpPlay = store?.levelUpPlay;
  const { pokerHandItems } = useShopItems();
  const { t } = useTranslation(["store"]);

  const {
    setup: {
      client,
      account: { account }
    },
  } = useDojo();

  if (client && account &&  plays.length == 0) {
    getPlayerPokerHands(client, gameId).then((plays: any) => {
      setPlays(plays);
    })
  }

  useEffect(() => {
  if (plays.length > 0) { 
      setIsLoading(false);
    }
  }, [plays, pokerHandItems]);

  const filteredPlays = !isLoading ? plays.filter((play) =>
    pokerHandItems?.find((item) => item.poker_hand === play.poker_hand.toString())
): plays;

  return (
    <>
      {filteredPlays ? (
        <TableContainer>
          <Table
            sx={{
              borderCollapse: "separate",
              borderSpacing: "0 .3em",
              marginBottom: 4,
            }}
            width={"100%"}
            variant={isMobile ? "store-mobile" : "store"}
          >
            <Thead
              sx={{
                position: "relative",
                _after: {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "1px",
                  background:
                    "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%)",
                  boxShadow:
                    "0 0 10px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5)",
                },
                _before: {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "1px",
                  background:
                    "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%)",
                  boxShadow:
                    "0 0 10px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              <Tr>
                {inStore ? (
                  <>
                    <Td textAlign={"left"} fontSize={isMobile ? 12 : undefined}>
                    {t('store.plays-table.hand').toUpperCase()}
                    </Td>
                    <Td>{t('store.plays-table.level').toUpperCase()}</Td>
                    <Td>{t('store.plays-table.price').toUpperCase()}</Td>
                    <Td></Td>
                  </>
                ) : (
                  <>
                    <Td>{t('store.plays-table.level').toUpperCase()}</Td>
                    <Td>{t('store.plays-table.hand').toUpperCase()}</Td>
                    <Td>{t('store.plays-table.points-multi').toUpperCase()}</Td>
                  </>
                )}
              </Tr>
            </Thead>
            <Tbody>
              { !isLoading && filteredPlays.map((play, index) => {
                const pokerHandString = play.poker_hand.toString();
                const pokerHandParsed = parseHand(pokerHandString);
                
                const storePlay = pokerHandItems?.find(
                  (item) => item.poker_hand == pokerHandString
                );                
                
                const purchased = storePlay != undefined ? isPurchased(storePlay) : false;

                const textColor = storePlay
                  ? purchased
                    ? blue
                    : white
                  : purple;

                const opacitySx = {
                  opacity: inStore && (!storePlay || purchased) ? 0.9 : 1,
                };

                const levelTd = (
                  <Td sx={opacitySx} textColor={textColor}>
                    {play.level.toString()}
                  </Td>
                );
                const nameTd = (
                  <Td sx={opacitySx} textAlign={"start"} textColor={textColor}>
                     {PLAYS[Number(pokerHandParsed.value)]}
                  </Td>
                );
                const pointsMultiTd = (
                  <Td>
                    <Box
                      color={"black"}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"center"}
                    >
                      <Box
                        backgroundColor={"neonGreen"}
                        borderRadius={10}
                        width={"50px"}
                        mr={1}
                      >
                        {play.points.toString()}
                      </Box>
                      <Heading fontSize={"15"}>x</Heading>
                      <Box
                        backgroundColor={"neonPink"}
                        borderRadius={10}
                        width={"50px"}
                        ml={1}
                      >
                        {play.multi.toString()}
                      </Box>
                    </Box>
                  </Td>
                );

                const notEnoughCash = !!storePlay && cash < storePlay.cost;

                const buyButton = (
                  <Button
                    onClick={() => {
                      storePlay && levelUpPlay?.(storePlay);
                    }}
                    variant={notEnoughCash || locked ? "defaultOutline" : "solid"}
                    isDisabled={notEnoughCash || locked}
                    size="sm"
                    px={isMobile ? 2 : 4}
                    boxShadow={`0px 0px 10px 2px ${BLUE}`}
                    fontSize={10}
                  >
                    {t('store.plays-table.level-up')}
                  </Button>
                );

                return (
                  <Tr key={index} height={"30px"}>
                    {inStore ? (
                      <>
                        {nameTd}
                        {levelTd}
                      </>
                    ) : (
                      <>
                        {levelTd}
                        {nameTd}
                      </>
                    )}

                    {inStore ? (
                      <>
                        <Td sx={opacitySx} color={textColor}>
                          {storePlay?.cost ? `${storePlay.cost}` : ""}<CashSymbol />
                        </Td>
                        <Td>
                          {!!storePlay ? (
                            isPurchased(storePlay) ? (
                              <Heading
                                color="blue"
                                size={isMobile ? "base" : "xs"}
                              >
                                {t('store.plays-table.purchased').toUpperCase()}
                              </Heading>
                            ) : notEnoughCash ? (
                              <Tooltip label="You don't have enough coins to buy this item">
                                {buyButton}
                              </Tooltip>
                            ) : (
                              buyButton
                            )
                          ) : (
                            ""
                          )}
                        </Td>
                      </>
                    ) : (
                      pointsMultiTd
                    )}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        "Loading..."
      )}
    </>
  );
};