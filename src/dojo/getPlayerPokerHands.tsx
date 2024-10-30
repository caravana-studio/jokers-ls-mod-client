export const getPlayerPokerHands = async (client: any, gameId: number) => {
  if (gameId != 0) { 
    try {
      let tx_result = await client.poker_hand_system.getPlayerPokerHands({
        gameId
      });

      tx_result.map((level_poker_hand: any) => {
        level_poker_hand.level = parseInt(level_poker_hand.level)
        level_poker_hand.multi = parseInt(level_poker_hand.multi)
        level_poker_hand.points = parseInt(level_poker_hand.points)
        level_poker_hand.poker_hand = Object.entries(level_poker_hand.poker_hand.variant)
                          .find(([key, value]) => value !== undefined && value !== null)?.[0]
      });
      return Object.values(tx_result);
    } catch (e) {
      console.log(e);
    }
  }
};
