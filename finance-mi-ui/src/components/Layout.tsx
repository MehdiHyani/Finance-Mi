import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";

const Layout = () => {
  const [navBarOpen, { toggle: toggleNavBarOpen }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !navBarOpen },
      }}
      padding="md"
    >
      <Header navBarOpen={navBarOpen} toggleNavBarOpen={toggleNavBarOpen} />
      <Navbar />
      <Outlet />
    </AppShell>
  );
};

export default Layout;
