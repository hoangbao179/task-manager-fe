import { Accordion, Avatar, Box, Button, Grid, Typography, styled } from "@mui/material";

export const GridWrapperMenuItem = styled(Grid)(
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

export const ButtonSendFile = styled(Button)(
    ({ }) => `
        width: 90%;
        margin-top: 20px;
    `
);

export const BoxMenuItem = styled(Box)<{isActive: boolean}>(
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

export const TypographyMenu = styled(Typography)(
    ({}) => `
        font-weight: bold;
        font-size: 25px;
    `
);

export const AccordionWrapper = styled(Accordion)(
    ({}) => `
        
        &.Mui-disabled {
            background-color: unset !important;
        }

        .Mui-disabled {
            opacity: 1 !important;
        }

        .MuiAccordionSummary-root {
            padding-left: 0px;
        }

        .MuiAccordionDetails-root {
            padding-left: 0px;
            padding-bottom: 0px;
        }
        
        .MuiAccordionSummary-root {
            min-height: 50px;
        }

        .css-o4b71y-MuiAccordionSummary-content.Mui-expanded {
            margin: 0px;
        }
    `
);

export const TypographyMenuH4 = styled(Typography)(
    ({}) => `
        font-weight: bold;
        font-size: 17px;
    `
);


export const TypographyMenuH5 = styled(Typography)(
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
