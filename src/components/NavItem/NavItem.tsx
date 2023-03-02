import Link from "next/link";
import type { ReactNode } from "react";

const NavItem = ({
  children,
  route = "/",
  isActive = false,
}: {
  children: ReactNode;
  route?: string;
  isActive?: boolean;
}) => {
  return (
    <Link href={route}>
      <p className={`${isActive ? `text-yellow-400 font-bold` : ``}`}>
        {children}
      </p>
    </Link>
  );
};

export default NavItem;
