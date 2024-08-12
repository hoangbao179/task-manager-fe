
import { ButtonGroup, Grid, Select, styled } from "@mui/material";

export const GridCalendarHeader = styled(Grid)(
    () => `
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: .5rem;

        .title-calendar {
            font-size: 25px;
            font-weight: bold;
            line-height: 3;
            align-items: center;
        }
    `
);

export const ButtonGroupWrapper = styled(ButtonGroup)(
    ({ theme }) => `
        margin-top: 18px;
        margin-left: 10px;
        height: 45px;
        
        .MuiTypography-root {
            font-size: 13px;
            color: #fff;
        }

        ${theme.breakpoints.down('md')} {
            margin-bottom: 0px;
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

export const CustomSelectBox = styled(Select)( ({ theme }) => `
    ${theme.breakpoints.down('md')} {
        width: 60px;
        min-height: auto;
        height: 45px;
        margin-top: 18px;
        margin-left: 10px;
    }
`);





