import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenTwoToneIcon from '@mui/icons-material/MenuOpenTwoTone';
import { Tooltip, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useContext, useState } from "react";
import { ButtonSignOut, Drawer, DrawerHeader, IconButtonWrapper, ListItemButtonWrapper, ListItemIconWrapper, MenuWrapper, UserInfo, UserProfileMenu } from './sidebar-menu.styles';
import { SidebarContext } from '../../../../contexts/SidebarContext';
import { CalendarMonth } from '@mui/icons-material';
import { AppContext } from '../../../../contexts/AppContext';
function SidebarMenu(): JSX.Element {
    const theme = useTheme();
    const router = useRouter();
    const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
    const [open, setOpen] = useState(sidebarToggle);
    const isCalendar = router.pathname.includes('dashboard');
    const {handleLogout, isScreenMobile} = useContext(AppContext);

    const handleDrawerOpen = (): void => {
        setOpen(true);
    };

    const handleDrawerClose = (): void => {
        setOpen(false);
    };

    const onMouseLeave = (): void => {
        if (!isScreenMobile) {
            setOpen(false);
        }
    };

    const redirectTo = (path: string): void => {
        if (isScreenMobile) {
            toggleSidebar();
        }
        router.push(path);
    };

    const onLogout = (): void => {
        handleLogout();
    };

    return (
        <MenuWrapper onMouseLeave={onMouseLeave}>
            <Box sx={{ display: 'flex' }} >
                <CssBaseline />
                <Drawer variant="permanent" open={open}>
                    {isScreenMobile && (
                        <Box>
                            <UserProfileMenu container spacing={1}>
                                <UserInfo item>
                                    <ButtonSignOut color="primary" onClick={onLogout}>
                                        <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                                        Sign out
                                    </ButtonSignOut>
                                </UserInfo>
                            </UserProfileMenu>
                            <Divider />
                        </Box>
                    )}

                    {!isScreenMobile && (
                        <List>
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                {open ? (
                                    <DrawerHeader>
                                        <IconButton onClick={handleDrawerClose}>
                                            {theme.direction === 'rtl' ? <MenuIcon /> : <MenuOpenTwoToneIcon />}
                                        </IconButton>
                                    </DrawerHeader>
                                ) : (
                                    <DrawerHeader>
                                        <IconButtonWrapper onClick={handleDrawerOpen}>
                                            {theme.direction === 'rtl' ? <MenuOpenTwoToneIcon /> : <MenuIcon />}
                                        </IconButtonWrapper>
                                    </DrawerHeader>
                                )}
                            </ListItem>
                        </List>
                    )}

                    <Divider />
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            {open && (
                                <ListItemText
                                    primary="Main"
                                    primaryTypographyProps={{
                                        fontWeight: 700,
                                        marginLeft: '20px'
                                    }}
                                    sx={{ opacity: open ? 1 : 0 }}
                                />
                            )}
                            <ListItemButtonWrapper
                                open={open}
                                className={isCalendar ? 'is-active' : ''}
                                onClick={(): void => redirectTo('/dashboard')}
                            >
                                <ListItemIconWrapper open={open}>
                                    <Tooltip title={'Calendar'} placement="top">
                                        <CalendarMonth />
                                    </Tooltip>
                                </ListItemIconWrapper>
                                <ListItemText
                                    primary="Calendar"
                                    primaryTypographyProps={{
                                        fontWeight: 700,
                                    }}
                                    sx={{ opacity: open ? 1 : 0 }}
                                />
                            </ListItemButtonWrapper>
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
        </MenuWrapper>
    );
}

export default SidebarMenu;
