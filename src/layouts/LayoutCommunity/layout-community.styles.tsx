import { Box, Grid, IconButton, styled } from "@mui/material";

export const LAYOUT_CONFIG = {
    WIDTH_LEFT_PANEL: {
        VALUE: '300',
        TYPE: 'px'
    },
    WIDTH_RIGHT_PANEL: {
        VALUE: '400',
        TYPE: 'px'
    }
};

export const LayoutCommunityWrapper = styled(Box)(
    ({ theme }) => `
        position: relative;
        margin: 0px -27px;
        padding-top: ${theme.spacing(2)};
        
        ${theme.breakpoints.down('md')} {
            margin: 0px -15px;
        }
    `
);

export const LayoutCommunityGrid = styled(Grid)(
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
        max-width: 680px;
        margin: auto;
        padding-top: 0px !important;
    `
);

export const LeftPanelWrapper = styled(Grid)(
    ({ }) => `
        flex-basis: ${LAYOUT_CONFIG.WIDTH_LEFT_PANEL.VALUE}${LAYOUT_CONFIG.WIDTH_LEFT_PANEL.TYPE};
        position: sticky;
        top: 0px;
        padding-top: 0px !important;
    `
);

export const BodyWrapper = styled(Grid)(
    ({ }) => `
        flex-grow: 1;
    `
);

export const RightPanelWrapper = styled(Grid)(
    ({ }) => `
        padding-top: 20px !important;
        flex-basis: ${LAYOUT_CONFIG.WIDTH_RIGHT_PANEL.VALUE}${LAYOUT_CONFIG.WIDTH_RIGHT_PANEL.TYPE};
        position: sticky;
        top: 0px;
    `
);
