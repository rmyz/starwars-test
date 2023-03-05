export const formatNumber = ({
  options,
  value,
}: {
  options?: { [key: string]: string };
  value: string | number;
}) => {
  return new Intl.NumberFormat("en-UK", options).format(Number(value));
};
