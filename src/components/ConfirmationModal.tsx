import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LS_GREEN } from "../theme/colors";

interface ConfirmationModalProps {
  close: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
}

export const ConfirmationModal = ({
  close,
  title,
  description,
  onConfirm,
}: ConfirmationModalProps) => {
  const { t } = useTranslation(["game"]);
  return (
    <Modal isOpen={true} onClose={close}>
      <ModalOverlay
        bg="blackAlpha.400"
        backdropFilter="auto"
        backdropBlur="5px"
      />
      <ModalContent>
        <ModalHeader>
          <Heading size="l" variant="lsGreen">
            {title}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={4} flexDirection="column">
            <Text size="md">{description}</Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="defaultOutline" size="sm" onClick={close}>
            {t("confirmation-modal.close")}
          </Button>
          <Button
            variant="secondarySolid"
            boxShadow={`0px 0px 10px 6px ${LS_GREEN}`}
            size="sm"
            onClick={onConfirm}
            ml={3}
          >
            {t("confirmation-modal.confirm")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
