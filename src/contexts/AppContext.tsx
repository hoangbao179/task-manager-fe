import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { UserDetail } from '../models/User/UserDetail';
import { CURRENT_USER, TOKEN } from '../constants/common';

type AppContext = {
    verifyAuthentication: any;
    isScreenMobile: boolean;
    accessToken: string;
    currentUser: UserDetail;
    setVerifyAuthentication: (value: boolean) => void;
    setAccessToken: (accessToken: string) => void;
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
    const [verifyAuthentication, setVerifyAuthentication] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string>(null);
    const [currentUser, setCurrentUser] = useState<UserDetail>(null);
    // const setCurrentUser = (user: CurrentUser): void => {
    //     const jsonUser = JSON.stringify(user);
    //     const encodeUser = encodeAES(jsonUser);

    //     localStorage.setItem(CURRENT_USER, encodeUser);
    //     setCurrentUserState(user);
    // };
    
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
                console.log('currentUser',currentUser);
            }
            catch (_) {
            }
        }  
    }, []);
    return (
        <AppContext.Provider
            value={{
                verifyAuthentication,
                isScreenMobile,
                accessToken,
                currentUser,
                setVerifyAuthentication,
                setAccessToken
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
