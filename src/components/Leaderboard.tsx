import {
  Box,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BigNumberish, num, RpcProvider, shortString } from "starknet";
import { useUsername } from "../dojo/utils/useUsername.tsx";
import { LS_GREEN } from "../theme/colors.tsx";
import { RollingNumber } from "./RollingNumber";

export const decodeString = (bigInt: BigNumberish) => {
  const hexString = num.toHexString(bigInt);
  return shortString.decodeShortString(hexString);
};

const CURRENT_LEADER_STYLES = {
  position: "relative",
  borderTop: "1px solid white",
  borderBottom: "1px solid white",
  boxShadow: `
    0 -2px 10px 1px rgba(255, 255, 255, 0.5),
    0 2px 10px 1px rgba(255, 255, 255, 0.5),
    inset 0 -15px 5px -10px rgba(255, 255, 255, 0.5),
    inset 0 15px 5px -10px rgba(255, 255, 255, 0.5)
  `,
};

interface LeaderboardProps {
  lines?: number;
  gameId?: number;
}

const FIRST_BLOCK = import.meta.env.VITE_GAME_QUERY_FIRST_BLOCK || "870000";
const GAP = import.meta.env.VITE_GAME_QUERY_GAP || "20000";
const WORLD_ADDRESS =
  import.meta.env.VITE_GAME_QUERY_WORLD_ADDRESS ||
  "0x02c5dab047c12c6f4eb49debee9398b9fb5fab5d60d5a86fbd150f19997109d6";
const EVENT_KEY =
  import.meta.env.VITE_GAME_QUERY_EVENT_KEY ||
  "0xd44b351e1ce0d066c11d56012e6f0ffca4008853d0b1ca1972433a0852d25e";

const getLeaderboard = async () => {
  console.log("getting leaderboard");
  const provider = new RpcProvider({
    nodeUrl: `${import.meta.env.VITE_RPC_URL}`,
  });

  const lastBlock = await provider.getBlock("latest");
  const lastBlockNumber = lastBlock.block_number;
  const firstBlock = Number(FIRST_BLOCK);
  const gap = Number(GAP);

  const eventsList = [];

  for (
    let currentBlock = firstBlock;
    currentBlock <= lastBlockNumber;
    currentBlock += gap
  ) {
    const toBlock = Math.min(currentBlock + gap, lastBlockNumber);

    const result = await provider.getEvents({
      address: WORLD_ADDRESS,
      from_block: { block_number: currentBlock },
      to_block: { block_number: toBlock },
      keys: [[EVENT_KEY]],
      chunk_size: 1000,
    });

    eventsList.push(...result.events);
  }

  const uniqueEvents = Array.from(
    eventsList
      .map((event) => {
        const game = event.data;
        return {
          name: decodeString(game[1]),
          score: parseInt(game[3], 16),
          level: parseInt(game[4], 16),
        };
      })
      .reduce((map, obj) => {
        // Check if there's an existing event for this name
        if (!map.has(obj.name)) {
          map.set(obj.name, obj);
        } else {
          const existing = map.get(obj.name);
          // Replace if the new event has a higher level or, if levels are equal, a higher score
          if (
            obj.level > existing.level ||
            (obj.level === existing.level && obj.score > existing.score)
          ) {
            map.set(obj.name, obj);
          }
        }
        return map;
      }, new Map())
      .values()
  );

  // Sort by level DESC, then score DESC
  uniqueEvents.sort((a, b) => {
    if (b.level !== a.level) {
      return b.level - a.level; // Sort by level DESC
    }
    return b.score - a.score; // Sort by score DESC if levels are equal
  });

  // Add position ranking
  return uniqueEvents.map((leader, index) => ({
    position: index + 1,
    ...leader,
  }));
};

export const Leaderboard = ({ gameId, lines = 11 }: LeaderboardProps) => {
  const { t } = useTranslation(["home"]);

  const [isLoading, setIsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<
    { name: string; position: number; score: number; level: number }[]
  >([]);

  const username = useUsername();

  const currentLeader = leaderboard?.find((leader) => leader.name === username);
  const currentLeaderIsInReducedLeaderboard =
    currentLeader && currentLeader.position <= lines;

  useEffect(() => {
    getLeaderboard()
      .then((games) => {
        setLeaderboard(games);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Box
      sx={{
        border: `2px solid ${LS_GREEN}`,
        boxShadow: `0px 0px 10px 3px ${LS_GREEN}`,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
      m={4}
      py={4}
      px={[1, 2, 4, 8]}
    >
      {isLoading && <Spinner />}
      {leaderboard && (
        <TableContainer
          maxHeight={{ base: "60vh", sm: "50vh" }}
          overflowX="hidden"
          overflowY="auto"
        >
          <Table variant="leaderboard">
            <Thead>
              <Tr>
                <Td>
                  {t(
                    "leaderboard.table-head.position-leaderboard-head"
                  ).toUpperCase()}
                </Td>
                <Td>
                  {t(
                    "leaderboard.table-head.username-leaderboard-head"
                  ).toUpperCase()}
                </Td>
                <Td>
                  {t(
                    "leaderboard.table-head.score-leaderboard-head"
                  ).toUpperCase()}
                </Td>
                <Td>
                  {t(
                    "leaderboard.table-head.level-leaderboard-head"
                  ).toUpperCase()}
                </Td>
              </Tr>
            </Thead>
            <Tbody>
              {leaderboard
                .filter((_, index) => {
                  const limit = !currentLeaderIsInReducedLeaderboard
                    ? lines - 1
                    : lines;
                  return index < limit;
                })
                .map((leader) => (
                  <Tr
                    key={leader.name}
                    sx={username === leader.name ? CURRENT_LEADER_STYLES : {}}
                  >
                    <Td>{leader.position}</Td>
                    <Td>{leader.name}</Td>
                    <Td isNumeric>
                      {username === leader.name ? (
                        <RollingNumber n={leader.score} />
                      ) : (
                        leader.score
                      )}
                    </Td>
                    <Td>
                      {username === leader.name ? (
                        <RollingNumber n={leader.level} />
                      ) : (
                        leader.level
                      )}
                    </Td>
                  </Tr>
                ))}
              {currentLeader && !currentLeaderIsInReducedLeaderboard && (
                <>
                  <Tr>
                    <Td>...</Td>
                    <Td>...</Td>
                    <Td>...</Td>
                    <Td>...</Td>
                  </Tr>
                  <Tr sx={CURRENT_LEADER_STYLES}>
                    <Td>{currentLeader.position}</Td>
                    <Td>{currentLeader.name}</Td>
                    <Td isNumeric>
                      <RollingNumber n={currentLeader.score} />
                    </Td>
                    <Td>
                      <RollingNumber n={currentLeader.level} />
                    </Td>
                  </Tr>
                </>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
