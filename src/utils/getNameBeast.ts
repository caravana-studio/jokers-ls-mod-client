export const getNameBeast = (beastId: number): String => {
    if (beastId > 1 && beastId <= 75) {
        const beasts: string[] = [
            "Ammit",
            "Anansi",
            "Balrog",
            "Banshee",
            "Basilisk",
            "Bear",
            "Behemoth",
            "Berserker",
            "Bigfoot",
            "Chimera",
            "Chupacabra",
            "Colossus",
            "Cyclops",
            "Direwolf",
            "Dragon",
            "Draugr",
            "Ent",
            "Ettin",
            "Fairy",
            "Fenrir",
            "Ghoul",
            "Giant",
            "Gnome",
            "Goblin",
            "Golem",
            "Gorgon",
            "Griffin",
            "Harpy",
            "Hippogriff",
            "Hydra",
            "Jaguar",
            "Jiangshi",
            "Jotunn",
            "Juggernaut",
            "Kappa",
            "Kelpie",
            "Kitsune",
            "Kraken",
            "Leprechaun",
            "Leviathan",
            "Lich",
            "Manticore",
            "Mantis",
            "Minotaur",
            "Nemeanlion",
            "Nephilim",
            "Nue",
            "Ogre",
            "Oni",
            "Orc",
            "Pegasus",
            "Phoenix",
            "Pixie",
            "Qilin",
            "Rakshasa",
            "Rat",
            "Roc",
            "Satori",
            "Skeleton",
            "Skinwalker",
            "Spider",
            "Sprite",
            "Tarrasque",
            "Titan",
            "Troll",
            "Typhon",
            "Vampire",
            "Warlock",
            "Wendigo",
            "Weretiger",
            "Werewolf",
            "Wolf",
            "Wraith",
            "Wyvern",
            "Yeti"
        ];
        return beasts[beastId - 1]
    } else {
        const beasts: string[] = [
            "Fallen Jack",
            "Fallen Queen",
            "Fallen King",
            "Fallen Joker",
            "Fallen Neon Jack",
            "Fallen Neon Queen",
            "Fallen Neon King",
            "Fallen Neon Joker"
        ];
        return beasts[beastId - 100 - 1]
    }
};
