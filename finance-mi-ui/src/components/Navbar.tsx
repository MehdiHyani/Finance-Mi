import { AppShell, NavLink, Stack } from "@mantine/core";
import React, { useMemo } from "react";
import { TbGauge, TbZoomMoney, TbSettings } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

const links = [
  {
    icon: TbGauge,
    label: "Dashboard",
    description: "View my spending trends",
    href: "/dashboard",
  },
  {
    icon: TbZoomMoney,
    label: "My Transactions",
    description: "View my transactions",
    href: "/transactions",
  },
  {
    icon: TbSettings,
    label: "Settings",
    description: "Manage my settings",
    href: "/settings",
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const commonAttributes = useMemo(
    () => ({
      style: { borderRadius: ".5rem" } as React.CSSProperties,
    }),
    []
  );

  return (
    <AppShell.Navbar style={{ justifyContent: "space-between" }} p="md">
      <Stack>
        {links.slice(0, links.length - 1).map((item, index) => (
          <NavLink
            href={item.href}
            key={`nav-link-${index + 1}`}
            active={pathname === item.href}
            label={item.label}
            description={item.description}
            leftSection={<item.icon size="1.5rem" />}
            onClick={() => navigate(item.href)}
            {...commonAttributes}
          />
        ))}
      </Stack>
      {links.slice(-1).map((item, index) => (
        <NavLink
          href={item.href}
          key={`nav-link-${index + 1}`}
          active={pathname === item.href}
          label={item.label}
          description={item.description}
          leftSection={<item.icon size="1.5rem" />}
          onClick={() => navigate(item.href)}
          disabled
          {...commonAttributes}
        />
      ))}
    </AppShell.Navbar>
  );
};

export default Navbar;
