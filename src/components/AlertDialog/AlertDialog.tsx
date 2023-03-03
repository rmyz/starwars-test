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
import { useStore } from "../../store/store";

const AlertDialogPrimitive = ({ onConfirmDelete }) => {
  const { planetSelected, isOpenDeleteAlert, setIsOpenDeleteAlert } =
    useStore();

  const cancelRef = useRef();

  const { name } = planetSelected;

  const handleDelete = () => {
    onConfirmDelete();
    setIsOpenDeleteAlert(false);
  };

  return (
    <AlertDialog
      isOpen={isOpenDeleteAlert}
      leastDestructiveRef={cancelRef}
      onClose={() => setIsOpenDeleteAlert(false)}
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
            <Button ref={cancelRef} onClick={() => setIsOpenDeleteAlert(false)}>
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
