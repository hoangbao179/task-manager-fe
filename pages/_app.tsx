import React, { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';
import ThemeProviderWrapper from '../src/theme/ThemeProviderWrapper';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SidebarProvider } from '../src/contexts/SidebarContext';
import SidebarLayout from '../src/layouts/SidebarLayout';
import { NextPage } from 'next';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { NextRouter, useRouter } from 'next/router';
import createEmotionCache from '../src/utils/helper/createEmotionCache';
import { Head } from 'next/document';
import { AppProvider } from '../src/contexts/AppContext';

const clientSideEmotionCache = createEmotionCache();
type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

interface CustomAppProps extends AppProps {
    emotionCache?: EmotionCache;
    Component: NextPageWithLayout;
}
export const globalRouter = { router: null } as {
    router: null | NextRouter;
};

function MyApp(props: CustomAppProps): JSX.Element {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const router = useRouter();
    globalRouter.router = router;

    const getLayout = Component.getLayout ?? ((page): JSX.Element => page);

    return (
        <CacheProvider value={emotionCache}>
            <AppProvider>
                <SidebarProvider>
                    <ThemeProviderWrapper>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <SidebarLayout>
                                {getLayout(<Component {...pageProps} />)}
                            </SidebarLayout>
                        </LocalizationProvider>
                    </ThemeProviderWrapper>
                </SidebarProvider>
            </AppProvider>
        </CacheProvider>
    );
};

export default MyApp;
