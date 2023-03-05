import type { ReactNode } from "react";
import Image from "next/image";
import Title from "../../components/Title/Title";
import Link from "next/link";
import NavItem from "../../components/NavItem/NavItem";
import Head from "next/head";

const MainLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <>
      <Head>
        <title>Star Wars Planets</title>
      </Head>
      <nav className="flex items-center justify-between px-4 py-2 bg-[#384093]">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Star Wars logo"
            width="100"
            height="100"
            className="w-[75px] lg:w-auto"
          />
        </Link>
        <div className="flex gap-4 text-sm lg:text-base lg:gap-8">
          <NavItem>Home</NavItem>
          <NavItem isActive>Planets</NavItem>
          <NavItem>Characters</NavItem>
          <NavItem>About</NavItem>
        </div>
      </nav>
      <div className="mt-12 lg:p-16 lg:px-32">
        <Title>{title}</Title>
        {children}
      </div>
    </>
  );
};

export default MainLayout;
