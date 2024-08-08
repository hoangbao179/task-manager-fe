
import { Box, Button, FormControlLabel, Grid, IconButton, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TextField, Typography, styled } from "@mui/material";
import { DeleteButtonDialog } from "../../../components/Button/Dialog/button-dialog.styles";


export const GridField = styled(Grid)(
    () => `
    `
);

export const ContentInput = styled(Typography)(
    ({ theme }) => `
        font-size: 15px;
        color: #000000;
        margin-bottom: 5px;
        min-height: 200px;
        border: 1px solid #c4c4c4;
        border-radius: 10px;

        .ck-editor__main {
            max-height: 210px;
            overflow-y: auto !important;
        }

        .ck-content {
            border-color: #ccced100 !important;
        }
        
        .mentions__suggestions__list {
            box-shadow: 0 1rem 2rem 0 rgb(255 255 255 / 30%), 0 0.1rem 1.3rem rgb(0 0 0 / 11%), 0 0.1rem 0.2rem rgb(0 0 0 / 8%);
            max-height: 240px;
            overflow: auto;
        }

        .ck-toolbar {
            border: 1px solid transparent !important;

            .ck-toolbar__items {
                border-bottom: 1px solid #c4c4c4 !important;
            }
        }

        ${theme.breakpoints.down('md')} {
            min-height: 100%;
            max-height: 100%;
        }
    `
);

export const TypographyGuestForm = styled(Typography)(
    ({ theme }) => `
        ${theme.breakpoints.down('md')} {
            font-size:18px;
            line-height: 20px;
        }
`);

export const BoxGuestFormHead = styled(Box)(
    ({ theme }) => `
        margin-left: 5px;
        margin-top: 5px;

        ${theme.breakpoints.down('md')} {
            padding-top: 15px;
        }
`);

export const BoxGuestFormContent = styled(Box)(
    ({ }) => `
`);

export const TextFieldName = styled(TextField)(
    ({ }) => `
        
`);

export const GridGuestImage = styled(Grid)(
    ({ }) => `
        padding-left: 40px !important;
    `
);

export const GridGuestIcon = styled(Box)(
    ({ }) => `
        text-align: center;
        width: 150px;
        height: 80px;

        svg {
            width: 100%;
            height: 100%;
        }
    `
);

export const CustomDeleteButtonDialog = styled(DeleteButtonDialog)(
    ({ }) => `
        padding-left: 0px
`);

export const PositionTable = styled(Table)(
    ({ theme }) => `

    ${theme.breakpoints.down('md')} {
        table-layout: fixed;
        border-collapse: separate;
        border-spacing: 0 15px;

        .position-row {
            box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
            border-radius: 7px;
        }

        ${theme.breakpoints.down('md')} {
            border-spacing: 0 0px;

            .position-row {
                box-shadow: none;
            }
        }

        .avatar {
            width: 50px;
        }
        .name {
            width: calc(100% - 100px);
        }
        .icon {
            width: 50px;
        }
    }
`
);

export const PositionTableHead = styled(TableHead)(
    ({ theme }) => `
    .MuiTableCell-head {
        text-transform: none;
        padding: 10px 15px;
    }

    ${theme.breakpoints.down('md')} {
        .MuiTableRow-root {
            background: none;
        }

        .MuiTableCell-head {
            border-bottom: none;
        }
    }
`
);

export const PositionTableBody = styled(TableBody)(
    ({ theme }) => `
    .MuiTableCell-body {
        padding: 10px 15px;
        vertical-align: middle;
    }

    ${theme.breakpoints.down('md')} {
        .MuiTableCell-body {
            padding: 10px 5px;
        }
    }
`
);

export const ButtonIconClear = styled(IconButton)(
    ({ }) => `
        border: 1px solid #eee;
        border-radius: 10px;

        .MuiSvgIcon-root {
            font-size: 18px;
        }
    `
);

export const ButtonIconAdd = styled(IconButton)(
    ({ }) => `
        margin-top: 18px;
        border: 2px solid #eee;
        border-radius: 10px;

        .MuiSvgIcon-root {
            font-size: 18px;
        }
    `
);

export const SwitchStatus = styled(Switch)(
    ({ }) => `
        padding: 5px 10px 5px 4px;
        height: 32px;

        .MuiSwitch-track {
            border-radius: 10px;
        }
    `,
);

export const TableCellTablePosition = styled(TableCell)(
    ({ }) => `
        vertical-align: text-bottom !important;
    `,
);

export const TextVisiblePositions = styled(Typography)(
    ({ theme }) => `
        margin-top: 10px;
        margin-bottom: 20px;
        white-space: nowrap;
        font-weight: 700;
        font-size: 14px;

        ${theme.breakpoints.down('md')} {
            margin-bottom: 0px;
        }
`);

export const TableContainerPosition = styled(TableContainer)(
    ({ }) => `
    `,
);

export const TableCellAction = styled(TableCell)(
    ({ theme }) => `
        vertical-align: top !important;

        ${theme.breakpoints.down('md')} {
            vertical-align: middle !important;
        }
    `,
);

export const FormControlLabelRadio = styled(FormControlLabel)(
    ({ }) => `
        margin-right: 40px;
    `,
);

export const TextVisibleAddGuest = styled(Typography)(
    ({ }) => `
        white-space: nowrap;
        font-weight: 700;
        font-size: 14px;
`);

export const ListInvitedUsers = styled(Box)(
    ({ }) => `
        border: 1px solid #eaeaea;
        border-radius: 3px;
        padding: 5px;
        border-right: none;
        border-left: none;
        max-height: 250px;
        overflow: auto;
    `
);

export const TextVisibleUserName = styled(Typography)(
    ({ }) => `
        white-space: nowrap;
        font-weight: 700;
        font-size: 14px;
`);

export const TextVisibleUserInfo = styled(Typography)(
    ({ }) => `
        white-space: nowrap;
        font-size: 14px;
`);

export const ActionsWrapper = styled(Stack)(
    ({ }) => `
        flex-direction: row;
        justify-content: center;
        align-items: center;
    `
);

export const IconButtonGuest = styled(IconButton)(
    ({ }) => `

        &:hover {
            background-color: rgb(85 105 255 / 0%);
        }
    `
);

export const ButtonWrapper = styled(Button)(
    ({ theme }) => `
        margin-top: 18px;
        background-color: #fff;
        height: 45px;
        width: 150px;
        
        .MuiTypography-root {
            font-size: 13px;
            color: #fff;
        }

        ${theme.breakpoints.down('md')} {
            margin-bottom: 0px;
            width: 40px;
            height: 40px;
            min-width: auto;

            .MuiButton-startIcon {
                margin-right: 0px;
                margin-left: 0px;
            }
            .MuiTypography-root {
                display: none;
            }
        }
    `
);

export const IconButtonAddGuest = styled(IconButton)(
    ({ }) => `
        border: 1px solid #eaeaea;
        
    `
);

export const AddGuestWrapper = styled(Grid)(
    ({ }) => `
        justify-content: center;
        align-items: center;
        
    `
);