import { Box, Grid, IconButton, styled } from "@mui/material";

export const LAYOUT_CONFIG = {
    WIDTH_LEFT_PANEL: {
        VALUE: '300',
        TYPE: 'px'
    },
};

export const LayoutLibraryWrapper = styled(Box)(
    ({ theme }) => `
        position: relative;
        margin: 0px -27px;
        
        ${theme.breakpoints.down('md')} {
            margin: 0px -15px;
        }
    `
);

export const LayoutLibraryGrid = styled(Grid)(
    ({ theme }) => `
        flex-wrap: nowrap;
        padding: 0px ${theme.spacing(3)};
        overflow: auto;
        height: calc(100vh - ${theme.header.height});

        ${theme.breakpoints.down('md')} {
            padding: 0px 15px;
        }
    `
);

export const IconSideBar = styled(IconButton)(
    ({ }) => `
        position: absolute;
    `
);

export const ChildrenWrapper = styled(Box)(
    ({ }) => `
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        max-width: 100%;
    `
);

export const LeftPanelWrapper = styled(Grid)(
    ({ }) => `
        position: sticky;
        top: 0px;
        flex-basis: ${LAYOUT_CONFIG.WIDTH_LEFT_PANEL.VALUE}${LAYOUT_CONFIG.WIDTH_LEFT_PANEL.TYPE};
        flex-shrink: 0;
    `
);

export const BodyWrapper = styled(Grid)(
    ({ theme }) => `
        display: flex;
        flex-grow: 1;
        max-width: calc(100% - ${LAYOUT_CONFIG.WIDTH_LEFT_PANEL.VALUE}${LAYOUT_CONFIG.WIDTH_LEFT_PANEL.TYPE});

        ${theme.breakpoints.down('md')} {
            max-width: 100%;
        }
    `
);

