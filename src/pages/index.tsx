import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import PlanetCard from "../components/PlanetCard/PlanetCard";
import PlanetModal from "../components/PlanetModal/PlanetModal";
import useLocalStorageStore from "../hooks/useLocalStorageStore";
import { getAll } from "../useCases/planet/getAll";
import type { TPlanet } from "../types";
import { planetFilter, planetFinder } from "../utils/planet";
import AlertDialogPrimitive from "../components/AlertDialog/AlertDialog";
import MainLayout from "../layouts/MainLayout/MainLayout";

export type TProps = Awaited<ReturnType<typeof getServerSideProps>>["props"];

const STATUS = {
  isEditing: "isEditing",
  idle: "idle",
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

  const handleEdit = (id: TPlanet["id"]) => {
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

  return (
    <MainLayout title="Planets">
      <div className="flex flex-column">
        <div className="flex flex-wrap justify-center gap-20 mt-12">
          {planets.map((planet) => (
            <PlanetCard
              onClick={handleOpen}
              key={planet.id}
              planet={planet}
              onEdit={handleEdit}
              onDelete={handleClickDeleteButton}
            />
          ))}
        </div>
        <PlanetModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          planet={planetSelected}
          status={status}
          handleClickDeleteButton={handleClickDeleteButton}
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
