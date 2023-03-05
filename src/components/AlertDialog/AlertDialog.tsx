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
import useAppStore from "../../hooks/useAppStore";
import { remove } from "../../useCases/planet/remove";
import { modifyPlanets } from "../../utils/modifyPlanets";

const AlertDialogPrimitive = () => {
  const {
    planetSelected,
    isOpenDeleteAlert,
    setIsOpenDeleteAlert,
    setIsOpenPlanetModal,
    planets,
    setPlanets,
    backupPlanets,
    setBackupPlanets,
  } = useAppStore();

  const cancelRef = useRef();

  const { name } = planetSelected;

  const handleDelete = () => {
    modifyPlanets({
      backupPlanets,
      planets,
      setPlanets,
      setBackupPlanets,
      callback: (planetsToModify, setter) => {
        const newPlanets = remove({
          id: planetSelected.id,
          planets: planetsToModify,
        });
        setter(newPlanets);
      },
    });

    setIsOpenDeleteAlert(false);
    setIsOpenPlanetModal(false);
  };

  return (
    <AlertDialog
      isOpen={isOpenDeleteAlert}
      // @ts-expect-error
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
            <p>You can not undo this action afterwards</p>
          </AlertDialogBody>

          <AlertDialogFooter>
            {/* @ts-expect-error-next-line */}
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
