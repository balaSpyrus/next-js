"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const path = usePathname();
  return (
    <Link href={href} className={path.startsWith(href) ? "active" : ""}>
      {label}
    </Link>
  );
};

export default NavLink;
