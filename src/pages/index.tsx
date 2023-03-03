import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import PlanetCard from "../components/PlanetCard/PlanetCard";
import PlanetModal from "../components/PlanetModal/PlanetModal";
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
import { useStore } from "../store/store";

export type TProps = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export const STATUS = {
  idle: "idle",
  isEditing: "isEditing",
  isCreating: "isCreating",
} as const;

export type TStatus = typeof STATUS[keyof typeof STATUS];

export default function Home({ planets: initialPlanets }: TProps) {
  const {
    setPlanets,
    planets,
    planetSelected,
    setPlanetSelected,
    setStatus,
    setIsOpenPlanetModal,
    setIsOpenDeleteAlert,
  } = useStore();

  useEffect(() => {
    if (planets.length === 0) {
      setPlanets(initialPlanets);
    }
  }, []);

  const handleOpen = (id: TPlanet["id"], callback?: () => void) => {
    const planetToOpen = planetFinder({ id, planets });

    if (planetToOpen) {
      setPlanetSelected(planetToOpen);
      setIsOpenPlanetModal(true);
      callback && callback();
    }
  };

  const handleClickCreate = () => {
    setStatus(STATUS.isCreating);
    setIsOpenPlanetModal(true);
  };

  const handleClickEditButton = (id: TPlanet["id"]) => {
    handleOpen(id, () => setStatus(STATUS.isEditing));
  };

  const handleClickDeleteButton = (id: TPlanet["id"]) => {
    const planetToOpen = planetFinder({ id, planets });

    if (planetToOpen) {
      setPlanetSelected(planetToOpen);
      setIsOpenDeleteAlert(true);
    }
  };

  const handleConfirmDelete = () => {
    const newPlanets = planetFilter({ id: planetSelected.id, planets });
    setPlanets(newPlanets);
  };

  const handleOnSubmitEditForm = ({
    values,
    id,
  }: {
    values: TEditFormValues;
    id: TPlanet["id"];
  }) => {
    const newPlanets = planetReplacer({ id, values, planets });

    setPlanets(newPlanets);
    setIsOpenPlanetModal(false);
    setStatus(STATUS.idle);
  };

  const handleOnSubmitCreateForm = ({ values }: { values: TPlanet }) => {
    const newPlanets = planetCreator({ newPlanet: values, planets });

    setPlanets(newPlanets);
    setIsOpenPlanetModal(false);
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
          handleClickDeleteButton={handleClickDeleteButton}
          handleOnSubmitEditForm={handleOnSubmitEditForm}
          handleOnSubmitCreateForm={handleOnSubmitCreateForm}
        />
        <AlertDialogPrimitive onConfirmDelete={handleConfirmDelete} />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const { planets } = await getAll();

  return {
    props: {
      planets,
    },
  };
}
