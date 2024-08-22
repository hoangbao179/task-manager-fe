import { useState, ReactNode, createContext } from 'react';
type SidebarContext = {
  sidebarToggle: any;
  expandSidebar: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  toggleExpandSidebar: (value?: boolean) => void;
};

export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

type Props = {
  children: ReactNode;
};

export function SidebarProvider({ children }: Props): JSX.Element {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [expandSidebar, setExpandSidebar] = useState(false);

    const toggleSidebar = (): void => {
        setSidebarToggle(!sidebarToggle);
    };

    const closeSidebar = (): void => {
        setSidebarToggle(false);
    };

    const toggleExpandSidebar = (value?: boolean): void => {
        if (value === undefined || value === null) {
            setExpandSidebar(!sidebarToggle);
        }
        else {
            setExpandSidebar(value);
        }
    };

    return (
        <SidebarContext.Provider
            value={{ sidebarToggle, expandSidebar, toggleSidebar, closeSidebar, toggleExpandSidebar }}
        >
            {children}
        </SidebarContext.Provider>
    );
}
