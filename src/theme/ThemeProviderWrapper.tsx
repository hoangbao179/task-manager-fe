import { FC, useState, createContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base.ts';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import React from 'react';
export const ThemeContext = createContext((_themeName: string): void => {});

const cache = createCache({ key: 'css', prepend: true });

type ThemeProviderWrapperProps = {
    children: React.ReactNode;
};

const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = (props) => {
    const [themeName, _setThemeName] = useState('PureLightTheme');

    useEffect(() => {
        const curThemeName = window.localStorage.getItem('appTheme') || 'PureLightTheme';
        _setThemeName(curThemeName);
    }, []);

    const theme = themeCreator(themeName);
    const setThemeName = (themeName: string): void => {
        window.localStorage.setItem('appTheme', themeName);
        _setThemeName(themeName);
    };

    return (
        <CacheProvider value={cache}>
            <ThemeContext.Provider value={setThemeName}>
                <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
            </ThemeContext.Provider>
        </CacheProvider>
    );
};

export default ThemeProviderWrapper;
