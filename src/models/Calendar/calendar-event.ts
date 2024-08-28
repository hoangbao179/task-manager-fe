import dayjs, { Dayjs } from "dayjs";
import { IUser } from "../User/IUser";
import { E_FormatDate } from "../../enums/E_FormatDate";

export interface ICalendarEvent {
    id?: string;
    title?: string;
    startDate: Date | string;
    endDate: Date | string;
    isAllDay?: boolean;
    description?: string;
    user?: IUser
    startTime?: Date | string | Dayjs;
    endTime?: Date | string | Dayjs;
    startTimeString?: string;
    endDateTimeString?: string;
}

export interface IRangeCalendarView {
    startDate: string;
    endDate: string;
    minutesOffset: number;
}

export interface IDetailCalendarView {
    id: string;
    minutesOffset: number;
}

export class CalendarEvent implements ICalendarEvent {
    id?: string;
    title?: string;
    startDate: Date | string;
    endDate: Date | string;
    isAllDay?: boolean;
    description?: string;
    user?: IUser
    isSetTimeModeWeek?: boolean;
    startTime?: Date | string | Dayjs;
    endTime?: Date | string | Dayjs;
    startTimeString?: string;
    endDateTimeString?: string;

    constructor(event: ICalendarEvent) {
        this.id = event?.id;
        this.title = event?.title?.trim();
        this.startDate = event?.startDate;
        this.endDate = event?.endDate;
        this.isAllDay = event?.isAllDay;
        this.description = event?.description?.trim();
        this.user = event?.user;
        this.isSetTimeModeWeek = false;
        this.startTime = event?.startTime;
        this.endTime = event?.endTime;
        this.startTimeString = dayjs.isDayjs(event?.startTime) ? dayjs(event?.startTime).format(E_FormatDate.TimeEvent) : dayjs(new Date(`${event.startDate} ${event?.startTime}`)).format(E_FormatDate.TimeEvent);
        this.endDateTimeString = dayjs.isDayjs(event?.endTime) ? dayjs(event?.endTime).format(E_FormatDate.TimeEvent) : dayjs(new Date(`${event.endDate} ${event?.endTime}`)).format(E_FormatDate.TimeEvent);
    }
}