import { IconType } from "react-icons/lib";

const FormLabel = ({
  Icon,
  label,
  id,
}: {
  Icon: IconType;
  label: string;
  id: string;
}) => {
  return (
    <>
      <label htmlFor={id} className="flex items-center gap-1 font-bold">
        <Icon className="inline-block" />
        {label}
      </label>
    </>
  );
};

export default FormLabel;
