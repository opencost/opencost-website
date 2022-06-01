import React, { useState, useEffect } from "react";
import NavbarItem from "@theme/NavbarItem";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import SearchBar from "@theme/SearchBar";
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
  useThemeConfig,
} from "@docusaurus/theme-common";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarLogo from "@theme/Navbar/Logo";
import NavbarSearch from "@theme/Navbar/Search";
import styles from "./styles.module.css";

import { AiFillStar } from "react-icons/ai";

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}

function NavbarItems({ items }) {
  let result = (
    <>
      {items.map((item, i) => (
        <NavbarItem {...item} key={i} />
      ))}
    </>
  );
  return result;
}

function NavbarContentLayout({ left, right }) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const autoAddSearchBar = !items.some(item => item.type === "search");

  const [stargazers, setStargazers] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/kubecost/cost-model")
      .then(res => res.json())
      .then(data => {
        setStargazers(data.stargazers_count);
      });
  }, []);

  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <>
          <NavbarItems items={rightItems} />

          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {autoAddSearchBar && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
          <a
            href="https://github.com/kubecost/cost-model"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:no-underline text-yellow-400 hover:text-green-600"
          >
            <span className="">
              {stargazers && (
                <>
                  <AiFillStar
                    size={20}
                    className="items-center flex-row align-middle mb-1 mr-1"
                  />
                  {stargazers}
                </>
              )}
            </span>
          </a>
        </>
      }
    />
  );
}
