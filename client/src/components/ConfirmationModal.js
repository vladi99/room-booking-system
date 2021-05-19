import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure as chakraUseDisclosure
} from '@chakra-ui/react';

export function ConfirmationModal({isOpen, onClose, onConfirm, confirmationText}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {confirmationText}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={onConfirm} variant="ghost">Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export function useDisclosure() {
  return chakraUseDisclosure();
}
