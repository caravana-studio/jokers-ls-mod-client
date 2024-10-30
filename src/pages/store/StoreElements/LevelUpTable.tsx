import { Box } from "@chakra-ui/react";
import { PlaysTable } from "../../Plays/PlaysTable";
import { ShopItems } from "../../../dojo/queries/useShopItems";

interface LevelUpTableProps {
    shopItems: ShopItems;
    isSmallScreen: boolean;
}

const LevelUpTable: React.FC<LevelUpTableProps> = ({ shopItems, isSmallScreen }) => (
    <Box 
        className="game-tutorial-step-2"
        py={isSmallScreen ? 2 : [2, 2, 2, 2, 4]}
        width={isSmallScreen ? "auto" : "100%"}
    >
      {shopItems.pokerHandItems.length > 0 && <PlaysTable inStore />}
    </Box>
);

export default LevelUpTable;