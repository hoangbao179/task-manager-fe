import dayjs, { Dayjs } from "dayjs";
import { IUser } from "../User/IUser";


export interface ICalendarEventFormPayLoad {
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
    minutesOffset?: number;
}

export interface ICalendarEventForm {
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
    minutesOffset?: number;
}

export class CalendarEventForm implements ICalendarEventForm {
    id?: string;
    title?: string;
    startDate: Date | string;
    endDate: Date | string;
    isAllDay?: boolean;
    description?: string;
    user?: IUser
    isSetTimeModeWeek?: boolean;
    minutesOffset?: number;
    startTime?: Date | string | Dayjs;
    endTime?: Date | string | Dayjs;

    constructor(event: ICalendarEventForm) {
        this.id = event?.id;
        this.title = event?.title?.trim();
        this.startDate = event.startDate ? dayjs(event.startDate).format('YYYY-MM-DD') : null;
        this.endDate = event.endDate ? dayjs(event.endDate).format('YYYY-MM-DD') : null;
        this.isAllDay = event?.isAllDay;
        this.description = event?.description?.trim();
        this.user = event?.user;
        this.isSetTimeModeWeek = false;
        this.minutesOffset = event?.minutesOffset;
        this.startTime = event.startTime ? dayjs(event.startTime).format('HH:mm:ss') : null;
        this.endTime = event.endTime ? dayjs(event.endTime).format('HH:mm:ss') : null;
        this.minutesOffset = event?.isAllDay ? 0 : (new Date()).getTimezoneOffset();
    }
}