import { UseDisclosureReturn, useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext } from "react";

interface DrawerSidebarContextProps {
  children: ReactNode;
}

type DrawerSidebarContextData = UseDisclosureReturn;

const DrawerSidebarContext = createContext({} as DrawerSidebarContextData);

export function DrawerSidebarProvider({ children }: DrawerSidebarContextProps) {
  const disclosure = useDisclosure();

  return (
    <DrawerSidebarContext.Provider value={disclosure}>
      {children}
    </DrawerSidebarContext.Provider>
  );
}

export const useDrawerSidebar = () => useContext(DrawerSidebarContext);
