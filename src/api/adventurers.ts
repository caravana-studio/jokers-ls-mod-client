import { Adventurer } from "../types/Adventurer";

const BLAST_URL =
  import.meta.env.VITE_BLAST_URL ||
  "https://starknet-mainnet.blastapi.io/f3cfa120-6cef-4856-8ef3-1fcaf1a438a9";

const LS_ADDRESS =
  import.meta.env.VITE_LS_ADDRESS ||
  "0x018108b32cea514a78ef1b0e4a0753e855cdf620bc0565202c02456f618c4dc4";

export const getAdventurers = async (owner: string): Promise<Adventurer[]> => {
  const recursiveFetch = async (
    adventurers: any,
    nextPageKey: string | null
  ) => {
    let url = `${BLAST_URL}/builder/getWalletNFTs?contractAddress=${LS_ADDRESS}&walletAddress=${owner}&pageSize=100`;

    if (nextPageKey) {
      url += `&pageKey=${nextPageKey}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      adventurers = adventurers.concat(
        data?.nfts?.map((adventurer: any) => {
          const metadata = JSON.parse(adventurer.tokenMetadata);

          const attributesMap = metadata.attributes.reduce(
            (acc: any, attr: { trait: string; value: any }) => {
              acc[attr.trait] = isNaN(attr.value)
                ? attr.value
                : Number(attr.value);
              return acc;
            },
            {}
          );

          return {
            id: Number(adventurer.tokenId),
            name: attributesMap.Name,
          };
        })
      );

      if (data.nextPageKey) {
        return recursiveFetch(adventurers, data.nextPageKey);
      }
    } catch (ex) {
      console.log("error fetching adventurers", ex);
    }

    return adventurers;
  };

  let adventurerData = await recursiveFetch([], null);
  let adventurers = [];

  for (const adventurer of adventurerData) {
    const details = await getAdventurerDetails(adventurer.id);
    adventurers.push({
      ...adventurer,
      ...details,
    });
  }

  return (
    adventurers
      // only dead adventurers
      .filter((adventurer) => adventurer.health === 0)
      // sort by level
      .sort((a, b) => a.level - b.level)
  );
};

export const getAdventurerDetails = async (tokenId: number) => {
  try {
    const adventurer_response = await fetch(BLAST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "starknet_call",
        params: [
          {
            contract_address: LS_ADDRESS,
            entry_point_selector:
              "0x003d3148be1dfdfcfcd22f79afe7aee5a3147ef412bfb2ea27949e7f8c8937a7",
            calldata: [tokenId.toString(16)],
          },
          "pending",
        ],
        id: 0,
      }),
    });

    const data = await adventurer_response.json();
    let adventurer = {
      id: tokenId,
      health: parseInt(data.result[0], 16),
      level: Math.max(1, Math.floor(Math.sqrt(parseInt(data.result[1], 16)))),
      gold: parseInt(data.result[2], 16),
      str: parseInt(data.result[5], 16),
      dex: parseInt(data.result[6], 16),
      vit: parseInt(data.result[7], 16),
      int: parseInt(data.result[8], 16),
      wis: parseInt(data.result[9], 16),
      cha: parseInt(data.result[10], 16),
      luck: parseInt(data.result[11], 16),
    };

    return adventurer || {};
  } catch (ex) {
    console.log("error fetching adventurer details");
    return {};
  }
};
