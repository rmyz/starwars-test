import { Select } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import useAppStore from "../../hooks/useAppStore";
import { sort } from "../../useCases/planet/sort";
import { SORTER_CONFIG, TSort } from "./config";

const Sorter = () => {
  const { setSorter, planets, setPlanets } = useAppStore();

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value as TSort;
    setSorter(newSort);

    const newPlanets = sort({ sorter: newSort, planets });

    setPlanets(newPlanets);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="sorter">Sort by</label>
      <Select
        id="sorter"
        variant="filled"
        bg="#6200EE"
        onChange={handleOnChange}
      >
        {SORTER_CONFIG.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default Sorter;
