// Generated by dojo-bindgen on Fri, 1 Nov 2024 13:02:06 +0000. Do not modify this file manually.
// Import the necessary types from the recs SDK
// generate again with `sozo build --typescript`
import { DojoProvider } from "@dojoengine/core";
import { Account } from "starknet";

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export async function setupWorld(provider: DojoProvider) {
  // System definitions for `jokers_of_neon-game_system` contract
  function game_system() {
    const contract_name = "game_system";

    // Call the `create_game` system with the specified Account and calldata
    const create_game = async (props: {
      account: Account;
      player_name: bigint;
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "create_game",
            calldata: [props.player_name],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing create_game:", error);
        throw error;
      }
    };

    // Call the `create_level` system with the specified Account and calldata
    const create_level = async (props: {
      account: Account;
      game_id: number;
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "create_level",
            calldata: [props.game_id],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing create_level:", error);
        throw error;
      }
    };

    // Call the `select_deck` system with the specified Account and calldata
    const select_deck = async (props: {
      account: Account;
      game_id: number;
      deck_id: number;
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "select_deck",
            calldata: [props.game_id, props.deck_id],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing select_deck:", error);
        throw error;
      }
    };

    // Call the `select_special_cards` system with the specified Account and calldata
    const select_special_cards = async (props: {
      account: Account;
      game_id: number;
      cards_index: number[];
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "select_special_cards",
            calldata: [
              props.game_id,
              props.cards_index.length,
              ...props.cards_index,
            ],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing select_special_cards:", error);
        throw error;
      }
    };

    // Call the `select_modifier_cards` system with the specified Account and calldata
    const select_modifier_cards = async (props: {
      account: Account;
      game_id: number;
      cards_index: number[];
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "select_modifier_cards",
            calldata: [
              props.game_id,
              props.cards_index.length,
              ...props.cards_index,
            ],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing select_modifier_cards:", error);
        throw error;
      }
    };

    // Call the `play` system with the specified Account and calldata
    const play = async (props: {
      account: Account;
      game_id: number;
      cards_index: number[];
      modifiers_index: number[];
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "play",
            calldata: [
              props.game_id,
              props.cards_index.length,
              ...props.cards_index,
              props.modifiers_index.length,
              ...props.modifiers_index,
            ],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing play:", error);
        throw error;
      }
    };

    // Call the `discard` system with the specified Account and calldata
    const discard = async (props: {
      account: Account;
      game_id: number;
      cards_index: number[];
      modifiers_index: number[];
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "discard",
            calldata: [
              props.game_id,
              props.cards_index.length,
              ...props.cards_index,
              props.modifiers_index.length,
              ...props.modifiers_index,
            ],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing discard:", error);
        throw error;
      }
    };

    // Call the `end_turn` system with the specified Account and calldata
    const end_turn = async (props: { account: Account; game_id: number }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "end_turn",
            calldata: [props.game_id],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing end_turn:", error);
        throw error;
      }
    };

    // Call the `discard_effect_card` system with the specified Account and calldata
    const discard_effect_card = async (props: {
      account: Account;
      game_id: number;
      card_index: number;
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "discard_effect_card",
            calldata: [props.game_id, props.card_index],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing discard_effect_card:", error);
        throw error;
      }
    };

    // Call the `discard_special_card` system with the specified Account and calldata
    const discard_special_card = async (props: {
      account: Account;
      game_id: number;
      special_card_index: number;
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "discard_special_card",
            calldata: [props.game_id, props.special_card_index],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing discard_special_card:", error);
        throw error;
      }
    };

    // Call the `world` system with the specified Account and calldata
    const world = async (props: { account: Account }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "world",
            calldata: [],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing world:", error);
        throw error;
      }
    };

    // Call the `name` system with the specified Account and calldata
    const name = async (props: { account: Account }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "name",
            calldata: [],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing name:", error);
        throw error;
      }
    };

    return {
      create_game,
      create_level,
      select_deck,
      select_special_cards,
      select_modifier_cards,
      play,
      discard,
      end_turn,
      discard_effect_card,
      discard_special_card,
      world,
      name,
    };
  }

  // System definitions for `jokers_of_neon-poker_hand_system` contract
  function poker_hand_system() {
    const contract_name = "poker_hand_system";

    // Call the `world` system with the specified Account and calldata
    const world = async (props: { account: Account }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "world",
            calldata: [],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing world:", error);
        throw error;
      }
    };

    // Call the `get_player_poker_hands` system with the specified Account and calldata
    const get_player_poker_hands = async (props: {
      account: Account;
      game_id: number;
    }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "get_player_poker_hands",
            calldata: [props.game_id],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing get_player_poker_hands:", error);
        throw error;
      }
    };

    // Call the `name` system with the specified Account and calldata
    const name = async (props: { account: Account }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "name",
            calldata: [],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing name:", error);
        throw error;
      }
    };

    return {
      world,
      get_player_poker_hands,
      name,
    };
  }

  // System definitions for `jokers_of_neon-rage_system` contract
  function rage_system() {
    const contract_name = "rage_system";

    // Call the `calculate` system with the specified Account and calldata
    const calculate = async (props: { account: Account; game_id: number }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "calculate",
            calldata: [props.game_id],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing calculate:", error);
        throw error;
      }
    };

    // Call the `world` system with the specified Account and calldata
    const world = async (props: { account: Account }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "world",
            calldata: [],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing world:", error);
        throw error;
      }
    };

    // Call the `name` system with the specified Account and calldata
    const name = async (props: { account: Account }) => {
      try {
        return await provider.execute(
          props.account,
          {
            contractName: contract_name,
            entrypoint: "name",
            calldata: [],
          },
          "jokers_of_neon"
        );
      } catch (error) {
        console.error("Error executing name:", error);
        throw error;
      }
    };

    return {
      calculate,
      world,
      name,
    };
  }

  return {
    game_system: game_system(),
    poker_hand_system: poker_hand_system(),
    rage_system: rage_system(),
  };
}
