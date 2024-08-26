import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'

export const Content = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className="text-xl text-red-500">
      <a href="https://www.baidu.com" target="_blank" rel="noreferrer">asdf</a>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <p>Content</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
