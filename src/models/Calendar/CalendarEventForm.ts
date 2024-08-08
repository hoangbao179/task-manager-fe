import { Dayjs } from "dayjs";
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

    constructor(event: ICalendarEventForm) {
        this.id = event?.id;
        this.title = event?.title?.trim();
        this.startDate = event?.startDate;
        this.endDate = event?.endDate;
        this.isAllDay = event?.isAllDay;
        this.description = event?.description?.trim();
        this.user = event?.user;
        this.isSetTimeModeWeek = false;
        this.minutesOffset = event?.minutesOffset;
    }
}