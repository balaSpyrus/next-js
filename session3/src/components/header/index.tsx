"use client";
import Link from "next/link";
import React, { FC } from "react";

import logoImg from "@/assets/logo.png";
import Image from "next/image";
import { MASTER_LIST } from "@/constants";
import { NavLinkType } from "@/types";
import classes from "./index.module.css";
import { usePathname } from "next/navigation";

interface NavProps {
  list: readonly NavLinkType[];
}

const NavList: FC<NavProps> = ({ list }) => {
  const path = usePathname();
  return (
    <nav className={classes.nav}>
      <ul>
        {list.map(({ route, name }) => (
          <li key={route}>
            <Link
              href={route}
              className={path.startsWith(route) ? classes.active : ""}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Header = () => {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} href="/">
        <Image
          src={logoImg.src}
          width={logoImg.width}
          height={logoImg.height}
          alt="a flood plate"
        />
        Food Store
      </Link>
      <NavList list={MASTER_LIST} />
    </header>
  );
};

export default Header;
