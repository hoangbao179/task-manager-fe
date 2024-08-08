import { DialogTitle, Grid, Typography, styled } from "@mui/material";

export const DialogSubtitle = styled(Typography)(
    ({ }) => `
        font-size: 12px;
    `
);

export const CustomDialogTitle = styled(DialogTitle)(
    ({theme}) => `
        width: 100%;
        display: flex;
        justify-content: space-between;

        ${theme.breakpoints.down('md')} {
            flex-wrap: wrap;
        }
           
    `
);

export const TitlePopup = styled(Grid)(
    ({theme}) => `
        display: flex;
        gap: 10px;
        word-break: break-word;

        ${theme.breakpoints.down('md')} {
            width: 100%;
        }
    `
);

export const CustomActions = styled(Grid)(
    ({theme}) => `
        padding-right: 10px;
        flex-shrink: 0;

        .MuiButtonBase-root {
            color: #787575;
            padding: 8px;
            min-width: auto;
            height: 37px;
            
            svg {
                font-size: 1.5rem;
                color: #787575;
            }
        }

        ${theme.breakpoints.down('md')} {
            text-align: right;
            width: 100%;
            padding-right: 0px;
        }
    `
);
