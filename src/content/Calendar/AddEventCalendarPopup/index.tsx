import { Autocomplete, Checkbox, FormControl, FormHelperText, Grid, MenuItem, Stack, TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { FC, useCallback, useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { ContentInput, GridField } from "./calendar-content-style";
import { CalendarEvent } from "../../../models/Calendar/calendar-event";
import { ICalendarEventForm } from "../../../models/Calendar/calendar-event.form";
import { combineDateTime } from "../../../utils/helper/helper";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../../components/MyEditor"), { ssr: false });
interface IAddEventCalendarPopupProps {
    submitting: boolean,
    isPermissionAction: boolean,
    currentEvent: CalendarEvent,
    formCalendarEvent: UseFormReturn<ICalendarEventForm, any, undefined>,
    onSubmit: () => void,
}

const AddEventCalendarPopup: FC<IAddEventCalendarPopupProps> = ({isPermissionAction, formCalendarEvent, currentEvent, onSubmit}): JSX.Element => {
    const {
        handleSubmit, clearErrors, watch, setError,
        setValue, getValues, register,
        control, formState: { errors }
    } = formCalendarEvent;

    const [isAllDayChecked, setIsAllDayChecked] = useState<boolean>(false);
    const loadIsChecked = (): void => {
        if (currentEvent?.isAllDay) {
            setIsAllDayChecked(currentEvent?.isAllDay);

            setValue('startTime', undefined);
            setValue('endTime', undefined);
        } else {
            setIsAllDayChecked(false);
        };
    };

    useEffect(() => {
        initFormValue();
        loadIsChecked();
    }, [currentEvent]);

    const initFormValue = (): void => {
        var dateDefault = new Date();


        setValue('id', currentEvent?.id ? currentEvent.id : undefined);
        setValue('title', currentEvent?.title ? currentEvent.title : undefined);

        setValue('startDate', currentEvent?.startDate ? currentEvent.startDate : dateDefault);

        setValue('endDate', currentEvent?.endDate ? currentEvent.endDate : dateDefault);
        
        setValue('isAllDay', currentEvent?.isAllDay ? currentEvent.isAllDay : undefined);

        setValue('description', currentEvent?.description ? currentEvent.description : undefined);

        if (currentEvent?.isSetTimeModeWeek) {
            setValue('startTime', currentEvent?.startTime ? currentEvent?.startTime : undefined);
            setValue('endTime', currentEvent?.endTime ? currentEvent?.endTime : undefined);
        } 
        else {
            setValue('startTime', currentEvent?.startTime ? combineDateTime(currentEvent.startDate, currentEvent.startTime) : undefined);
            setValue('endTime', currentEvent?.endTime ? combineDateTime(currentEvent.endDate, currentEvent.endTime) : undefined);
        }

        clearErrors(['title', 'startDate', 'endDate', 'startTime', 'endTime', 'isAllDay', 'description']);
    };



    const validateDates = (startDate: Date | string | Dayjs, dueDate: Date | string | Dayjs, isCompareTime: boolean = false): boolean => {
        if (!isValidDate(startDate) || !isValidDate(dueDate)) {
            return true;
        }

        const dataConvert = {
            startDate: dayjs.isDayjs(startDate) ? (startDate as Dayjs)?.toISOString() : startDate as string | number | Date,
            dueDate: dayjs.isDayjs(dueDate) ? (dueDate as Dayjs)?.toISOString() : dueDate as string | number | Date
        };

        if (isCompareTime && dayjs(watch('startDate')).isBefore(dayjs(watch('endDate')))) {
            return true;
        }
        
        if (isCompareTime) {
            let startTime = new Date(dataConvert.startDate).getTime();
            let endTime = new Date(dataConvert.dueDate).getTime();

            if (startTime > endTime) {
                return false;
            }
        } 
        else {

            startDate = new Date(dataConvert.startDate);
            startDate?.setHours(0);
            startDate?.setMinutes(0);
            startDate?.setMilliseconds(0);

            dueDate = new Date(dataConvert.dueDate);
            dueDate?.setHours(0);
            dueDate?.setMinutes(0);
            dueDate?.setMilliseconds(0);

            if (startDate.getTime() > dueDate.getTime()) {
                return false;
            }
        }

        clearErrors('endDate');
        clearErrors('startDate');
        return true;
    };

    const validateTimes = (startTime: Date | string | Dayjs, endTime: Date | string | Dayjs): boolean => {
        if (!isValidDate(startTime) || !isValidDate(endTime)) {
            return true;
        }
        
        const isValid = validateDates(startTime, endTime, true);

        if (isValid) {
            clearErrors('endTime');
            clearErrors('startTime');
        }

        return isValid;
    };

    const isValidDate = (date: Date | string | Dayjs): boolean => {
        return dayjs(date).isValid();
    };

    const onChangeStartDate = (startDate: Date | string | Dayjs): void => {
        if (!isValidDate(startDate)) {
            setError('startDate', {
                type: 'onChange',
                message: 'Start date is invalid date',
            });

            return;
        }

        const dateConvert = (startDate as Dayjs)?.toISOString() || startDate as string | number | Date;
        const date = new Date(dateConvert);

        setValue('startDate', date, {shouldDirty: true});
        setValue('endDate', date, {shouldDirty: true});
        
        clearErrors('startDate');
        clearErrors('endDate');
    };

    const onChangeEndDate = (endDate: Date | string | Dayjs): void => {
        if (!isValidDate(endDate)) {
            setError('endDate', {
                type: 'onChange',
                message: 'End date is invalid date',
            });

            return;
        }

        const dateConvert = (endDate as Dayjs)?.toISOString() || endDate as string | number | Date;
        const date = new Date(dateConvert);

        setValue('endDate', date, {shouldDirty: true});
        clearErrors('endDate');

        const isValid = validateDates(watch('startDate'), watch('endDate'));

        if (isValid) {
            clearErrors('endTime');
            clearErrors('startTime');
        }
    };

    const handleCheckedAllDay = (event): void => {
        const value = event.target.checked as boolean;

        setIsAllDayChecked(value);
        setValue('isAllDay', value);

        if (value) {
            setValue('startTime', null);
            setValue('endTime', null);

            clearErrors('startTime');
            clearErrors('endTime');
        }
    };


    const onValueChangeEditor =  (_: any, editor: any): void => {
        setValue('description', editor.getData());
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense" variant="outlined">
                                    <TextField
                                        fullWidth
                                        id="title"
                                        type="text"
                                        name="title"
                                        variant="outlined"
                                        label="Event title *"
                                        disabled={!isPermissionAction}
                                        inputProps={{ maxLength: 255 }}
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                        {
                                            ...register(
                                                'title',
                                                {
                                                    validate: {
                                                        maxLength: (value) => {
                                                            const trimmedValue = value?.trim();
                                                            const maxLength = 255;
                                                            if (trimmedValue?.length > maxLength) {
                                                                return `Title must be less than ${maxLength} characters`;
                                                            }
                                                            return true;
                                                        },
                                                    },
                                                    required: "The title is required."
                                                })
                                        }>
                                    </TextField>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <GridField item xs={6} className="date-time-picker">
                                        <FormControl fullWidth margin="dense" variant="outlined">
                                            <Controller
                                                rules={{
                                                    validate: {
                                                        compareDay: (fieldValue): boolean | string => {
                                                            if (!isValidDate(fieldValue)) {
                                                                return 'Start date is invalid date';
                                                            }
                                                            return validateDates(fieldValue, getValues('endDate')) || 'End date is earlier than start date.';
                                                        }
                                                    },
                                                    required: "The start date is required."
                                                }}
                                                render={({ field: { ref, onBlur, name, ...field }, fieldState }): JSX.Element => (
                                                    <DatePicker
                                                        {...field}
                                                        onChange={onChangeStartDate}
                                                        inputRef={ref}
                                                        value={dayjs(field.value as string) ?? null}
                                                        label="Start date *"
                                                        disabled={!isPermissionAction}
                                                        slotProps={{
                                                            textField: {
                                                                onBlur,
                                                                name,
                                                                error: !!fieldState?.error,
                                                            },

                                                        }}
                                                    />
                                                )}
                                                control={control}
                                                name="startDate"
                                            />
                                            <FormHelperText error={!!errors.startDate}>{errors?.startDate?.message}</FormHelperText>
                                        </FormControl>
                                    </GridField>
                                    
                                    <GridField item xs={6} className="date-time-picker" >
                                        <FormControl fullWidth margin="dense" variant="outlined">
                                            <Controller
                                                disabled={isAllDayChecked || !isPermissionAction}
                                                rules={{
                                                    validate: {
                                                        compareDay: (fieldValue): boolean | string => {
                                                            if (!isValidDate(fieldValue)) {
                                                                return 'Start time is invalid date';
                                                            }
                                                            return validateTimes(fieldValue, getValues('endTime')) || 'End time is earlier than start time';
                                                        }
                                                    },
                                                    required: "The time is required."
                                                }}
                                                name="startTime"
                                                render={({ field: { ref, onBlur, name, ...field }, fieldState }): JSX.Element => (
                                                    <TimePicker
                                                        value={dayjs(field.value as string).format('HH:mm A') ?? null}
                                                        disableOpenPicker={!isPermissionAction}
                                                        onChange={(date) => {
                                                            field.onChange(dayjs(date).format('HH:mm A'));
                                                            field.value = dayjs(date).format('HH:mm A');
                                                        }}
                                                        {...field}
                                                        slotProps={{
                                                            textField: {
                                                                onBlur,
                                                                name,
                                                                error: !!fieldState?.error,
                                                            },

                                                        }}
                                                        label="Start time"/>
                                                )}
                                                {...register("startTime")}
                                                control={control}
                                            />
                                            <FormHelperText error={!!errors.startTime}>{errors?.startTime?.message}</FormHelperText>
                                        </FormControl>
                                    </GridField>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <GridField item xs={6} className="date-time-picker">
                                        <FormControl fullWidth margin="dense" variant="outlined">
                                            <Controller
                                                rules={{
                                                    validate: {
                                                        compareDay: (fieldValue): boolean | string => {
                                                            if (!isValidDate(fieldValue)) {
                                                                return 'End date is invalid date';
                                                            }
                                                            return validateDates(getValues('startDate'), fieldValue) || 'End date is earlier than start date.';
                                                        }
                                                    },
                                                    required: "The end date is required."
                                                }}
                                                render={({ field: { ref, onBlur, name, ...field }, fieldState }): JSX.Element => (
                                                    <DatePicker
                                                        {...field}
                                                        onChange={onChangeEndDate}
                                                        inputRef={ref}
                                                        disabled={!isPermissionAction}
                                                        value={field.value ? dayjs(field.value as string) : null}
                                                        label="End date *"
                                                        slotProps={{
                                                            textField: {
                                                                onBlur,
                                                                name,
                                                                error: !!fieldState?.error,
                                                            }
                                                        }}
                                                    />
                                                )}
                                                control={control}
                                                name="endDate"
                                            />
                                            <FormHelperText error={!!errors.endDate}>{errors?.endDate?.message}</FormHelperText>
                                        </FormControl>
                                    </GridField>

                                    <GridField item xs={6} className="date-time-picker">
                                        <FormControl fullWidth margin="dense" variant="outlined">
                                            <Controller
                                                name="endTime"
                                                disabled={isAllDayChecked || !isPermissionAction}
                                                rules={{
                                                    validate: {
                                                        compareDay: (fieldValue): boolean | string => {
                                                            if (!isValidDate(fieldValue)) {
                                                                return 'End time is invalid date';
                                                            }
                                                            return validateTimes(getValues('startTime'), fieldValue) || 'End time is earlier than start time';
                                                        }
                                                    },
                                                    required: "End time is required."
                                                }}
                                                render={({ field: { ref, onBlur, name, ...field }, fieldState }): JSX.Element => (
                                                    <TimePicker
                                                        value={dayjs(field.value as string).format('HH:mm A') ?? null}
                                                        disableOpenPicker={!isPermissionAction}
                                                        onChange={(date) => {
                                                            field.onChange(dayjs(date).format('HH:mm A'));
                                                            field.value = dayjs(date).format('HH:mm A');
                                                        }}
                                                        {...field}
                                                        slotProps={{
                                                            textField: {
                                                                onBlur,
                                                                name,
                                                                error: !!fieldState?.error,
                                                            }
                                                        }}
                                                        label="End time"/>
                                                )}
                                                {...register("endTime")}
                                                control={control}
                                            />
                                            <FormHelperText error={!!errors.endTime}>{errors?.endTime?.message}</FormHelperText>
                                        </FormControl>
                                    </GridField>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <FormControlLabel control={<Checkbox value={isAllDayChecked} checked={isAllDayChecked} onChange={handleCheckedAllDay} disabled={!isPermissionAction}/>} label="All day" />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense" variant="outlined">
                                    <ContentInput>
                                        <Editor
                                            isShowToolbar={true}
                                            disabled={!isPermissionAction}
                                            value={getValues('description') || ''}
                                            onChange={onValueChangeEditor}
                                            placeholder={'Event description...'}
                                        />
                     
                                    </ContentInput>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </form>
        </>
    );
};

export default AddEventCalendarPopup;