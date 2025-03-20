import { getContractByName } from "@dojoengine/core";
import manifest from "../../manifest.json";

const game_system_contract_address = getContractByName(
    manifest,
    "jokers_ls_mod",
    "game_system"
  )?.address;
  
  console.log("game_system_contract_address", game_system_contract_address);
  
  const poker_hand_system_contract_address = getContractByName(
    manifest,
    "jokers_ls_mod",
    "poker_hand_system"
  )?.address;
  
  console.log(
    "poker_hand_system_contract_address",
    poker_hand_system_contract_address
  );
  
  const rage_system_contract_address = getContractByName(
    manifest,
    "jokers_ls_mod",
    "rage_system"
  )?.address;
  
  console.log("rage_system_contract_address", rage_system_contract_address);
  
  const player_system_contract_address = getContractByName(
    manifest,
    "jokers_ls_mod",
    "player_system"
  )?.address;
  
  console.log("player_system_contract_address", player_system_contract_address);

  export const policies = {
    contracts: {
        [game_system_contract_address]: {
            methods: [
                {
                    name: "Create game",
                    entrypoint: "create_game",
                  },
                  {
                    name: "Create level",
                    entrypoint: "create_level",
                  },
                  {
                    name: "Create reward",
                    entrypoint: "create_reward",
                  },
                  {
                    name: "Select reward",
                    entrypoint: "select_reward",
                  },
                  {
                    name: "Select deck",
                    entrypoint: "select_deck",
                  },
                  {
                    name: "Select special cards",
                    entrypoint: "select_special_cards",
                  },
                  {
                    name: "Select modifier cards",
                    entrypoint: "select_modifier_cards",
                  },
                  {
                    name: "Play",
                    entrypoint: "play",
                  },
                  {
                    name: "Discard",
                    entrypoint: "discard",
                  },
                  {
                    name: "End turn",
                    entrypoint: "end_turn",
                  },
                  {
                    name: "Discard effect card",
                    entrypoint: "discard_effect_card",
                  },
                  {
                    name: "Discard special card",
                    entrypoint: "discard_special_card",
                  },
                  {
                    name: "Use adventurer",
                    entrypoint: "use_adventurer",
                  },
                  {
                    name: "Skip adventurer",
                    entrypoint: "skip_adventurer",
                  },
                  {
                    name: "Select aventurer cards",
                    entrypoint: "select_aventurer_cards",
                  },
                  {
                    name: "Skip unpassed obstacle",
                    entrypoint: "skip_unpassed_obstacle",
                  },
            ],
        },
        [poker_hand_system_contract_address]: {
            methods: [
                {
                    name: "Get player poker hands",
                    entrypoint: "get_player_poker_hands",
                },
            ],
        },
        [rage_system_contract_address]: {
            methods: [
                {
                    name: "Calculate",
                    entrypoint: "calculate",
                },
            ],
        },
    },
};
