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
import { formatNumber } from "../../utils/numberFormatter";
import DescriptionItem from "../DescriptionItem/DescriptionItem";

const PlanetCard = ({
  planet,
  onEdit,
  onDelete,
}: {
  planet: TPlanet;
  onEdit: (id: TPlanet["id"]) => void;
  onDelete: (id: TPlanet["id"]) => void;
}) => {
  const { id, diameter, climates, name, population, terrains } = planet;

  const handleOnEdit = () => {
    onEdit(id);
  };

  const handleOnDelete = () => {
    onDelete(id);
  };

  return (
    <article className="flex flex-col max-w-[250px]">
      <div className="absolute flex flex-col gap-6 mt-4 ml-52">
        <button onClick={handleOnEdit}>
          <FiEdit className="text-2xl" />
        </button>
        <button onClick={handleOnDelete}>
          <FiTrash className="text-2xl" />
        </button>
      </div>
      <Image
        src="/images/planet-1.png"
        alt={name}
        height="250"
        width="250"
        className="rounded-xl aspect-square"
      />
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-xl font-semibold text-center">{name}</p>

        <DescriptionItem
          title="Diameter"
          value={diameter ? `${formatNumber({ value: diameter })} km` : "-"}
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
    </article>
  );
};

export default PlanetCard;
