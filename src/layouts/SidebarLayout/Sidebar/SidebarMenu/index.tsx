
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import GroupIcon from '@mui/icons-material/Group';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenTwoToneIcon from '@mui/icons-material/MenuOpenTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import WebhookIcon from '@mui/icons-material/Webhook';
import { Avatar, Hidden, Tooltip, useMediaQuery } from '@mui/material';
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
import { AvatarUser, ButtonSignOut, Drawer, DrawerHeader, GroupIcons, IconButtonWrapper, ListItemButtonWrapper, ListItemIconWrapper, MenuWrapper, UserBoxLabel, UserBoxText, UserInfo, UserProfileMenu } from './sidebar-menu.styles';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import SchoolIcon from '@mui/icons-material/School';
import { SidebarContext } from '../../../../contexts/SidebarContext';
import { AppContext } from '../../../../contexts/AppContext';

function SidebarMenu(): JSX.Element {
    const theme = useTheme();
    const router = useRouter();
    const isScreenMobile = useMediaQuery(theme.breakpoints.down('md'));
    // const { handleLogout } = useCommonAuth();

    const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
    // const { currentUser } = useContext(AppContext);

    const [open, setOpen] = useState(sidebarToggle);

    const isAdminPageUser = router.pathname.includes('management/users');
    const isAdminPageOrganizations = router.pathname.includes('management/organizations');
    const isAdminPageCommunities = router.pathname.includes('management/communities');
    const isDashboardGoalPage = router.pathname.includes('dashboard/');
    const isLibrary = router.pathname.includes('management/library');
    const isCommunity = router.pathname.includes('community') && !router.pathname.includes('library/community');
    const isCalendar = router.pathname.includes('calendar');
    const isAdminPageSetting = router.pathname.includes('management/settings');
    const isAcademyPageSetting = router.pathname.includes('management/academy');
    const isCoursePage = router.pathname.includes('course');

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
        // handleLogout(LOGOUT_ROUTER);
    };

    // const getLinkAvatar = (currentUser?: CurrentUser): string => {
    //     if (!currentUser) {
    //         return '';
    //     }
    //     return getFinalLinkResource(currentUser.avatar?.folderLocation, currentUser.avatar?.id);
    // };

    return (
        <MenuWrapper onMouseLeave={onMouseLeave}>
            <Box sx={{ display: 'flex' }} >
                <CssBaseline />
                <Drawer variant="permanent" open={open}>
                    <Hidden mdUp>
                        <UserProfileMenu container spacing={1}>
{/* 
                            <AvatarUser item>
                                <Avatar
                                    variant="rounded"
                                    alt={getLinkAvatar(currentUser)}
                                    src={getLinkAvatar(currentUser)} />
                            </AvatarUser> */}
                            <UserInfo item>
                                {/* <UserBoxText>

                                    <UserBoxLabel variant="body1">{currentUser?.name}</UserBoxLabel>
                                </UserBoxText> */}
                                <ButtonSignOut color="primary" onClick={onLogout}>
                                    <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                                    Sign out
                                </ButtonSignOut>
                            </UserInfo>
                        </UserProfileMenu>
                        <Divider />
                    </Hidden>


                    <Hidden mdDown>
                        <List>
                            <ListItem
                                disablePadding
                                sx={{ display: 'block' }}
                            >
                                {
                                    open ?
                                        (
                                            <DrawerHeader>
                                                <IconButton onClick={handleDrawerClose}>
                                                    {
                                                        theme.direction === 'rtl' ?
                                                            (
                                                                <MenuIcon />
                                                            ) :
                                                            (
                                                                <MenuOpenTwoToneIcon />
                                                            )
                                                    }
                                                </IconButton>
                                            </DrawerHeader>
                                        ) :
                                        (
                                            <DrawerHeader>
                                                <IconButtonWrapper onClick={handleDrawerOpen}>
                                                    {
                                                        theme.direction === 'rtl' ?
                                                            (
                                                                <MenuOpenTwoToneIcon />
                                                            )
                                                            :
                                                            (
                                                                <MenuIcon />
                                                            )
                                                    }
                                                </IconButtonWrapper>
                                            </DrawerHeader>
                                        )
                                }
                            </ListItem>
                        </List>
                    </Hidden>

                    <Divider />

                    {/* {
                        isExistRoles([...rolesUsers, E_ROLES.Admin], currentUser?.roleNames) && (
                            <List>
                                <ListItem
                                    disablePadding
                                    sx={{ display: 'block' }}
                                >
                                    {
                                        open ?
                                            <ListItemText
                                                primary="Main"
                                                primaryTypographyProps={{
                                                    fontWeight: 700,
                                                    marginLeft: '20px'
                                                }}
                                                sx={{ opacity: open ? 1 : 0 }}
                                            />
                                            : <></>
                                    }

                                    <ListItemButtonWrapper
                                        open={open}
                                        className={isDashboardGoalPage ? 'is-active' : ''}
                                        onClick={(): void => redirectTo('/dashboard/goals')}
                                    >
                                        <ListItemIconWrapper open={open}>
                                            <Tooltip title={'PPF'} placement="top">
                                                <WebhookIcon />
                                            </Tooltip>
                                        </ListItemIconWrapper>
                                        <ListItemText
                                            primary="PPF"
                                            primaryTypographyProps={{
                                                fontWeight: 700,
                                            }}
                                            sx={{ opacity: open ? 1 : 0 }}
                                        />
                                    </ListItemButtonWrapper>

                                    <ListItemButtonWrapper
                                        open={open}
                                        className={isCommunity ? 'is-active' : ''}
                                        onClick={(): void => redirectTo('/community')}
                                    >
                                        <ListItemIconWrapper open={open}>
                                            <Tooltip title={'Communities'} placement="top">
                                                <ConnectWithoutContactIcon />
                                            </Tooltip>
                                        </ListItemIconWrapper>

                                        <ListItemText
                                            primary="Communities"
                                            primaryTypographyProps={{
                                                fontWeight: 700,
                                            }}
                                            sx={{ opacity: open ? 1 : 0 }}
                                        />
                                    </ListItemButtonWrapper>

                                    <ListItemButtonWrapper
                                        open={open}
                                        className={isCalendar ? 'is-active' : ''}
                                        onClick={(): void => redirectTo('/calendar')}
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

                                    <ListItemButtonWrapper
                                        open={open}
                                        className={isLibrary ? 'is-active' : ''}
                                        onClick={(): void => redirectTo('/management/library/price-lists')}
                                    >
                                        <ListItemIconWrapper open={open}>
                                            <Tooltip title={'Library'} placement="top">
                                                <QuickLinkIcon>
                                                    <FolderOpenIcon style={{ height: '25px', width: "25px" }} />
                                                </QuickLinkIcon>
                                            </Tooltip>
                                        </ListItemIconWrapper>

                                        <ListItemText
                                            primary="Library"
                                            primaryTypographyProps={{
                                                fontWeight: 700,
                                            }}
                                            sx={{ opacity: open ? 1 : 0 }}
                                        />
                                    </ListItemButtonWrapper>

                                    <ListItemButtonWrapper
                                        open={open}
                                        className={isCoursePage ? 'is-active' : ''}
                                        onClick={(): void => redirectTo('/course')}
                                    >
                                        <ListItemIconWrapper open={open}>
                                            <Tooltip title={'Audigy Academy'} placement="top">
                                                <SchoolIcon />
                                            </Tooltip>
                                        </ListItemIconWrapper>
                                        <ListItemText
                                            primary="Audigy Academy"
                                            primaryTypographyProps={{
                                                fontWeight: 700,
                                            }}
                                            sx={{ opacity: open ? 1 : 0, paddingLeft: '5px' }}
                                        />
                                    </ListItemButtonWrapper>
                                </ListItem>
                            </List>
                        )
                    } */}
{/* 
                    {
                        isExistRoles([E_ROLES.Admin, E_ROLES.DashboardAdmin, E_ROLES.LMSAdmin], currentUser?.roleNames) && (
                            <>
                                <Divider />
                                <List>
                                    {
                                        open ?
                                            <ListItemText
                                                primary="Administration"
                                                primaryTypographyProps={{
                                                    fontWeight: 700,
                                                    marginLeft: '20px'
                                                }}
                                                sx={{ opacity: open ? 1 : 0 }}
                                            />
                                            : <></>
                                    }

                                    <ListItem
                                        disablePadding
                                        sx={{ display: 'block' }}
                                    >
                                        {
                                            isExistRoles([E_ROLES.Admin], currentUser?.roleNames) && <>
                                                <ListItemButtonWrapper
                                                    open={open}
                                                    className={isAdminPageUser ? 'is-active' : ''}
                                                    onClick={(): void => redirectTo('/management/users')}
                                                >
                                                    <ListItemIconWrapper open={open}>
                                                        <Tooltip title={'Users'} placement="top">
                                                            <PersonIcon />
                                                        </Tooltip>
                                                    </ListItemIconWrapper>

                                                    <ListItemText
                                                        primary="Users"
                                                        primaryTypographyProps={{
                                                            fontWeight: 700,
                                                        }}
                                                        sx={{ opacity: open ? 1 : 0 }}
                                                    />
                                                </ListItemButtonWrapper>

                                                <ListItemButtonWrapper
                                                    open={open}
                                                    className={isAdminPageOrganizations ? 'is-active' : ''}
                                                    onClick={(): void => redirectTo('/management/organizations')}
                                                >
                                                    <ListItemIconWrapper open={open}>
                                                        <Tooltip title={'Organizations'} placement="top">
                                                            <CorporateFareIcon />
                                                        </Tooltip>
                                                    </ListItemIconWrapper>

                                                    <ListItemText
                                                        primary="Organizations"
                                                        primaryTypographyProps={{
                                                            fontWeight: 700,
                                                        }}
                                                        sx={{ opacity: open ? 1 : 0 }}
                                                    />
                                                </ListItemButtonWrapper>

                                                <ListItemButtonWrapper
                                                    open={open}
                                                    className={isAdminPageCommunities ? 'is-active' : ''}
                                                    onClick={(): void => redirectTo('/management/communities')}
                                                >
                                                    <ListItemIconWrapper open={open}>
                                                        <Tooltip title={'Community Groups'} placement="top">
                                                            <GroupIcon></GroupIcon>
                                                        </Tooltip>
                                                    </ListItemIconWrapper>

                                                    <ListItemText
                                                        primary="Community Groups"
                                                        primaryTypographyProps={{
                                                            fontWeight: 700,
                                                        }}
                                                        sx={{ opacity: open ? 1 : 0 }}
                                                    />
                                                </ListItemButtonWrapper>
                                            </>
                                        }
                                        {
                                            isExistRoles([E_ROLES.Admin, E_ROLES.LMSAdmin], currentUser?.roleNames) && <>
                                                <ListItemButtonWrapper
                                                    open={open}
                                                    className={isAcademyPageSetting ? 'is-active' : ''}
                                                    onClick={(): void => redirectTo('/management/academy')}
                                                >
                                                    <ListItemIconWrapper open={open}>
                                                        <Tooltip title={'LMS Administration'} placement="top">
                                                            <GroupIcons>
                                                                <SchoolIcon className='main' />
                                                                <BuildIcon className='sub' />
                                                            </GroupIcons>
                                                        </Tooltip>
                                                    </ListItemIconWrapper>
                                                    <ListItemText
                                                        primary="LMS Administration"
                                                        primaryTypographyProps={{
                                                            fontWeight: 700,
                                                        }}
                                                        sx={{ opacity: open ? 1 : 0, paddingLeft: '5px' }}
                                                    />
                                                </ListItemButtonWrapper>
                                            </>
                                        }

                                        {
                                            isExistRoles([E_ROLES.Admin, E_ROLES.DashboardAdmin], currentUser?.roleNames) && <>
                                                <ListItemButtonWrapper
                                                    open={open}
                                                    className={isAdminPageSetting ? 'is-active' : ''}
                                                    onClick={(): void => redirectTo('/management/settings')}
                                                >
                                                    <ListItemIconWrapper open={open}>
                                                        <Tooltip title={'Dashboard Content'} placement="top">
                                                            <GroupIcons>
                                                                <HomeIcon className='main' />
                                                                <BuildIcon className='sub' />
                                                            </GroupIcons>
                                                        </Tooltip>
                                                    </ListItemIconWrapper>
                                                    <ListItemText
                                                        primary="Dashboard Content"
                                                        primaryTypographyProps={{
                                                            fontWeight: 700,
                                                        }}
                                                        sx={{ opacity: open ? 1 : 0, paddingLeft: '5px' }}
                                                    />
                                                </ListItemButtonWrapper>
                                            </>
                                        } */}
{/* 
                                    </ListItem>
                                </List>
                            </>
                        )
                    } */}
                </Drawer>
            </Box>
        </MenuWrapper>
    );
}

export default SidebarMenu;
