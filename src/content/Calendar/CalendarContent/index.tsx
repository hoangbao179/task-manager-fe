import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Typography } from "@mui/material";
import { ButtonGroupWrapper, GridCalendarHeader } from "../PageHeader/page-header.style";
import { BoxButton, DialogContentDetailEvent, DialogContentEvent, FullCalendarWrapper } from "./calendar-content-style";
import FullCalendar from '@fullcalendar/react';
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useRef } from "react";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { FC } from "react";
import { IRangeCalendarView } from "../../../models/Task/task.model";
import { ISnackbarOption } from "../../../models/ISnackbarOption";
import { DatesSetArg, EventInput } from "@fullcalendar/core";
import { combineDateTimeUTC } from "../../../utils/helper/helper";
import { ModeEditOutline } from "@mui/icons-material";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { TabContext, TabPanel } from "@mui/lab";
import { CustomActions, CustomDialogDetailTitle } from "../../../components/Dialog/dialog.styles";
import multiMonthPlugin from '@fullcalendar/multimonth';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MSG_ERROR_COMMON } from "../../../constants/common";
import { CancelButtonDialog, OkButtonDialog } from "../../../components/Button/Dialog/button-dialog.styles";
import LoadingSectionComponent from "../../../components/LoadingSection";
import { CalendarEventForm, ICalendarEventForm } from "../../../models/Calendar/calendar-event.form";
import { CalendarEvent } from "../../../models/Calendar/calendar-event";
import { CalendarEventService } from "../../../services/calendar/calendar.service";
import { useForm } from "react-hook-form";
import AddEventCalendarPopup from "../AddEventCalendarPopup";
import EventDetailPopupComponent from "../EventDetailPopup";
import dayjs from "dayjs";
import { E_FormatDate } from "../../../enums/E_FormatDate";
export enum ECalendarMode {
    YEAR = 'multiMonthYear',
    MONTH = 'dayGridMonth',
    WEEK = 'timeGridWeek',
}

export const TabManagement = {
    EventInfo: 'EventInfo',
    Guests: 'Guests',
    GuestsDetail: 'Guests',
};

const CalendarContent: FC<any> = (): JSX.Element => {
    const formCalendarEvent = useForm<ICalendarEventForm>({ mode: 'all' });
    const calendarRef = useRef(null);
    const calendarApi = calendarRef.current?.getApi();
    const [showAddEventDialog, setShowAddEventDialog] = useState(false);
    const [showDetailEventDialog, setShowDetailEventDialog] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<CalendarEvent>(null);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
    const [isDoubleClick, setIsDoubleClick] = useState(false);
    const [rangeCalendarView, setRangeCalendarView] = useState<IRangeCalendarView>();
    const [events, setEvents] = useState<CalendarEvent[]>();
    const [snackbarOption, setSnackbarOption] = useState<ISnackbarOption>({ open: false, type: 'success', messages: '' });
    const [showConfirmChangeTabDialog, setShowConfirmChangeTabDialog] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    useEffect(() => {
        getAllEvent(rangeCalendarView);
    }, [rangeCalendarView]);

    useEffect(() => {
        if (events && events.length && calendarApi) {
            calendarApi.batchRendering(() => {
                // Clear all event
                calendarApi?.removeAllEventSources();
                calendarApi?.removeAllEvents();
            });
            events.forEach((event: CalendarEvent) => {
                calendarApi.batchRendering(() => {
                    calendarApi.addEvent(parsingEvent(event));
                });
            });
        }
        else if (events && events.length === 0 && calendarApi) {
            calendarApi.batchRendering(() => {
                // Clear all event
                calendarApi?.removeAllEventSources();
                calendarApi?.removeAllEvents();
            });
        }
    }, [events]);

    const onShowAddEventDialog = (): void => {
        setShowAddEventDialog(true);

    };

    const onShowAddEventDetailDialog = (): void => {
        setShowDetailEventDialog(true);
    };

    const onShowDialogAddEvent = (data?: DateClickArg): void => {
        onShowAddEventDialog();

        if (data) {
            const time = data.date;
            const calendarEvent = new CalendarEvent({
                startDate: time,
                endDate: time,
            });

            if (isDoubleClick) {
                const isSetTimeModeWeek = ECalendarMode.WEEK === data?.view?.type;

                if (isSetTimeModeWeek) {
                    setCurrentEvent({
                        ...calendarEvent,
                        startTime: dayjs(time),
                        endTime: dayjs(time),
                        isSetTimeModeWeek: isSetTimeModeWeek
                    });
                }
                else {
                    setCurrentEvent(calendarEvent);
                }
            }
            else {
                setCurrentEvent(calendarEvent);
            }
        }
        else {
            clearForm();
            setCurrentEvent(null);
        }
    };

    const handleClose = (): void => {
        setShowAddEventDialog(false);
        clearForm();
    };

    const handleCloseDetailEvent = (): void => {
        setShowDetailEventDialog(false);
    };

    const checkPermissionAction = (): boolean => {
        return true;
    };

    const handleCloseConfirm = (): void => {
        setShowConfirmDialog(false);
        handleClose();
    };

    const onSubmitCalendarEvent = async (data: ICalendarEventForm): Promise<void> => {
        setSubmitting(true);
        const param = new CalendarEventForm(data);
        if (data?.id) {
            CalendarEventService.update(param, data?.id)
                .then(result => {
                    if (result.statusCode === HttpStatusCode.Ok) {
                        if (showConfirmChangeTabDialog) {
                            setShowConfirmChangeTabDialog(false);

                            clearForm();
                        } else {
                            setShowAddEventDialog(false);
                        }

                        getAllEvent(rangeCalendarView);
                    }
                    else {
                        setSnackbarOption({
                            open: true,
                            type: 'error',
                            messages: result.message
                        });
                    }
                })
                .catch(() => {
                    setSnackbarOption({
                        open: true,
                        type: 'error',
                        messages: MSG_ERROR_COMMON
                    });
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
        else {
            CalendarEventService.createCalendarEvent(param)
                .then(result => {
                    if (result.statusCode === HttpStatusCode.Ok && result.data) {
                        if (showConfirmChangeTabDialog) {
                            setShowConfirmChangeTabDialog(false);
                            clearForm();
                        }
                        else {
                            setShowAddEventDialog(false);
                        }
                        getAllEvent(rangeCalendarView);
                    }
                    else {
                        setSnackbarOption({
                            open: true,
                            type: 'error',
                            messages: result.message
                        });
                    }
                })
                .catch(() => {
                    setSnackbarOption({
                        open: true,
                        type: 'error',
                        messages: MSG_ERROR_COMMON
                    });
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };

    const getDateSetDefault = (date: DatesSetArg): void => {
        setTimeout(() => {
            const dateRange: IRangeCalendarView = {
                startDate: moment(date?.startStr).format('yyyy-MM-DD'),
                endDate: moment(date?.endStr).format('yyyy-MM-DD'),
                minutesOffset: (new Date()).getTimezoneOffset()
            };

            if (moment(dateRange?.startDate).isSame(rangeCalendarView?.startDate) && moment(dateRange?.endDate).isSame(rangeCalendarView?.endDate)) {
                return;
            }

            setRangeCalendarView(dateRange);
        }, 0);
    };

    const getAllEvent = (date): void => {
        if (rangeCalendarView && calendarApi) {
            CalendarEventService.getFilteredCalendarEvents(date)
                .then(result => {
                    setEvents(result.data);
                })
                .finally(() => {
                });
        }
    };

    const getEventById = (id: string): void => {
        setSubmitting(true);
        CalendarEventService.getCalendarEventById(id)
            .then(res => {
                if (res.statusCode === HttpStatusCode.Ok) {
                    res.data.startDate = dayjs(combineDateTimeUTC(res.data.startDate, res.data.startTime, res.data.isAllDay)).format('YYYY-MM-DD');
                    res.data.endDate = dayjs(combineDateTimeUTC(res.data.endDate, res.data.endTime, res.data.isAllDay)).format('YYYY-MM-DD');
                    res.data.startTime = dayjs(combineDateTimeUTC(res.data.startDate, res.data.startTime, res.data.isAllDay)).format('HH:mm:ss');
                    res.data.endTime = dayjs(combineDateTimeUTC(res.data.endDate, res.data.endTime, res.data.isAllDay)).format('HH:mm:ss');
                    res.data.startTimeString = dayjs.isDayjs(res.data?.startTime) ? dayjs(res.data?.startTime).format(E_FormatDate.TimeEvent) : dayjs(new Date(`${res.data.startDate} ${res.data?.startTime}`)).format(E_FormatDate.TimeEvent);
                    res.data.endDateTimeString = dayjs.isDayjs(res.data?.endTime) ? dayjs(res.data?.endTime).format(E_FormatDate.TimeEvent) : dayjs(new Date(`${res.data.endDate} ${res.data?.endTime}`)).format(E_FormatDate.TimeEvent);
                    setCurrentEvent(res.data);
                    setCurrentEvent(res.data);
                };
            })
            .finally(() => {
                setSubmitting(false);
            });
    };


    const onEditEvent = (_: string): void => {
        setShowDetailEventDialog(false);
        onShowAddEventDialog();
    };

    const onCopyEvent = (_: string): void => {
        setShowDetailEventDialog(false);
        onShowAddEventDialog();

        setCurrentEvent(new CalendarEvent({
            ...currentEvent,
            id: null,
            title: ` Copy of ${currentEvent.title}`,
            isAllDay: false,
            startDate: new Date(),
            endDate: new Date(),
            startTime: undefined,
            endTime: undefined,
        }));
    };

    const onRemoveEvent = (_: string): void => {
        setShowConfirmDeleteDialog(true);
    };

    const handleCloseDeleteEvent = (): void => {
        setShowConfirmDeleteDialog(false);
    };

    const handleSubmitDeleteEvent = (): void => {
        setSubmitting(true);
        CalendarEventService.delete(currentEvent.id)
            .then((result) => {
                if (result.statusCode === HttpStatusCode.Ok) {
                    getAllEvent(rangeCalendarView);
                    setShowDetailEventDialog(false);
                }
                else {
                    setSnackbarOption({
                        open: true,
                        type: 'error',
                        messages: result.message
                    });
                }
            })
            .catch(() => {
                setSnackbarOption({
                    open: true,
                    type: 'error',
                    messages: MSG_ERROR_COMMON
                });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const parsingEvent = (data: CalendarEvent): EventInput => {
        const start = combineDateTimeUTC(data.startDate, null, data.isAllDay).toString();
        const end = combineDateTimeUTC(data.endDate, null, data.isAllDay).toString();
        var startDate = new Date(start);
        var endDate = new Date(end);
        if (data.isAllDay && endDate.getDate() != startDate.getDate()) {
            endDate.setDate(endDate.getDate() + 1);
        }
        const newEvent: EventInput = {
            id: data.id,
            start: startDate,
            end: endDate,
            title: data.title,
            description: data.description,
            display: 'auto',
            allDay: data.isAllDay,
            className: 'event-custom'
        };
        return newEvent;
    };

    const handleCloseSnackbar = (): void => {
        setSnackbarOption({
            ...snackbarOption,
            open: false,
            messages: ''
        });
    };

    const customTitleFormatter = ({ date }): string => {
        const dateTime = new Date(date?.year, date?.month, date?.day);
        const startFormatted = dateTime.toLocaleDateString('en', { month: 'short', day: 'numeric' });

        return `Week of ${startFormatted}, ${date.year}`;
    };

    const dayClickCallback = (data: DateClickArg): void => {
        if (!checkPermissionAction()) {
            return;
        }
        clearForm();

        if (isDoubleClick) {
            onShowDialogAddEvent(data);
            setIsDoubleClick(false);
        }
        else {
            setIsDoubleClick(true);
            setTimeout(() => {
                setIsDoubleClick(false);
            }, 300);
        }
    };

    const getTitle = (): string => {
        if (checkPermissionAction()) {
            if (currentEvent?.id) {
                return 'Edit Event';
            }
            return 'Add Event';
        }
        return "Event Detail";
    };

    const onClose = (_: object, reason: string): void => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return;
        }
        handleClose();
    };

    const handleCloseConfirmChangeTab = (): void => {
        setShowConfirmChangeTabDialog(false);

        clearForm();
    };

    const clearForm = (): void => {
        formCalendarEvent.reset();
    };

    const submitForm = (): void => {
        setShowConfirmDialog(false);
        formCalendarEvent.handleSubmit(onSubmitCalendarEvent)();
    };

    return (
        <>
            <GridCalendarHeader xs={12}>
                <Box>
                    <Typography className="title-calendar">
                        Calendar
                    </Typography>
                </Box>
                <BoxButton>
                    {
                        checkPermissionAction() &&
                        <Box>
                            <ButtonGroupWrapper variant="outlined">
                                <Button
                                    onClick={() => onShowDialogAddEvent()}
                                    color='secondary'
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                >
                                    <Typography>Add Event</Typography>
                                </Button>
                            </ButtonGroupWrapper>
                        </Box>
                    }
                </BoxButton>


            </GridCalendarHeader>

            <FullCalendarWrapper>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin, timeGridPlugin]}
                    weekends={true}
                    editable={true}
                    fixedWeekCount={false}
                    displayEventTime={true}
                    handleWindowResize={true}
                    eventStartEditable={false}
                    eventDurationEditable={false}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: `${ECalendarMode.YEAR},${ECalendarMode.MONTH},${ECalendarMode.WEEK}`
                    }}
                    allDayText='All day'
                    height={'100%'}
                    aspectRatio={2}
                    initialView={ECalendarMode.MONTH}
                    eventBackgroundColor='green'
                    eventDisplay={'block'}
                    eventTimeFormat={{
                        hour: 'numeric',
                        minute: '2-digit',
                        meridiem: 'narrow',
                    }}
                    timeZone={'local'}
                    datesSet={(date) => getDateSetDefault(date)}
                    eventClick={(data) => { getEventById(data.event.id); onShowAddEventDetailDialog(); }}
                    dateClick={(data) => dayClickCallback(data)}
                    views={{
                        timeGridWeek: {
                            titleFormat: customTitleFormatter
                        }
                    }}
                />
            </FullCalendarWrapper>

            <Dialog
                fullScreen={false}
                fullWidth={true}
                maxWidth="md"
                open={showAddEventDialog}
                onClose={onClose}
            >
                <DialogTitle>
                    {
                        getTitle()
                    }
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContentEvent>
                    <AddEventCalendarPopup
                        submitting={submitting}
                        currentEvent={currentEvent}
                        isPermissionAction={checkPermissionAction()}
                        onSubmit={submitForm}
                        formCalendarEvent={formCalendarEvent}
                    />
                </DialogContentEvent>

                <DialogActions>
                    {
                        checkPermissionAction() ?
                            <Grid
                                container
                                flexDirection="row"
                                justifyContent="center"
                                spacing={2}>
                                <Grid item>
                                    <OkButtonDialog
                                        onClick={submitForm}
                                        color="secondary"
                                        variant="contained"
                                    >
                                        OK
                                    </OkButtonDialog>
                                </Grid>

                                <Grid item>
                                    <CancelButtonDialog
                                        onClick={handleClose}
                                        variant="outlined"
                                    >
                                        Cancel
                                    </CancelButtonDialog>
                                </Grid>
                            </Grid>
                            : <Grid
                                container
                                flexDirection="row"
                                justifyContent="center"
                                spacing={2}>
                                <Grid item>
                                    <OkButtonDialog
                                        onClick={handleClose}
                                        color="secondary"
                                        variant="contained"
                                    >
                                        OK
                                    </OkButtonDialog>
                                </Grid>
                            </Grid>
                    }

                </DialogActions>
            </Dialog >

            <Dialog
                fullScreen={false}
                fullWidth={true}
                open={showDetailEventDialog}
                onClose={handleCloseDetailEvent}
            >
                <CustomDialogDetailTitle>
                    {
                        <CustomActions>
                            <IconButton
                                aria-label="edit"
                                onClick={() => { onEditEvent(currentEvent?.id); }}
                            >
                                <ModeEditOutline fontSize="small"></ModeEditOutline>
                            </IconButton>

                            <IconButton
                                aria-label="copy"
                                onClick={() => { onCopyEvent(currentEvent?.id); }}
                            >
                                <ContentCopyOutlinedIcon fontSize="small"></ContentCopyOutlinedIcon>
                            </IconButton>

                            <IconButton
                                aria-label="remove"
                                onClick={() => { onRemoveEvent(currentEvent?.id); }}
                            >
                                <DeleteOutlineOutlinedIcon fontSize="small"></DeleteOutlineOutlinedIcon>
                            </IconButton>
                        </CustomActions>
                    }

                </CustomDialogDetailTitle>

                <IconButton
                    aria-label="remove"
                    onClick={() => { handleCloseDetailEvent(); }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 15,
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContentDetailEvent>
                    <TabContext value={TabManagement.EventInfo}>
                        <TabPanel value={TabManagement.EventInfo}>
                            <EventDetailPopupComponent
                                eventDetail={currentEvent}
                            />
                        </TabPanel>
                    </TabContext>

                </DialogContentDetailEvent>

                <DialogActions></DialogActions>
            </Dialog >

            <Dialog
                maxWidth={'xs'}
                open={showConfirmDeleteDialog}
                onClose={handleCloseDeleteEvent}
            >
                <DialogTitle>
                    Are you sure?
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDeleteEvent}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent>
                    <DialogContentText sx={{ wordBreak: 'break-all' }}>
                        Remove event '{currentEvent?.title}' ?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Grid
                        container
                        flexDirection="row"
                        justifyContent="center"
                        spacing={2}>
                        <Grid item>
                            <OkButtonDialog
                                onClick={(): any => {
                                    handleCloseDeleteEvent();
                                    return handleSubmitDeleteEvent();
                                }}
                                color="secondary"
                                variant="contained"
                            >
                                OK
                            </OkButtonDialog>
                        </Grid>

                        <Grid item>
                            <CancelButtonDialog
                                onClick={handleCloseDeleteEvent}
                                variant="outlined"
                            >
                                Cancel
                            </CancelButtonDialog>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showConfirmDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle >
                    Save First?
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseConfirm}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent>
                    <DialogContentText>
                        Save before closing?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Grid
                        container
                        flexDirection="row"
                        justifyContent="center"
                        spacing={2}>

                        <Grid item>
                            <OkButtonDialog
                                onClick={submitForm}
                                color="secondary"
                                variant="contained"
                            >
                                Yes
                            </OkButtonDialog>
                        </Grid>

                        <Grid item>
                            <CancelButtonDialog
                                onClick={handleCloseConfirm}
                                variant="outlined"
                            >
                                No
                            </CancelButtonDialog>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>


            <Dialog
                open={showConfirmChangeTabDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle >
                    Save First?
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseConfirmChangeTab}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent>
                    <DialogContentText>
                        Save before changing tab?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Grid
                        container
                        flexDirection="row"
                        justifyContent="center"
                        spacing={2}>

                        <Grid item>
                            <OkButtonDialog
                                onClick={submitForm}
                                color="secondary"
                                variant="contained"
                            >
                                Yes
                            </OkButtonDialog>
                        </Grid>

                        <Grid item>
                            <CancelButtonDialog
                                onClick={handleCloseConfirmChangeTab}
                                variant="outlined"
                            >
                                No
                            </CancelButtonDialog>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>


            <Snackbar
                open={snackbarOption.open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={snackbarOption?.timeHidden || 2000}
                onClose={handleCloseSnackbar}
                security={snackbarOption.type}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    variant="filled"
                    severity={snackbarOption.type}
                    sx={{ width: '100%' }}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            style={{ color: 'white' }}
                            onClick={handleCloseSnackbar}
                        >
                            <CloseIcon />
                        </IconButton>
                    }>
                    {snackbarOption.messages}
                </Alert>
            </Snackbar>

            <LoadingSectionComponent
                isLoading={false}
                isShowBackdrop={true}>
            </LoadingSectionComponent>

            <LoadingSectionComponent
                isLoading={false}
                isShowBackdrop={true}>
            </LoadingSectionComponent>
        </>
    );
};

export default CalendarContent;