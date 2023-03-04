import { Button } from "@chakra-ui/react";
import PlanetCard from "../components/PlanetCard/PlanetCard";
import PlanetModal from "../components/PlanetModal/PlanetModal";
import { getAll } from "../useCases/planet/getAll";
import type { TPlanet } from "../types";
import AlertDialogPrimitive from "../components/AlertDialog/AlertDialog";
import MainLayout from "../layouts/MainLayout/MainLayout";
import type { TEditFormValues } from "../components/EditForm/EditForm";
import useAppStore from "../hooks/useAppStore";
import { remove } from "../useCases/planet/remove";
import { edit } from "../useCases/planet/edit";
import { add } from "../useCases/planet/add";
import { search } from "../useCases/planet/search";
import { useMemo } from "react";
import Pagination from "../components/Pagination/Pagination";

export type TProps = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export const STATUS = {
  idle: "idle",
  isEditing: "isEditing",
  isCreating: "isCreating",
} as const;

export type TStatus = typeof STATUS[keyof typeof STATUS];

export const PLANETS_PER_PAGE = 10;

export default function Home() {
  const {
    setPlanets,
    planets,
    planetSelected,
    setPlanetSelected,
    setStatus,
    setIsOpenPlanetModal,
    setIsOpenDeleteAlert,
    currentPage,
  } = useAppStore();

  const paginatedPlanets = useMemo(
    () =>
      planets.slice(
        currentPage * PLANETS_PER_PAGE,
        (currentPage + 1) * PLANETS_PER_PAGE
      ),
    [currentPage, planets]
  );

  const handleOpen = (id: TPlanet["id"], callback?: () => void) => {
    const planetToOpen = search({ id, planets });

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
    const planetToOpen = search({ id, planets });

    if (planetToOpen) {
      setPlanetSelected(planetToOpen);
      setIsOpenDeleteAlert(true);
    }
  };

  const handleConfirmDelete = () => {
    const newPlanets = remove({ id: planetSelected.id, planets });

    setPlanets(newPlanets);
  };

  const handleOnSubmitEditForm = ({
    values,
    id,
  }: {
    values: TEditFormValues;
    id: TPlanet["id"];
  }) => {
    const newPlanets = edit({ id, values, planets });

    setPlanets(newPlanets);
    setIsOpenPlanetModal(false);
    setStatus(STATUS.idle);
  };

  const handleOnSubmitCreateForm = ({ values }: { values: TPlanet }) => {
    const newPlanets = add({ newPlanet: values, planets });

    setPlanets(newPlanets);
    setIsOpenPlanetModal(false);
    setStatus(STATUS.idle);
  };

  return (
    <>
      <MainLayout title="Planets">
        <div className="flex justify-end">
          <Button onClick={handleClickCreate} colorScheme="purple">
            Add new Planet
          </Button>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-wrap justify-center gap-20 mt-12">
            {paginatedPlanets.map((planet) => (
              <PlanetCard
                onClick={handleOpen}
                key={planet.id}
                planet={planet}
                onEdit={handleClickEditButton}
                onDelete={handleClickDeleteButton}
              />
            ))}
          </div>
          <Pagination />
        </div>
      </MainLayout>
      <PlanetModal
        handleClickDeleteButton={handleClickDeleteButton}
        handleOnSubmitEditForm={handleOnSubmitEditForm}
        handleOnSubmitCreateForm={handleOnSubmitCreateForm}
      />
      <AlertDialogPrimitive onConfirmDelete={handleConfirmDelete} />
    </>
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
