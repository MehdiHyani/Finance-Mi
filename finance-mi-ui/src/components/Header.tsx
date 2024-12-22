import {
  AppShell,
  Avatar,
  Burger,
  Group,
  Image,
  Menu,
  rem,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useAuthStore } from "../app/user.context";
import { TbSettings, TbLogout, TbUser, TbSun, TbMoon } from "react-icons/tb";

interface Props {
  navBarOpen: boolean;
  toggleNavBarOpen: () => void;
}

const Header = ({ navBarOpen, toggleNavBarOpen }: Props) => {
  const { user, setUser } = useAuthStore();
  const colorScheme = useMantineColorScheme();
  if (!user) return <></>;
  return (
    <AppShell.Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      px={10}
    >
      <Burger
        opened={navBarOpen}
        onClick={toggleNavBarOpen}
        hiddenFrom="sm"
        size="sm"
      />
      <Group p={10} gap={10}>
        <Image h={24} w={24} src="/android-chrome-512x512.png" />
        <Title size="24">Finance-Mi</Title>
      </Group>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Avatar
            name={`${user.firstName} ${user.lastName}`}
            color="initials"
            style={{ cursor: "pointer" }}
          />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<TbUser style={{ width: rem(14), height: rem(14) }} />}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            leftSection={
              <TbSettings style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Settings
          </Menu.Item>
          <Menu.Item
            leftSection={
              colorScheme.colorScheme === "dark" ? (
                <TbSun style={{ width: rem(14), height: rem(14) }} />
              ) : (
                <TbMoon style={{ width: rem(14), height: rem(14) }} />
              )
            }
            onClick={colorScheme.toggleColorScheme}
          >
            Switch Theme
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={
              <TbLogout style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => {
              setUser(null);
              localStorage.removeItem("accessToken");
            }}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </AppShell.Header>
  );
};

export default Header;
