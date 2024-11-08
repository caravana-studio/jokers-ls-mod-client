import { AdventurerConsumed } from "../typescript/models.gen";

export const getConsumedAdventurers = async (client: any, ids: number[]) => {
  const adventurers = await Promise.all(
    ids.map(async (id) => {
      const adventurer = await getAdventurerQuery(client, id);
      if (adventurer.consumed) {
        return id;
      }
      return null;
    })
  );

  // Filter out any null values to ensure only number IDs are returned
  return adventurers.filter((id): id is number => id !== null);
};

const getAdventurerQuery = async (
  client: any,
  id: number
): Promise<AdventurerConsumed> => {
  const result = await client.player_system.get_adventurer({
    adventurer_id: id,
  });
  return {
    adventurer_id: id,
    consumed: result.consumed,
    owner: result.owner,
  };
};
