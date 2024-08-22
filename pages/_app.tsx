import React from 'react';
import { AppProps } from 'next/app';
import ThemeProviderWrapper from '../src/theme/ThemeProviderWrapper';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import { SidebarProvider } from '../src/contexts/SidebarContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <SidebarProvider>
            <ThemeProviderWrapper>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Component {...pageProps} />
                </LocalizationProvider>
            </ThemeProviderWrapper>
        </SidebarProvider>
    );
};

export default MyApp;
