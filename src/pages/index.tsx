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

  console.log(planets);
  return <div className="text-3xl">{totalCount}</div>;
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
