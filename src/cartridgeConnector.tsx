import CartridgeConnector from "@cartridge/connector";
import { getContractByName } from "@dojoengine/core";
import { Connector } from "@starknet-react/core";
import manifest from "./manifest.json";
const paymaster: any = { caller: "0x414e595f43414c4c4552" };

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
    {
      target: player_system_contract_address,
      method: "get_player_current_hand",
    },
    { target: player_system_contract_address, method: "get_game" },
    { target: player_system_contract_address, method: "get_challenge" },
  ],
}) as never as Connector;

export default cartridgeConnector;
