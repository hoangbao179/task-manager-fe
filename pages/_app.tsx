import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import ThemeProviderWrapper from '../src/theme/ThemeProviderWrapper';
import CssBaseline from '@mui/material/CssBaseline';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>My Task Manager</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProviderWrapper>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProviderWrapper>
        </React.Fragment>
    );
}

export default MyApp;
