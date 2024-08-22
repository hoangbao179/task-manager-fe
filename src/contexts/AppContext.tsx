

import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

type AppContext = {
    verifyAuthentication: any;
    isScreenMobile: boolean;
    accessToken: string;
    setVerifyAuthentication: (value: boolean) => void;
    setAccessToken: (accessToken: string) => void;
    setIsInitInboxNotification: Dispatch<SetStateAction<boolean>>;
    setPageIndexInboxNotification: (data: number) => void;
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


    const [isOpenUploadFileProcess, setIsOpenUploadFileProcess] = useState<boolean>(false);

    const [verifyAuthentication, setVerifyAuthentication] = useState<boolean>(false);

    const [accessToken, setAccessToken] = useState<string>(null);

    const [isInitNotification, setIsInitNotification] = useState<boolean>(false);

    const [amountNotification, setAmountNotification] = useState<number>(0);
    const [pageIndexNotification, setPageIndexNotification] = useState<number>(0);


    const [moduleDetectedId, setModuleDeletedId] = useState<string>();
    const [isInitInboxNotification, setIsInitInboxNotification] = useState<boolean>(false);
    const [amountInboxNotification, setAmountInboxNotification] = useState<number>(0);
    const [pageIndexInboxNotification, setPageIndexInboxNotification] = useState<number>(0);

    const [moduleDeletedIds, setModuleDeletedIds] = useState<string[]>([]);

    const [isSentFile, setIsSentFile] = useState<boolean>();
    const [uploadingFiles, setUploadingFilesState] = useState<string[]>([]);

    // const setCurrentUser = (user: CurrentUser): void => {
    //     const jsonUser = JSON.stringify(user);
    //     const encodeUser = encodeAES(jsonUser);

    //     localStorage.setItem(CURRENT_USER, encodeUser);
    //     setCurrentUserState(user);
    // };

    const startUploadingFiles = (id: string): void=> {
        uploadingFiles.push(id);
        setUploadingFilesState([...uploadingFiles]);
    };

    const removeUploadingFiles = (id: string): void => {
        setUploadingFilesState(data => { 
            if (id) {
                data = data.filter(item => item !== id);
            }
            return [...data];
        });
    };

    useEffect(() => {
        const handleBeforeUnload = (e: any): any => {
            if (uploadingFiles && uploadingFiles.length > 0) {
                const confirmationMessage = 'You are currently Upload a file. Are you sure you want to leave?';
                e.returnValue = confirmationMessage; // Standard-compliant browsers (including Chrome/Firefox)
                return confirmationMessage; // Legacy browsers
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

    }, [uploadingFiles]);



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
                setAccessToken,
                setIsInitInboxNotification,
                setPageIndexInboxNotification
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
