// @ts-nocheck
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

const AlertDialogPrimitive = ({ isOpen, onClose, planet, onConfirmDelete }) => {
  const cancelRef = useRef();
  const { name } = planet;

  const handleDelete = () => {
    onConfirmDelete();
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Planet
          </AlertDialogHeader>

          <AlertDialogBody>
            <b>Are you sure you want to delete {name}?</b>
            <p>You can not undo this action afterwards.</p>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDialogPrimitive;
