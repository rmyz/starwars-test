import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Image from "next/image";

import { getById } from "../../useCases/planet/getById";
import DescriptionItem from "../DescriptionItem/DescriptionItem";
import { FiCircle, FiHome, FiMap, FiSun, FiUsers } from "react-icons/fi";
import type { TPlanet } from "../../types";
import { STATUS } from "../../pages";
import EditForm from "../EditForm/EditForm";
import CreateForm from "../NewForm/NewForm";
import useAppStore from "../../hooks/useAppStore";
import { planetReplacer } from "../../utils/planet";
import { getPlanetImg } from "../../utils/getPlanetImg";

const PlanetModal = ({
  handleClickDeleteButton,
}: {
  handleClickDeleteButton: (id: TPlanet["id"]) => void;
}) => {
  const {
    planets,
    setPlanets,
    planetSelected,
    setPlanetSelected,
    status,
    setStatus,
    isOpenPlanetModal,
    setIsOpenPlanetModal,
  } = useAppStore();

  const {
    id,
    img = getPlanetImg(),
    diameter,
    climates,
    name,
    population,
    terrains,
    residents,
  } = planetSelected;

  useEffect(() => {
    async function getResidents() {
      try {
        const fullPlanet = await getById({ id });

        if (fullPlanet && fullPlanet.residents) {
          const newPlanets = planetReplacer({
            id,
            values: {
              residents: fullPlanet.residents,
              diameter,
              climates,
              population,
              terrains,
              img,
            },
            planets,
          });

          setPlanets(newPlanets);
          setPlanetSelected({ ...fullPlanet, img });
        }
      } catch {
        console.error("There has been an error getting by id");
      }
    }

    if (isOpenPlanetModal && id && !residents) {
      getResidents();
    }
  }, [isOpenPlanetModal]);

  const handleClose = () => {
    setStatus(STATUS.idle);
    setIsOpenPlanetModal(false);
  };

  return (
    <Modal isOpen={isOpenPlanetModal} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="bg">
        <ModalHeader>
          {status !== STATUS.isCreating ? name : "Create a new Planet"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
            <Image
              src={img}
              alt={name}
              height="300"
              width="300"
              className="rounded-xl aspect-square"
            />
            {status === STATUS.idle ? (
              <div className="flex flex-col gap-4">
                <DescriptionItem
                  title="Diameter"
                  value={diameter ? `${diameter} km` : "-"}
                  Icon={FiCircle}
                />
                <DescriptionItem
                  title="Climates"
                  value={climates}
                  Icon={FiSun}
                />
                <DescriptionItem
                  title="Terrains"
                  value={terrains}
                  Icon={FiMap}
                />
                <DescriptionItem
                  title="Population"
                  value={population ? population : "-"}
                  Icon={FiUsers}
                />
                <DescriptionItem
                  title="Residents"
                  value={residents ? residents : "-"}
                  Icon={FiHome}
                />
              </div>
            ) : null}

            {status === STATUS.isEditing ? <EditForm /> : null}

            {status === STATUS.isCreating ? (
              <CreateForm onCancel={handleClose} />
            ) : null}
          </div>
        </ModalBody>

        {status === STATUS.idle ? (
          <ModalFooter>
            <Button
              onClick={() => handleClickDeleteButton(id)}
              mr={3}
              bg="danger"
            >
              Delete
            </Button>
            <Button
              mr={3}
              onClick={() => setStatus(STATUS.isEditing)}
              bg="blue"
            >
              Edit
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </ModalFooter>
        ) : null}
      </ModalContent>
    </Modal>
  );
};

export default PlanetModal;
