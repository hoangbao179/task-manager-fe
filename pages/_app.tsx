import React from 'react';
import { AppProps } from 'next/app';
import ThemeProviderWrapper from '../src/theme/ThemeProviderWrapper';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProviderWrapper>
            <Component {...pageProps} />
        </ThemeProviderWrapper>
    );
};

export default MyApp;
