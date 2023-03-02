import type { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="mb-12 text-center text-black text-7xl font-starjedi">
      {children}
    </h1>
  );
};

export default Title;
