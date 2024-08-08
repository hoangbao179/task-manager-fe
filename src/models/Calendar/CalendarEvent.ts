import { Dayjs } from "dayjs";
import { IUser } from "../User/IUser";

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
    }
}