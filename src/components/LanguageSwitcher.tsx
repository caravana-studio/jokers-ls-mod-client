import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import { CircleFlagLanguage } from "react-circle-flags";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation(["home"]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box zIndex={999} position="absolute" right="20px" top="20px">
      <Menu>
        <MenuButton as={Button} p={"0 !important"} width={"auto"}>
          <Flex width={"25px"} m={"0 auto"}>
            <CircleFlagLanguage languageCode={i18n.language.substring(0, 2)} />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => changeLanguage("en")} gap={2}>
            <Box width={"30px"}>
              <CircleFlagLanguage languageCode="en-us" />
            </Box>
            English
          </MenuItem>
          <MenuItem onClick={() => changeLanguage("es")} gap={2}>
            <Box width={"30px"}>
              <CircleFlagLanguage languageCode="es" />
            </Box>
            Español
          </MenuItem>
          <MenuItem onClick={() => changeLanguage("pt")} gap={2}>
            <Box width={"30px"}>
              <CircleFlagLanguage languageCode="pt" />
            </Box>
            Português
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
