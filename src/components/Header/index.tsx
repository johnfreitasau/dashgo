import { Flex, useBreakpointValue, IconButton, Icon } from "@chakra-ui/react";
import { Profile } from "./Profile";
import { NotificationsNav } from "./NotificationsNav";
import { Logo } from "./Logo";
import { SearchBox } from "./SearchBox";
import { useDrawerSidebar } from "../../contexts/DrawerSidebarContext";
import { RiMenuLine } from "react-icons/ri";

export function Header() {
  const { onOpen } = useDrawerSidebar();

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          fontSize={24}
          variant="unstyled"
          onClick={onOpen}
          aria-label="Open Navigation"
          mr="2"
        />
      )}

      <Logo />
      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
