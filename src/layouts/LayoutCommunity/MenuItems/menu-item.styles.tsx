import { Avatar, Box, Grid, Typography, styled } from "@mui/material";

export const GridWrapperCommunity = styled(Grid)(
    ({ theme }) => `
        direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-top: ${theme.spacing(2)};
        padding-left: ${theme.spacing(1.5)};
        width: 100%;
        max-height: 100%;
        overflow-y: auto;
        
        ${theme.breakpoints.down('md')} {
            width: 290px;
            position: relative;
            height: 100%;
            padding-left: ${theme.spacing(2)};
            padding-right: ${theme.spacing(2)};
        }
    `
);

export const BoxCommunity = styled(Box)<{isActive: boolean}>(
    ({ isActive }) => `
        display: flex;
        gap: 20px;
        align-items: center;
        margin-left: -10px;
        margin-bottom: 5px;
        padding: 10px 10px;
        cursor: pointer;
        border-radius: 6px;

        ${isActive ? `
            background-color: #dddddd;
            
            .MuiTypography-root {
                font-weight: bold;
            }
        `: ''}

        &:hover {
            background-color: #9E9E9E;

            .MuiTypography-root {
                font-weight: bold;
            }
        }
`
);

export const BoxIconWrapper = styled(Box)(
    ({ }) => `
        display: flex;
        width: 24px;
        height: 24px;
    `
);

export const TypographyCommunity = styled(Typography)(
    ({}) => `
        font-weight: bold;
        font-size: 25px;
    `
);

export const TypographyCommunityH4 = styled(Typography)(
    ({}) => `
        font-weight: bold;
        font-size: 17px;
        margin-bottom: 17px;
    `
);


export const TypographyCommunityH5 = styled(Typography)(
    ({}) => `
        font-weight: 400;
        font-size: 14px;
    `
);

export const AvatarWrapper = styled(Avatar)(
    ({}) => `
        background-color: #f5f5f5;
        width: 24px;
        height: 24px;

        svg {
            width: 35px;
            color: black;
        }
    `
);