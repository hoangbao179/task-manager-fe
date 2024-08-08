import { TabList, TabPanel } from "@mui/lab";
import { Box, DialogContent, Grid, styled } from "@mui/material";

export const FullCalendarWrapper = styled(Box)(
    ({theme}) => `
       height: 750px;

        .fc {

            .fc-button {
                text-transform: capitalize;
            }

            .fc-next-button, .fc-prev-button {
                background-color: white;
                border-color: white;
                color: #3d1a52;

                &:hover {
                    background-color: #efefef;
                    border-color: #efefef;
                    color: #3d1a52;
                }

                &:active {
                    background-color: #dddddd;
                    border-color: #dddddd;
                    color: #3d1a52;
                }
            }
            
            .fc-today-button {
                background-color: white;
                border-color: #3d1a52;
                color: #3d1a52;
                text-transform: capitalize;
                cursor: pointer;

                &:active {
                    background-color: #dddddd;
                    border-color: #dddddd;
                    color: #3d1a52;
                }
            }

            .fc-multiMonthYear-button, .fc-dayGridMonth-button, .fc-timeGridWeek-button {
                background-color: #3d1a52;
                border-color: #3d1a52;
                min-width: 70px;

                &.fc-button-active, &:active {
                    background-color: rgb(61, 26, 82);
                    border-color: rgb(61, 26, 82);
                    opacity: 0.65;
                }
            }

            .fc-col-header-cell-cushion {
                display: inline-block;
                padding: 2px 4px;
                text-transform: uppercase;
                font-weight: normal;
            }

            .fc-popover {
                z-index: 999;
            }

            .fc-daygrid-day-top {
                justify-content: center;
            }

            .fc-col-header-cell.fc-day.fc-day-today {
                .fc-scrollgrid-sync-inner a {
                        background-color: rgb(26 115 232);
                        color: white;
                        border-radius: 15px;
                    }
            }

            .fc-day-today {

                &:not(.fc-popover) {
                    background-color: unset;
                }

                .fc-daygrid-day-number {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgb(26 115 232);
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    color: white;
                    text-decoration: none;
                }
            }

            .fc-event-time {
                flex-shrink: 0;
            }
        }

        button.fc-next-button.fc-button.fc-button-primary:active,
        button.fc-prev-button.fc-button.fc-button-primary:active {
            opacity: 1;
        }
  

        .fc .fc-button-primary:not(:disabled):active:focus, .fc .fc-button-primary:focus, 
        .fc .fc-button-primary:not(:disabled).fc-button-active:focus {
            box-shadow: none;
        }

        .event-custom {

            .fc-event-time {
                font-weight: bold;
                max-width: calc(100% - 18px);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }

            .fc-event-title {
                text-overflow: ellipsis;
                font-weight: normal;
                white-space: nowrap;
            }

        }

        ${theme.breakpoints.down('md')} {

            .fc-header-toolbar {
                flex-wrap: wrap;

                .fc-multiMonthYear-button, .fc-dayGridMonth-button, .fc-timeGridWeek-button  {
                    margin-top: 15px;
                }

            }
   
            .fc .fc-multimonth-compact .fc-multimonth-daygrid-table, .fc .fc-multimonth-compact .fc-multimonth-header-table {
                font-size: 0.6em;
            }
        }
    `
);

export const BoxTabListCalender = styled(Box)(
    ({  }) => `
        margin: 5px 25px;
    `
);

export const TabListCalender = styled(TabList)(
    ({  }) => `
        .MuiTabs-indicator {
            box-shadow: none;
            background-color: #3d1a52;
        }
    `
);

export const TabPanelGuest = styled(TabPanel)(
    ({  }) => `
        padding-bottom: 0px;
    `
);

export const DialogContentEvent = styled(DialogContent)(
    ({  theme }) => `
        min-height: 676px;

        ${theme.breakpoints.down('md')} {
            padding-left: 10px;
            padding-right: 10px;
        }
    `
);

export const ItemDetailWrapper = styled(Grid)<{isRichText?: boolean}>(
    ({isRichText}) => `
        display:  ${isRichText ? 'block' : 'flex'};
        align-items: center;
        padding: ${isRichText ? '10px 0px' : '15px 0px 0px 18px'};
        border-top: ${isRichText ? '1px solid #ededed' : '0px'};
    `
);

export const LabelDetail = styled('strong')(
    ({}) => `
        display: flex;
        align-items: center;
        min-width: 40px;
        align-self: start;
    `
);

export const ColorItem = styled(Grid)<{color: string}>(
    ({theme, color}) => `
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #${color};
        color: white;
        transition: transform 0.2s;
        border: 1px solid #f3f3f3;
        flex-shrink: 0;

        ${theme.breakpoints.down('md')} {
            margin-top: 6px;
        }
    `
);

export const TabPanelEventInfo = styled(TabPanel)<{isShowTab: boolean}>(
    ({isShowTab}) => `
        padding-top: ${isShowTab ? '27px' : '0px'};
    `
);