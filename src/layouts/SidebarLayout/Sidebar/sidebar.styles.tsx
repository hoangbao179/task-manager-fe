import { Box, Drawer, styled } from "@mui/material";

export const SidebarWrapper = styled(Box)<{isShowOnMobile: boolean}>(
    ({ theme, isShowOnMobile }) => `
        width: auto;
        display: ${isShowOnMobile ? 'none' : 'inline-block'};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        height: 100%;
        padding-bottom: 68px;
        margin-top: ${theme.header.height};

        ${theme.breakpoints.down('md')} {
            display: ${isShowOnMobile ? 'inline-block' : 'none'};
            width: 240px;
            margin-top: 0px;
        }
`
);

export const CustomDrawer = styled(Drawer)(
    ({ theme }) => `
        display:none;

        .MuiDrawer-paper {
            width: 240px;
        }

        ${theme.breakpoints.down('md')} {
            display:block;
        }
`
);

