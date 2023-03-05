import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@chakra-ui/react";
import {
  FiCircle,
  FiSun,
  FiUsers,
  FiMap,
  FiHome,
  FiHash,
} from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import type { TPlanet } from "../../types";
import FormLabel from "../FormLabel/FormLabel";
import { add } from "../../useCases/planet/add";
import useAppStore from "../../hooks/useAppStore";
import { STATUS } from "../../pages";
import { modifyPlanets } from "../../utils/modifyPlanets";
import { getPlanetImg } from "../../utils/getPlanetImg";

export type TCreateFormValues = Omit<TPlanet, "id">;

const CreateForm = ({ onCancel }: { onCancel: () => void }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TCreateFormValues>();
  const {
    planets,
    setPlanets,
    setBackupPlanets,
    setIsOpenPlanetModal,
    setStatus,
    backupPlanets,
  } = useAppStore();

  const handleOnSubmit: SubmitHandler<TCreateFormValues> = (values) => {
    const valuesWithId = { ...values, img: getPlanetImg(), id: uuidv4() };

    modifyPlanets({
      backupPlanets,
      planets,
      setPlanets,
      setBackupPlanets,
      callback: (planetsToModify, setter) => {
        const newPlanets = add({
          newPlanet: valuesWithId,
          planets: planetsToModify,
        });
        setter(newPlanets);
      },
    });

    setIsOpenPlanetModal(false);
    setStatus(STATUS.idle);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <FormLabel label="Name" Icon={FiHash} id="nameInput" />
      <Input
        id="nameInput"
        className="mb-4"
        {...register("name", { required: true })}
      />

      <FormLabel label="Diameter" Icon={FiCircle} id="diameterInput" />
      <Input
        id="diameterInput"
        className="mb-4"
        {...register("diameter", { required: true })}
      />

      <FormLabel label="Climates" Icon={FiSun} id="climatesInput" />
      <Input
        id="climatesInput"
        className="mb-4"
        isInvalid={Boolean(errors?.climates)}
        {...register("climates", { required: true })}
      />

      <FormLabel label="Terrains" Icon={FiMap} id="terrainsInput" />
      <Input
        id="terrainsInput"
        isInvalid={Boolean(errors?.terrains)}
        className="mb-4"
        {...register("terrains", { required: true })}
      />

      <FormLabel label="Population" Icon={FiUsers} id="populationInput" />
      <Input
        id="populationInput"
        className="mb-4"
        isInvalid={Boolean(errors?.population)}
        {...register("population", { required: true })}
      />

      <FormLabel label="Residents" Icon={FiHome} id="residentsInput" />
      <Textarea
        id="residentsInput"
        isInvalid={Boolean(errors?.residents)}
        {...register("residents", { required: true })}
      />
      <div className="flex justify-between gap-3 mt-6 mb-2">
        <Button type="submit" colorScheme="green" flexGrow={1}>
          Save
        </Button>
        <Button role="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;
