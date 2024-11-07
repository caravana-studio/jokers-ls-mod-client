import { GameModeBeast, Beast, PlayerBeast, TypeBeast } from "../typescript/models.gen";
import { getLSGameId } from "../utils/getLSGameId";

export const getGameModeBeastQuery = async (client: any): Promise<GameModeBeast> => {
    const result = await client.player_system.get_game_mode_beast({
        game_id: getLSGameId(),
    });
    return {
        game_id: parseInt(result.game_id),
        cost_discard: parseInt(result.cost_discard),
        cost_play: parseInt(result.cost_play),
        energy_max_player: parseInt(result.energy_max_player)
    };
};

export const getBeastQuery = async (client: any): Promise<Beast> => {
    const result = await client.player_system.get_beast({
        game_id: getLSGameId(),
    });
    return {
        game_id: parseInt(result.game_id),
        beast_id: parseInt(result.beast_id),
        tier: parseInt(result.tier),
        level: parseInt(result.level),
        health: parseInt(result.health),
        current_health: parseInt(result.current_health),
        attack: parseInt(result.attack),
        type_beast: {type: Object.entries(result.type_beast.variant).find(
            ([key, value]) => value !== undefined && value !== null
        )?.[0]} as TypeBeast,
    };
};

export const getPlayerBeastQuery = async (client: any): Promise<PlayerBeast> => {
    const result = await client.player_system.get_player_beast({
        game_id: getLSGameId(),
    });
    return {
        game_id: parseInt(result.game_id),
        energy: parseInt(result.energy)
    };
};


