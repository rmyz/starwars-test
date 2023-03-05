import type { TStore } from "../store/store";

export const modifyPlanets = ({
  backupPlanets,
  planets,
  setPlanets,
  setBackupPlanets,
  callback,
}: {
  backupPlanets: TStore["backupPlanets"];
  planets: TStore["planets"];
  setPlanets: TStore["setPlanets"];
  setBackupPlanets: TStore["setBackupPlanets"];
  callback: (
    planets: TStore["planets"] | TStore["backupPlanets"],
    setter: TStore["setBackupPlanets"] | TStore["setPlanets"]
  ) => void;
}) => {
  backupPlanets.length > 0
    ? callback(backupPlanets, setBackupPlanets)
    : callback(planets, setPlanets);
};
