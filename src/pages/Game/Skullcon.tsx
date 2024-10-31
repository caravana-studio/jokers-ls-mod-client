import { Flex } from "@chakra-ui/react";
import Skull from "../../assets/skull.svg?component";

export const SkullIcon = ({ color = "white", used = false, size = "15px" }) => {
  return (
    <Flex alignItems="center">
      <Skull width={size} height={size} fill={color} opacity={used ? "30%" : "100%"} />
    </Flex>
  );
};
