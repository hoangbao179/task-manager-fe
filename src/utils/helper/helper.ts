import dayjs, { Dayjs } from "dayjs";
import moment from "moment";

export const getPathFromUrl = (url): string => {
    var urlObject = new URL(url);
    return urlObject.pathname;
};

export const convertTimeFormServer = (time: string | Date): Date => {
    return moment.utc(time).toDate();
};

export const combineDateTime = (dateInput: string | Date, timeInput: string | Date | Dayjs, allDay?: boolean): Dayjs | string => {
    const date = new Date(dateInput);
    if (allDay) {
        date.setDate(date.getDate() + 1);
    }
    const time = timeInput?.toString() || '00:00:00';

    // Split the time string to get individual components
    if (time) {
        let timeParts = time.split(':');
        let hours = parseInt(timeParts[0], 10);
        let minutes = parseInt(timeParts[1], 10);
        let seconds = parseInt(timeParts[2], 10);
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds);
    }

    const dateString = dateInput + 'T' + timeInput;

    return dayjs(dateString);
};

export const combineDateTimeUTC = (dateInput: string | Date, timeInput?: string | Date | Dayjs, allDay?: boolean): Dayjs => {
    const time = timeInput?.toString() || '00:00:00';
    const date = allDay ? new Date(new Date(dateInput + ' ' + time).toLocaleString('en', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }))
        : new Date(dateInput + ' ' + time + ' GMT+0');
    return dayjs(date);
};


export const generateUuidV4 = (): string => {
    return crypto.randomUUID();
};


export const FormValidateConfig = {
    Pattern: {
        Email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        Phone: /(7|8|9)\d{9}/,
        Url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    }
}; 