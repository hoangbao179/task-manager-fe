import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactNode, createContext, useState } from 'react';

type AppContext = {
    verifyAuthentication: any;
    isScreenMobile: boolean;
    accessToken: string;
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
    // const setCurrentUser = (user: CurrentUser): void => {
    //     const jsonUser = JSON.stringify(user);
    //     const encodeUser = encodeAES(jsonUser);

    //     localStorage.setItem(CURRENT_USER, encodeUser);
    //     setCurrentUserState(user);
    // };
    // useEffect(() => {
    //     const accessToken: any = localStorage?.getItem(TOKEN);
    //     const storedUser: any = localStorage?.getItem(CURRENT_USER);

    //     setAccessToken(accessToken);

    //     if (storedUser) {
    //         try {
    //             const currentUser = new CurrentUser(JSON.parse(storedUser));
    //             if (currentUser instanceof CurrentUser) {
    //                 setCurrentUserState(currentUser);
    //             }
    //         }
    //         catch (_) {
    //             const decodeUser = decodeAES(storedUser);
    //             setCurrentUserState(JSON.parse(decodeUser));
    //         }
    //     }  
    // }, []);
    return (
        <AppContext.Provider
            value={{
                verifyAuthentication,
                isScreenMobile,
                accessToken,
                setVerifyAuthentication,
                setAccessToken
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
