import { Box, Button, IconButton, Popover, Typography, styled } from "@mui/material";

export const MenuUserBox = styled(Box)(
    ({ theme }) => `
        display:flex;
        min-width: 210px;
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

export const UserBoxText = styled(Box)(
    ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

export const UserBoxLabel = styled(Typography)(
    ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

export const IconButtonWrapper = styled(IconButton)(
    () => `
    padding: 0;
    
    .MuiSvgIcon-root {
        color: #fff;
    }
`
);

export const IconButtonNotification = styled(IconButton)(
    () => `
    padding: 0;
    margin-right: 22px;
    
    .MuiSvgIcon-root {
        color: #fff;
    }
`
);

export const ButtonActions = styled(Box)(
    ({}) => `
`);

export const ButtonAction = styled(Button)(
    ({}) => `
        display: flex;
        justify-content: start;
        color: #3d1a52;
        border-radius: 0px;
        font-size: 13px;
`);

export const SeeMoreButton = styled(Button)(
    ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        width: 100%;
        padding: 5px;
        font-size: 13px;
        margin: auto;
        border-radius: 0px;

        .MuiCircularProgress-root {
            color: #3d1a52;
            width: 15px !important;
            height: 15px !important;
        }
`
);

export const ReadAllButton = styled(Button)(
    ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        text-align: right;
        padding: 5px;
        font-size: 13px;
        width: 100%;
        padding-right: 18px;
        border-radius: 0px;

        .MuiCircularProgress-root {
            color: #3d1a52;
            width: 15px !important;
            height: 15px !important;
        }
`
);

export const PopoverUser = styled(Popover)(
    ({}) => `
        top: 30px;
`);

export const PopoverNotification = styled(Popover)(
    ({}) => `
        top: 30px;
`);

export const PopoverInboxNotification = styled(Popover)(
    ({}) => `
        top: 30px;
`);

export const NoItemLabelWrapper = styled(Box)(
    ({ }) => `
        padding: 20px 15px;
    `
);

export const ButtonLogin = styled(Button)(
    ({ }) => `
    padding: 20px 15px;
`
)