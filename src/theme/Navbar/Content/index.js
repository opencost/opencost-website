import React from "react";
import NavbarItem from "@theme/NavbarItem";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
  useThemeConfig,
} from "@docusaurus/theme-common";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarLogo from "@theme/Navbar/Logo";
import styles from "./styles.module.css";
import GitHubButton from "react-github-btn";

function useNavbarItems() {
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

  // using left items from docusaurus.config.js but adding our own right items
  const [leftItems, rightItems] = splitNavbarItems(items);

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <span className="mb-1.5">
            <NavbarLogo />
          </span>
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        <>

          <span className="mt-1">
            <GitHubButton
              href="https://github.com/opencost/opencost"
              data-color-scheme="no-preference: light_high_contrast; light: light; dark: light;"
              data-size="large"
              data-show-count="true"
              aria-label="Star opencost/opencost on GitHub"
            >
              GitHub
            </GitHubButton>
          </span>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
        </>
      }
    />
  );
}
