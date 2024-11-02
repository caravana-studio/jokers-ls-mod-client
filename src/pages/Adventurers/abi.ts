export const abi =[
    {
      "type": "impl",
      "name": "ContractImpl",
      "interface_name": "dojo::contract::contract::IContract"
    },
    {
      "type": "struct",
      "name": "core::byte_array::ByteArray",
      "members": [
        {
          "name": "data",
          "type": "core::array::Array::<core::bytes_31::bytes31>"
        },
        {
          "name": "pending_word",
          "type": "core::felt252"
        },
        {
          "name": "pending_word_len",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "interface",
      "name": "dojo::contract::contract::IContract",
      "items": [
        {
          "type": "function",
          "name": "name",
          "inputs": [],
          "outputs": [
            {
              "type": "core::byte_array::ByteArray"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "namespace",
          "inputs": [],
          "outputs": [
            {
              "type": "core::byte_array::ByteArray"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "tag",
          "inputs": [],
          "outputs": [
            {
              "type": "core::byte_array::ByteArray"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "name_hash",
          "inputs": [],
          "outputs": [
            {
              "type": "core::felt252"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "namespace_hash",
          "inputs": [],
          "outputs": [
            {
              "type": "core::felt252"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "selector",
          "inputs": [],
          "outputs": [
            {
              "type": "core::felt252"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "type": "impl",
      "name": "WorldProviderImpl",
      "interface_name": "dojo::world::world_contract::IWorldProvider"
    },
    {
      "type": "struct",
      "name": "dojo::world::world_contract::IWorldDispatcher",
      "members": [
        {
          "name": "contract_address",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "type": "interface",
      "name": "dojo::world::world_contract::IWorldProvider",
      "items": [
        {
          "type": "function",
          "name": "world",
          "inputs": [],
          "outputs": [
            {
              "type": "dojo::world::world_contract::IWorldDispatcher"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "type": "impl",
      "name": "GameSystemImpl",
      "interface_name": "loot_survivor_utils::systems::game_system::IGameSystem"
    },
    {
      "type": "enum",
      "name": "combat::constants::CombatEnums::Type",
      "variants": [
        {
          "name": "None",
          "type": "()"
        },
        {
          "name": "Magic_or_Cloth",
          "type": "()"
        },
        {
          "name": "Blade_or_Hide",
          "type": "()"
        },
        {
          "name": "Bludgeon_or_Metal",
          "type": "()"
        },
        {
          "name": "Necklace",
          "type": "()"
        },
        {
          "name": "Ring",
          "type": "()"
        }
      ]
    },
    {
      "type": "enum",
      "name": "combat::constants::CombatEnums::Tier",
      "variants": [
        {
          "name": "None",
          "type": "()"
        },
        {
          "name": "T1",
          "type": "()"
        },
        {
          "name": "T2",
          "type": "()"
        },
        {
          "name": "T3",
          "type": "()"
        },
        {
          "name": "T4",
          "type": "()"
        },
        {
          "name": "T5",
          "type": "()"
        }
      ]
    },
    {
      "type": "struct",
      "name": "loot_survivor_utils::models::beast_details::BeastDetails",
      "members": [
        {
          "name": "name",
          "type": "core::felt252"
        },
        {
          "name": "elemental",
          "type": "combat::constants::CombatEnums::Type"
        },
        {
          "name": "tier",
          "type": "combat::constants::CombatEnums::Tier"
        }
      ]
    },
    {
      "type": "struct",
      "name": "loot_survivor_utils::models::beast_stats::FixedBeastStats",
      "members": [
        {
          "name": "beast_id",
          "type": "core::integer::u8"
        },
        {
          "name": "level",
          "type": "core::integer::u16"
        },
        {
          "name": "starting_health",
          "type": "core::integer::u16"
        },
        {
          "name": "special_1",
          "type": "core::integer::u8"
        },
        {
          "name": "special_2",
          "type": "core::integer::u8"
        }
      ]
    },
    {
      "type": "struct",
      "name": "loot_survivor_utils::models::beast_stats::LiveBeastStats",
      "members": [
        {
          "name": "token_id",
          "type": "core::integer::u32"
        },
        {
          "name": "current_health",
          "type": "core::integer::u16"
        },
        {
          "name": "bonus_health",
          "type": "core::integer::u16"
        },
        {
          "name": "bonus_xp",
          "type": "core::integer::u16"
        },
        {
          "name": "attack_streak",
          "type": "core::integer::u8"
        },
        {
          "name": "last_death_timestamp",
          "type": "core::integer::u64"
        },
        {
          "name": "num_deaths",
          "type": "core::integer::u16"
        },
        {
          "name": "last_killed_by",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "struct",
      "name": "loot_survivor_utils::models::beast_stats::BeastStats",
      "members": [
        {
          "name": "fixed",
          "type": "loot_survivor_utils::models::beast_stats::FixedBeastStats"
        },
        {
          "name": "live",
          "type": "loot_survivor_utils::models::beast_stats::LiveBeastStats"
        }
      ]
    },
    {
      "type": "struct",
      "name": "loot_survivor_utils::models::beast::Beast",
      "members": [
        {
          "name": "token_id",
          "type": "core::integer::u32"
        },
        {
          "name": "details",
          "type": "loot_survivor_utils::models::beast_details::BeastDetails"
        },
        {
          "name": "stats",
          "type": "loot_survivor_utils::models::beast_stats::BeastStats"
        }
      ]
    },
    {
      "type": "struct",
      "name": "loot_survivor_utils::models::adventurer::Adventurer",
      "members": [
        {
          "name": "level",
          "type": "core::integer::u8"
        },
        {
          "name": "health",
          "type": "core::integer::u16"
        },
        {
          "name": "rank_at_death",
          "type": "core::integer::u8"
        }
      ]
    },
    {
      "type": "interface",
      "name": "loot_survivor_utils::systems::game_system::IGameSystem",
      "items": [
        {
          "type": "function",
          "name": "use_adventurer",
          "inputs": [
            {
              "name": "adventurer_id",
              "type": "core::integer::u32"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "use_beast",
          "inputs": [
            {
              "name": "beast_id",
              "type": "core::integer::u32"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "reset_adventurer",
          "inputs": [
            {
              "name": "adventurer_id",
              "type": "core::integer::u32"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "reset_beast",
          "inputs": [
            {
              "name": "beast_id",
              "type": "core::integer::u32"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "get_beast",
          "inputs": [
            {
              "name": "id",
              "type": "core::integer::u32"
            }
          ],
          "outputs": [
            {
              "type": "loot_survivor_utils::models::beast::Beast"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "get_beast_stats",
          "inputs": [
            {
              "name": "id",
              "type": "core::integer::u32"
            }
          ],
          "outputs": [
            {
              "type": "loot_survivor_utils::models::beast_stats::BeastStats"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "get_beast_stats_live",
          "inputs": [
            {
              "name": "id",
              "type": "core::integer::u32"
            }
          ],
          "outputs": [
            {
              "type": "loot_survivor_utils::models::beast_stats::LiveBeastStats"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "get_beast_stats_fixed",
          "inputs": [
            {
              "name": "id",
              "type": "core::integer::u32"
            }
          ],
          "outputs": [
            {
              "type": "loot_survivor_utils::models::beast_stats::FixedBeastStats"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "get_adventurer",
          "inputs": [
            {
              "name": "id",
              "type": "core::integer::u32"
            }
          ],
          "outputs": [
            {
              "type": "loot_survivor_utils::models::adventurer::Adventurer"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "type": "impl",
      "name": "IDojoInitImpl",
      "interface_name": "loot_survivor_utils::systems::game_system::game_system::IDojoInit"
    },
    {
      "type": "interface",
      "name": "loot_survivor_utils::systems::game_system::game_system::IDojoInit",
      "items": [
        {
          "type": "function",
          "name": "dojo_init",
          "inputs": [],
          "outputs": [],
          "state_mutability": "view"
        }
      ]
    },
    {
      "type": "impl",
      "name": "UpgradableImpl",
      "interface_name": "dojo::contract::upgradeable::IUpgradeable"
    },
    {
      "type": "interface",
      "name": "dojo::contract::upgradeable::IUpgradeable",
      "items": [
        {
          "type": "function",
          "name": "upgrade",
          "inputs": [
            {
              "name": "new_class_hash",
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::contract::upgradeable::upgradeable::Upgraded",
      "kind": "struct",
      "members": [
        {
          "name": "class_hash",
          "type": "core::starknet::class_hash::ClassHash",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "dojo::contract::upgradeable::upgradeable::Event",
      "kind": "enum",
      "variants": [
        {
          "name": "Upgraded",
          "type": "dojo::contract::upgradeable::upgradeable::Upgraded",
          "kind": "nested"
        }
      ]
    },
    {
      "type": "event",
      "name": "loot_survivor_utils::systems::game_system::game_system::Event",
      "kind": "enum",
      "variants": [
        {
          "name": "UpgradeableEvent",
          "type": "dojo::contract::upgradeable::upgradeable::Event",
          "kind": "nested"
        }
      ]
    }
  ]