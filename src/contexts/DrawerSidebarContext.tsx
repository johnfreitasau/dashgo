import { UseDisclosureReturn, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface DrawerSidebarContextProps {
  children: ReactNode;
}

type DrawerSidebarContextData = UseDisclosureReturn;

const DrawerSidebarContext = createContext({} as DrawerSidebarContextData);

export function DrawerSidebarProvider({ children }: DrawerSidebarContextProps) {
  const disclosure = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <DrawerSidebarContext.Provider value={disclosure}>
      {children}
    </DrawerSidebarContext.Provider>
  );
}

export const useDrawerSidebar = () => useContext(DrawerSidebarContext);
