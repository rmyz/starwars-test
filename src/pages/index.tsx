import PlanetCard from "../components/PlanetCard/PlanetCard";
import useLocalStorageStore from "../hooks/useLocalStorageStore";
import { getAll } from "../useCases/planet/getAll";

export type TProps = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function Home({
  planets: initialPlanets,
  totalCount: initialTotalCount,
}: TProps) {
  const [{ planets, totalCount }] = useLocalStorageStore({
    planets: initialPlanets,
    totalCount: initialTotalCount,
  });

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <div className="lg:p-16 lg:px-32">
      <h1 className="text-center text-black text-7xl font-starjedi">Planets</h1>
      <div className="flex flex-column">
        <div className="flex flex-wrap justify-center gap-20 mt-12">
          {planets.map((planet) => (
            <PlanetCard
              key={planet.id}
              planet={planet}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
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
