import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { UserDetail } from '../models/User/UserDetail';
import { CURRENT_USER, TOKEN } from '../constants/common';

type AppContext = {
    isScreenMobile: boolean;
    accessToken: string;
    currentUser: UserDetail;
    setCurrentUser: Dispatch<SetStateAction<UserDetail>>;
    setAccessToken: (accessToken: string) => void;
    handleLogout: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AppContext = createContext<AppContext>(
    {} as AppContext
);

type Props = {
    children: ReactNode;
};

export function AppProvider({ children }: Props): JSX.Element {
    const theme = useTheme();
    const isScreenMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [accessToken, setAccessToken] = useState<string>(null);
    const [currentUser, setCurrentUser] = useState<UserDetail>(null);

    useEffect(() => {
        const accessToken: any = localStorage?.getItem(TOKEN);
        const storedUser: any = localStorage?.getItem(CURRENT_USER);

        setAccessToken(accessToken);

        if (storedUser) {
            try {
                const currentUser = new UserDetail(JSON.parse(storedUser));
                if (currentUser instanceof UserDetail) {
                    setCurrentUser(currentUser);
                }
            }
            catch (_) {
            }
        }  
    }, []);

    const handleLogout = () => {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(CURRENT_USER);
        setCurrentUser(null);
    }

    return (
        <AppContext.Provider
            value={{
                isScreenMobile,
                accessToken,
                currentUser,
                handleLogout,
                setCurrentUser,
                setAccessToken
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
