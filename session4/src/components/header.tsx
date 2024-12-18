import Link from "next/link";
import NavLink from "./navLink";

const Header = () => {
  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">HomeNews</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink href="/news" label="News" />
          </li>
          <li>
            <NavLink href="/archive" label="Archive" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
