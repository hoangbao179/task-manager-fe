
import { Divider, useMediaQuery, useTheme } from '@mui/material';

import SidebarMenu from './SidebarMenu';
import { useContext, useLayoutEffect } from 'react';
import ExpandMenu from './ExpandMenu';
import { CustomDrawer, SidebarWrapper } from './sidebar.styles';
import { SidebarContext } from '../../../contexts/SidebarContext';
import Scrollbar from '../../../components/Scrollbar';

function Sidebar(): JSX.Element {
    const theme = useTheme();
    const { sidebarToggle, closeSidebar } = useContext(SidebarContext);
    const isScreenMobile = useMediaQuery(theme.breakpoints.down('md'));

    useLayoutEffect(() => {
        window.addEventListener('resize', updateToggleSidebar);
        return () => window.removeEventListener('resize', updateToggleSidebar);
    }, []);

    const updateToggleSidebar = (): void => {
        if (!isScreenMobile) {
            closeSidebar();
        }
    };

    return (
        <>
            <SidebarWrapper
                isShowOnMobile={false}
                sx={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    zIndex: 6,
                    background: '#FFFFFF',
                    boxShadow:
                        theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
                }}
            >
                <SidebarMenu/>
                <ExpandMenu/>
            </SidebarWrapper>

            <CustomDrawer
                sx={{
                    boxShadow: `${theme.sidebar.boxShadow}`
                }}
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={sidebarToggle}
                onClose={closeSidebar}
                variant="temporary"
                elevation={9}
            >
                <SidebarWrapper isShowOnMobile={true}>
                    <Scrollbar>
                        <Divider
                            sx={{
                                mx: theme.spacing(2),
                                background: theme.colors.alpha.trueWhite[10]
                            }}
                        />
                        <SidebarMenu />
                    </Scrollbar>
                </SidebarWrapper>
            </CustomDrawer>


        </>
    );
}

export default Sidebar;
