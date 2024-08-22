import { Box, Button, CSSObject, Grid, IconButton, ListItemButton, ListItemIcon, Theme, Typography, styled } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';

export const MenuWrapper = styled(Box)(
    ({ theme }) => `
    width: ${theme.sidebar.width};
    height: 100%;
    margin: 1px;

    .MuiList-root {
        padding: ${theme.spacing(1)};

        & > .MuiList-root {
            padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
        }
    }

    .MuiListSubheader-root {
        text-transform: uppercase;
        font-weight: bold;
        font-size: ${theme.typography.pxToRem(12)};
        color: ${theme.colors.alpha.trueWhite[50]};
        padding: ${theme.spacing(0, 2.5)};
        line-height: 1.4;
    }

    .is-active {
        background-color: #dddddd;
    }

`
);

export const IconButtonWrapper = styled(IconButton)(
    () => `
        margin: 0 auto;
    `
);


const drawerWidth = 240;
export const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
});

export const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    }
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    minHeight: '50px',
}));

export const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
    }),

    '&.MuiDrawer-root .MuiDrawer-paper': { 
        marginTop: '80px', 
        marginLeft: '0px',
        height: 'calc(100% - 80px)',

        [theme.breakpoints.down('md')]: {
            marginTop: '0px', 
            paddingTop: '0px',
        }
    }
}));


export const UserProfileMenu = styled(Grid)(
    ({ }) => `
        padding: 15px 10px;
        flex-wrap: nowrap;
    `
);

export const AvatarUser = styled(Grid)(
    ({ }) => `
        flex-basis: 50px;
    `
);

export const UserInfo = styled(Grid)(
    ({ }) => `
        flex-basis: calc(100% - 50px);
        white-space: initial;
    `
);

export const ButtonSignOut = styled(Button)(
    ({ }) => `
        padding: 0px;
        height: auto;
        font-size: 10px;
        
        svg {
            width: 14px;
            margin-right: 2px;
        }
        
        &:hover {
            background-color: rgba(85, 105, 255, 0);
        }
    `
);

export const UserBoxText = styled(Box)(
    ({ }) => `
        padding-left: 2px;
        text-align: left;
`
);

export const UserBoxLabel = styled(Typography)(
    ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;

    `
);

export const ListItemButtonWrapper = styled(ListItemButton)<{open: boolean}>(
    ({ open }) => `
        min-height: 48px;
        justify-content:  ${open ? 'initial' : 'center'};  
        padding-left: 20px;
        margin-top: 10px;
        align-items: center;
    `
);

export const ListItemIconWrapper = styled(ListItemIcon)<{open: boolean}>(
    ({ open }) => `
        min-width: 0px;
        margin-right: ${open ? '3px' : 'auto'};
        justify-content: 'center';  
    `
);

export const GroupIcons = styled(Box)(
    ({ }) => `
        position: relative;
        display: flex;
        align-items: center;

        .sub {
            position: absolute;
            font-size: 17px;
            top: -3px;
            right: -6px;
            z-index: 1;
            padding: 2px;
            background-color: #223354;
            border-radius: 50%;
            color: white;
        }
    `
);
export const QuickLinkIcon = styled(Box)(
    ({ }) => `
        display: inline-flex;
        justify-content: center;
        text-align: center;
        font-weight: bold;

        svg {
            font-size: 30px;
        }

        img {
            object-fit: contain !important;
        }
    `
);
