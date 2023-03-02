import type { IconType } from "react-icons";

const DescriptionItem = ({
  title,
  value,
  Icon,
}: {
  title: string;
  value: string;
  Icon: IconType;
}) => {
  return (
    <div className="flex items-start">
      <Icon className="inline-block mt-1 mr-1 shrink-0" />
      <p className="inline-block">
        <b>{title}:</b> {value}
      </p>
    </div>
  );
};

export default DescriptionItem;
