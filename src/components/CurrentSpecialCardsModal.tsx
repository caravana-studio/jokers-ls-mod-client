import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { SpecialCards } from "./SpecialCards";
import { useTranslation } from "react-i18next";

interface CurrentSpecialCardsModalProps {
  close: () => void;
}

export const CurrentSpecialCardsModal = ({
  close,
}: CurrentSpecialCardsModalProps) => {
  const { t } = useTranslation(["store"]);
  return (
    <Modal size='3xl' isOpen={true} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="s" variant="neonWhite">
          {t('store.titles.my-special-cards')}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={2}>
            <SpecialCards inStore />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};