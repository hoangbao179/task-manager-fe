import React from 'react';
import { AppProps } from 'next/app';
import ThemeProviderWrapper from '../src/theme/ThemeProviderWrapper';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProviderWrapper>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Component {...pageProps} />
            </LocalizationProvider>
        </ThemeProviderWrapper>
    );
};

export default MyApp;
