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
import { useEffect, useState } from "react";
import Image from "next/image";

import type { TPlanet, TResident } from "../../types";
import { getById } from "../../useCases/planet/getById";
import DescriptionItem from "../DescriptionItem/DescriptionItem";
import { formatNumber } from "../../utils/numberFormatter";
import { FiCircle, FiHome, FiMap, FiSun, FiUsers } from "react-icons/fi";
import type { TStatus } from "../../pages";

const PlanetModal = ({
  isOpen,
  onClose,
  planet,
  status,
  handleClickDeleteButton,
}: {
  isOpen: boolean;
  onClose: () => void;
  planet: TPlanet;
  status: TStatus;
  handleClickDeleteButton: (id: TPlanet["id"]) => void;
}) => {
  const { id, diameter, climates, name, population, terrains } = planet;
  const [residents, setResidents] = useState<Array<TResident>>([]);

  useEffect(() => {
    async function getResidents() {
      setResidents([]);
      try {
        const planet = await getById({ id });
        planet?.residentConnection?.residents &&
          setResidents(planet.residentConnection.residents);
      } catch {}
    }

    if (isOpen) {
      getResidents();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
            <Image
              src="/images/planet-1.png"
              alt={name}
              height="300"
              width="300"
              className="rounded-xl aspect-square"
            />
            <div>
              <DescriptionItem
                title="Diameter"
                value={
                  diameter ? `${formatNumber({ value: diameter })} km` : "-"
                }
                Icon={FiCircle}
              />
              <DescriptionItem
                title="Climates"
                value={climates.join(", ")}
                Icon={FiSun}
              />
              <DescriptionItem
                title="Terrains"
                value={terrains.join(", ")}
                Icon={FiMap}
              />
              <DescriptionItem
                title="Population"
                value={population ? formatNumber({ value: population }) : "-"}
                Icon={FiUsers}
              />
            </div>
          </div>
          <div className="mt-4">
            <DescriptionItem
              title="Residents"
              value={
                residents.length > 0
                  ? residents.map((resident) => resident.name).join(", ")
                  : "-"
              }
              Icon={FiHome}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => handleClickDeleteButton(id)}
            mr={3}
            colorScheme="red"
          >
            Delete
          </Button>
          <Button mr={3} colorScheme="blue">
            Edit
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PlanetModal;
