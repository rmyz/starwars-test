import { Input, InputGroup, InputLeftElement, Select } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";
import useAppStore from "../../hooks/useAppStore";
import { search } from "../../useCases/planet/search";
import { SORTER_CONFIG, TSearch } from "./config";

const Search = () => {
  const {
    setSearchCriteria,
    setSearch,
    searchCriteria,
    planets,
    backupPlanets,
    setPlanets,
    setBackupPlanets,
    setCurrentPage,
  } = useAppStore();

  const handleOnChangeCriteria = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchCriteria(event.target.value as TSearch);
  };

  const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (event.target.value) {
      backupPlanets.length === 0 && setBackupPlanets(planets);
      setSearch(event.target.value);

      const searchedPlanets = search({
        value,
        criteria: searchCriteria,
        planets,
      });

      setPlanets(searchedPlanets);
      setCurrentPage(0);
    } else {
      setPlanets(backupPlanets);
      setBackupPlanets([]);
    }
  };

  return (
    <div className="flex gap-4 lg:mr-auto grow">
      <div className="flex flex-col gap-2">
        <label htmlFor="searchBySelect">Search by</label>
        <Select
          id="searchBySelect"
          bg="#985EFF"
          variant="filled"
          onChange={handleOnChangeCriteria}
        >
          {SORTER_CONFIG.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-2 grow">
        <label htmlFor="searchInput">Search</label>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FiSearch />
          </InputLeftElement>
          <Input
            id="searchInput"
            bg="#6200EE"
            variant="filled"
            onChange={handleOnChangeSearch}
          />
        </InputGroup>
      </div>
    </div>
  );
};

export default Search;
