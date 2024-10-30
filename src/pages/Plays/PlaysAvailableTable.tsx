import {
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomScrollbar from "../../components/CustomScrollbar/CustomScrollbar";
import { TiltCard } from "../../components/TiltCard";
import { PLAYS_DATA } from "../../constants/plays";
import { BLUE_LIGHT } from "../../theme/colors";
import { useResponsiveValues } from "../../theme/responsiveSettings";
import theme from "../../theme/theme";
import { Card } from "../../types/Card";

const { blueLight, blue, violet } = theme.colors;

interface PlaysAvailableTableProps {
  maxHeight?: {
    base?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

const plays = PLAYS_DATA;

export const PlaysAvailableTable: React.FC<PlaysAvailableTableProps> = ({
  maxHeight,
}) => {
  const [playsExampleIndex, setPlaysExampleIndex] = useState(0);
  const { t } = useTranslation(["game"]);

  const { isSmallScreen, cardScale } = useResponsiveValues();

  return (
    <>
      {plays ? (
        <TableContainer
          maxHeight={maxHeight}
          border={`2px solid ${blueLight}`}
          borderRadius={"25px"}
          boxShadow={`0px 0px 20px 15px ${blue}`}
          backgroundColor="rgba(0, 0, 0, 1)"
        >
          <CustomScrollbar>
            <Table
              sx={{
                borderCollapse: "separate",
                marginBottom: 4,
                borderSpacing: 0,
              }}
              width={"100%"}
              variant={isSmallScreen ? "store-mobile" : "store"}
            >
              <Thead
                sx={{
                  position: "relative",
                  background: "black",
                  border: "10px",
                  borderColor: "transparent",
                  borderRadius: "25px",
                }}
              >
                <Tr>
                  {
                    <>
                      <Td fontSize={isSmallScreen ? 12 : 17}>
                        {t("game.plays.table.level-head").toUpperCase()}
                      </Td>
                      <Td fontSize={isSmallScreen ? 12 : 17}>
                        {t("game.plays.table.hand-head").toUpperCase()}
                      </Td>
                      <Td fontSize={isSmallScreen ? 12 : 17}>
                        {t("game.plays.table.points-multi-head").toUpperCase()}
                      </Td>
                    </>
                  }
                </Tr>
                <Tr>
                  <Td
                    colSpan={3}
                    sx={{
                      position: "sticky",
                      top: "0px",
                      backgroundColor: "black",
                      _before: {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: { base: "2.5%", sm: "5%" },
                        width: { base: "95%", sm: "90%" },
                        height: { base: "1px", sm: "2px" },
                        backgroundColor: "white",
                        boxShadow:
                          "0px 0px 12px rgba(255, 255, 255, 0.8), 0px 6px 20px rgba(255, 255, 255, 0.5)",
                      },
                    }}
                    p={4}
                  >
                    <Text
                      color={"white"}
                      p={2}
                      sx={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {PLAYS_DATA[playsExampleIndex].description}
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td
                    colSpan={3}
                    sx={{ position: "sticky", backgroundColor: "black" }}
                    p={2}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: {
                          base: "0px 2px 2px 2px",
                          sm: "0px 4px 4px 4px",
                        },
                        flexDirection: "row",
                      }}
                    >
                      <Flex
                        wrap={"nowrap"}
                        width={"fit-content"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={isSmallScreen ? 0 : 4}
                      >
                        {PLAYS_DATA[playsExampleIndex].example.map(
                          (card: Card, index) => {
                            const isImportant = PLAYS_DATA[
                              playsExampleIndex
                            ].importantCards.some(
                              (ic) => ic.card_id === card.card_id
                            );
                            return (
                              <Box
                                key={`${card.card_id}+"-"+${index}`}
                                opacity={isImportant ? 1 : 0.5}
                              >
                                <TiltCard
                                  card={card}
                                  scale={cardScale - (cardScale * 33) / 100}
                                />
                              </Box>
                            );
                          }
                        )}
                      </Flex>
                    </Box>
                  </Td>
                </Tr>
              </Thead>

              <Tbody>
                {plays &&
                  [...plays].map((play, index) => {
                    const textColor =
                      playsExampleIndex === index ? BLUE_LIGHT : "white";
                    const opacitySx = {
                      opacity: 1,
                    };

                    const nameTd = (
                      <Td
                        sx={opacitySx}
                        textAlign={"center"}
                        textColor={textColor}
                        fontSize={isSmallScreen ? 9 : 13}
                      >
                        {play.name}
                      </Td>
                    );
                    const pointsMultiTd = (
                      <Td>
                        <Box
                          color={"white"}
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"center"}
                        >
                          <Box
                            backgroundColor={`${blue}`}
                            borderRadius={4}
                            width={isSmallScreen ? "40px" : "60px"}
                            mr={1}
                            boxShadow={`0px 0px 10px 6px ${blue}`}
                            fontWeight={"400"}
                          >
                            {play.points.toString()}
                          </Box>
                          <Heading fontSize={isSmallScreen ? "8" : "10"}>
                            x
                          </Heading>
                          <Box
                            backgroundColor={"neonPink"}
                            borderRadius={4}
                            width={isSmallScreen ? "40px" : "60px"}
                            ml={1}
                            boxShadow={`0px 0px 10px 6px ${violet}`}
                            fontWeight={"400"}
                          >
                            {play.multi.toString()}
                          </Box>
                        </Box>
                      </Td>
                    );

                    return (
                      <Tr
                        key={index}
                        height={"30px"}
                        onClick={() => setPlaysExampleIndex(index)}
                        sx={{ cursor: "pointer" }}
                      >
                        {<>{nameTd}</>}

                        {pointsMultiTd}
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </CustomScrollbar>
        </TableContainer>
      ) : (
        "Loading..."
      )}
    </>
  );
};
