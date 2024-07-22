import { createTheme } from '@mui/material/styles';

export const themeCreator = (themeName: string) => {
    return createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#dc004e',
            },
        },
        typography: {
            fontFamily: 'Roboto, sans-serif',
        },
    });
};
