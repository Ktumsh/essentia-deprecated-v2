import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

interface Props {
  action: string | null;
  executeDelete: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

const DeleteChatModal: React.FC<Props> = ({
  action,
  executeDelete,
  isOpen,
  onOpen,
  onOpenChange,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ¿Estás absolutamente seguro?
              </ModalHeader>
              <ModalBody>
                <p className="text-base-color-m dark:text-base-color-dark-m">
                  {action === "all"
                    ? "Esto eliminará permanentemente su historial de chat y eliminará sus datos de nuestros servidores."
                    : "Esto eliminará permanentemente su mensaje de chat y eliminará sus datos de nuestros servidores."}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={executeDelete}
                  onPress={onClose}
                >
                  Eliminar
                </Button>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteChatModal;
