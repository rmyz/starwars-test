import { useState } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import PlanetCard from "../components/PlanetCard/PlanetCard";
import PlanetModal from "../components/PlanetModal/PlanetModal";
import useLocalStorageStore from "../hooks/useLocalStorageStore";
import { getAll } from "../useCases/planet/getAll";
import type { TPlanet } from "../types";
import {
  planetCreator,
  planetFilter,
  planetFinder,
  planetReplacer,
} from "../utils/planet";
import AlertDialogPrimitive from "../components/AlertDialog/AlertDialog";
import MainLayout from "../layouts/MainLayout/MainLayout";
import type { TEditFormValues } from "../components/EditForm/EditForm";

export type TProps = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export const STATUS = {
  idle: "idle",
  isEditing: "isEditing",
  isCreating: "isCreating",
} as const;

export type TStatus = typeof STATUS[keyof typeof STATUS];

export default function Home({
  planets: initialPlanets,
  totalCount: initialTotalCount,
}: TProps) {
  const [{ planets, totalCount }, setState] = useLocalStorageStore({
    planets: initialPlanets,
    totalCount: initialTotalCount,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const [planetSelected, setPlanetSelected] = useState<TPlanet>(planets[0]);
  const [status, setStatus] = useState<TStatus>(STATUS.idle);

  const handleOpen = (id: TPlanet["id"], callback?: () => void) => {
    const planetToOpen = planetFinder({ id, planets });

    if (planetToOpen) {
      setPlanetSelected(planetToOpen);
      onOpen();
      callback && callback();
    }
  };

  const handleClickCreate = () => {
    setStatus(STATUS.isCreating);
    onOpen();
  };

  const handleClickEditButton = (id: TPlanet["id"]) => {
    handleOpen(id, () => setStatus(STATUS.isEditing));
  };

  const handleClickDeleteButton = (id: TPlanet["id"]) => {
    const planetToOpen = planetFinder({ id, planets });

    if (planetToOpen) {
      setPlanetSelected(planetToOpen);
      onOpenAlert();
    }
  };

  const handleConfirmDelete = () => {
    const newPlanets = planetFilter({ id: planetSelected.id, planets });
    setState({ totalCount: newPlanets.length, planets: newPlanets });
  };

  const handleCloseModal = () => {
    setStatus(STATUS.idle);
    onClose();
  };

  const handleOnSubmitEditForm = ({
    values,
    id,
  }: {
    values: TEditFormValues;
    id: TPlanet["id"];
  }) => {
    const newPlanets = planetReplacer({ id, values, planets });

    setState({ totalCount: newPlanets.length, planets: newPlanets });
    onClose();
    setStatus(STATUS.idle);
  };

  const handleOnSubmitCreateForm = ({ values }: { values: TPlanet }) => {
    const newPlanets = planetCreator({ newPlanet: values, planets });

    setState({ totalCount: newPlanets.length, planets: newPlanets });
    onClose();
    setStatus(STATUS.idle);
  };

  return (
    <MainLayout title="Planets">
      <div className="flex justify-end">
        <Button onClick={handleClickCreate} colorScheme="purple">
          Add new Planet
        </Button>
      </div>
      <div className="flex flex-column">
        <div className="flex flex-wrap justify-center gap-20 mt-12">
          {planets.map((planet) => (
            <PlanetCard
              onClick={handleOpen}
              key={planet.id}
              planet={planet}
              onEdit={handleClickEditButton}
              onDelete={handleClickDeleteButton}
            />
          ))}
        </div>
        <PlanetModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          planet={planetSelected}
          status={status}
          setStatus={setStatus}
          handleClickDeleteButton={handleClickDeleteButton}
          handleOnSubmitEditForm={handleOnSubmitEditForm}
          handleOnSubmitCreateForm={handleOnSubmitCreateForm}
        />
        <AlertDialogPrimitive
          planet={planetSelected}
          isOpen={isOpenAlert}
          onClose={onCloseAlert}
          onConfirmDelete={handleConfirmDelete}
        />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const { planets, totalCount } = await getAll();

  return {
    props: {
      planets,
      totalCount,
    },
  };
}
