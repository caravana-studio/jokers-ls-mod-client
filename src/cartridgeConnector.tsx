import CartridgeConnector from "@cartridge/connector";
import { getContractByName } from "@dojoengine/core";
import { Connector } from "@starknet-react/core";
import manifest from "./manifest.json";

const game_system_contract_address = getContractByName(
  manifest,
  "jokers_ls_mod",
  "game_system"
)?.address;

const poker_hand_system_contract_address = getContractByName(
  manifest,
  "jokers_ls_mod",
  "poker_hand_system"
)?.address;

const rage_system_contract_address = getContractByName(
  manifest,
  "jokers_ls_mod",
  "rage_system"
)?.address;

const cartridgeConnector = new CartridgeConnector({
  theme: "jokers-of-neon",
  config: {
    presets: {
      "jokers-of-neon": {
        id: "jokers-of-neon",
        name: "Jokers of Neon - Loot Survivor MOD",
        icon: "/whitelabel/jokers-of-neon/icon.png",
        cover: "/whitelabel/jokers-of-neon/cover.png",
        colors: {
          primary: "#33ff33",
        },
      },
    },
  },
  rpc: import.meta.env.VITE_RPC_URL,
  policies: [
    {
      target: game_system_contract_address,
      method: "create_game",
    },
    {
      target: game_system_contract_address,
      method: "create_level",
    },
    {
      target: game_system_contract_address,
      method: "create_reward",
    },
    {
      target: game_system_contract_address,
      method: "select_reward",
    },
    {
      target: game_system_contract_address,
      method: "select_deck",
    },
    {
      target: game_system_contract_address,
      method: "select_special_cards",
    },
    {
      target: game_system_contract_address,
      method: "select_modifier_cards",
    },
    {
      target: game_system_contract_address,
      method: "play",
    },
    {
      target: game_system_contract_address,
      method: "discard",
    },
    {
      target: game_system_contract_address,
      method: "end_turn",
    },
    {
      target: game_system_contract_address,
      method: "discard_effect_card",
    },
    {
      target: game_system_contract_address,
      method: "discard_special_card",
    },
    {
      target: game_system_contract_address,
      method: "use_adventurer",
    },
    {
      target: game_system_contract_address,
      method: "skip_adventurer",
    },
    {
      target: game_system_contract_address,
      method: "select_aventurer_cards",
    },
    {
      target: poker_hand_system_contract_address,
      method: "get_player_poker_hands",
    },
    {
      target: rage_system_contract_address,
      method: "calculate",
    },
  ],
}) as never as Connector;

export default cartridgeConnector;
