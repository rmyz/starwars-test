import Image from "next/image";
import { TPlanet } from "../../types";
import {
  FiTrash,
  FiEdit,
  FiCircle,
  FiSun,
  FiUsers,
  FiMap,
} from "react-icons/fi";
import DescriptionItem from "../DescriptionItem/DescriptionItem";

const PlanetCard = ({
  planet,
  onEdit,
  onDelete,
  onClick,
}: {
  planet: TPlanet;
  onEdit: (id: TPlanet["id"]) => void;
  onDelete: (id: TPlanet["id"]) => void;
  onClick: (id: TPlanet["id"]) => void;
}) => {
  const { id, img, diameter, climates, name, population, terrains } = planet;

  const handleOnEdit = () => {
    onEdit(id);
  };

  const handleOnDelete = () => {
    onDelete(id);
  };

  return (
    <div
      onClick={() => onClick(id)}
      className="flex flex-col max-w-[250px] bg-opacity-30 p-6 rounded-lg outline outline-2 outline-primary hover:bg-opacity-100 transition-all cursor-pointer"
    >
      <div className="absolute flex flex-col gap-6 ml-[190px]">
        <button
          onClick={(event) => {
            event.stopPropagation();
            handleOnEdit();
          }}
        >
          <FiEdit className="text-2xl transition-all hover:text-primary" />
        </button>
        <button
          onClick={(event) => {
            event.stopPropagation();
            handleOnDelete();
          }}
        >
          <FiTrash className="text-2xl transition-all hover:text-primary" />
        </button>
      </div>
      <Image
        src={img}
        alt={name}
        height="250"
        width="250"
        className="rounded-xl aspect-square"
      />
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-xl font-semibold text-center">{name}</p>
        <DescriptionItem
          title="Diameter"
          value={diameter ? `${diameter} km` : "-"}
          Icon={FiCircle}
        />
        <DescriptionItem title="Climates" value={climates} Icon={FiSun} />
        <DescriptionItem title="Terrains" value={terrains} Icon={FiMap} />
        <DescriptionItem
          title="Population"
          value={population ? population : "-"}
          Icon={FiUsers}
        />
      </div>
    </div>
  );
};

export default PlanetCard;
