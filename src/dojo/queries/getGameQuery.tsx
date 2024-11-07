import { Game, GameState, GameSubState } from "../typescript/models.gen";
import { getLSGameId } from "../utils/getLSGameId";

export const getGameQuery = async (client: any): Promise<Game> => {
  const result = await client.player_system.get_game({
    game_id: getLSGameId(),
  });
  return {
    id: parseInt(result.id),
    beasts_defeated: parseInt(result.beasts_defeated),
    current_player_hp: parseInt(result.current_player_hp),
    max_hands: parseInt(result.max_hands),
    max_discard: parseInt(result.max_discard),
    max_jokers: parseInt(result.max_jokers),
    level: parseInt(result.level),
    len_hand: parseInt(result.len_hand),
    len_max_current_special_cards: parseInt(
      result.len_max_current_special_cards
    ),
    len_current_special_cards: parseInt(result.len_current_special_cards),
    current_jokers: parseInt(result.current_jokers),
    state: {type: Object.entries(result.state.variant).find(
      ([key, value]) => value !== undefined && value !== null
    )?.[0]} as GameState,
    substate: {type: Object.entries(result.substate.variant).find(
      ([key, value]) => value !== undefined && value !== null
    )?.[0]} as GameSubState,
    player_name: result.player_name,
    player_hp: parseInt(result.player_hp),
    player_score: parseInt(result.player_score),
    player_level: parseInt(result.player_level),
    obstacles_cleared: parseInt(result.obstacles_cleared),
    owner: result.owner,
  };
};
