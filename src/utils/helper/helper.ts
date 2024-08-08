import dayjs, { Dayjs } from "dayjs";
import moment from "moment";

export function hexToRGBA(hex: string, alpha?: string | number): string {
    if (!hex) {
        return '';
    }

    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const rgba = `rgba(${r}, ${g}, ${b}, ${alpha ?? 1})`;
    return rgba;
}

export function darkenColor(inputColor?: string): string {
    if (!inputColor) {
        return;
    }

    if (!inputColor.includes('#')) {
        inputColor = `#${inputColor}`;
    }

    const isHexColor = /^#[0-9A-Fa-f]{6}$/i.test(inputColor);

    if (!isHexColor) {
        throw new Error('Invalid HEX color format. Please use format like #RRGGBB');
    }

    const r = parseInt(inputColor.slice(1, 3), 16);
    const g = parseInt(inputColor.slice(3, 5), 16);
    const b = parseInt(inputColor.slice(5, 7), 16);

    const darkenAmount = 0.3;
    const newR = Math.round(r * (1 - darkenAmount));
    const newG = Math.round(g * (1 - darkenAmount));
    const newB = Math.round(b * (1 - darkenAmount));

    const newColor = `#${newR.toString(16)}${newG.toString(16)}${newB.toString(16)}`;

    return newColor;
}

export function isExistRoles(list1: string[], list2: string[]): boolean {
    if ((list1?.length == 0 || list2?.length == 0)) {
        return false;
    }
    return list1?.some(item => list2?.includes(item));
}

type ObjectWithField = { [key: string]: any };

export function sortByField<T extends ObjectWithField>(array: T[], fieldName: keyof T, order: 'asc' | 'desc'): T[] {
    if (array.length === 0) {
        return array;
    }

    if (!array.every(item => item.hasOwnProperty(fieldName))) {
        throw new Error(`Field '${fieldName as string}' does not exist in every object`);
    }

    const compareFunction = (a: T, b: T): number => {
        const aValue = a[fieldName];
        const bValue = b[fieldName];

        if (aValue < bValue) {
            return order === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
            return order === 'asc' ? 1 : -1;
        } else {
            return 0;
        }
    };

    return array.sort(compareFunction);
}

export const getPathFromUrl = (url): string => {
    var urlObject = new URL(url);
    return urlObject.pathname;
};

export const convertTimeFormServer = (time: string | Date): Date => {
    return moment.utc(time).toDate();
};

export const decodeUrl = (url: string): string => {
    try {
        return decodeURIComponent(url);
    } catch (error) {
        // If decoding fails, return the original URL
        console.error("Error decoding URL:", error);
        return url;
    }
};

export const decodeUrlGravatarAuth0 = (url: string): string => {
    try {
        const decodedUrl = decodeUrl(url);
        const regex = /(?:https:\/\/[^\/]+)?(https:\/\/cdn\.auth0\.com\/avatars\/.+\.png)/;
        const match = decodedUrl.match(regex);

        if (match) {
            const extractedUrl = match[0];
            return extractedUrl;
        }
        return "";
    } catch (error) {
        console.error("Error decoding URL:", error);
        return "";
    }
};


export const insertBeforeDotAfterHttp = (originalUrl: string, insertionPart: string): string => {
    if (originalUrl.startsWith("https://")) {
        return `https://${insertionPart}/${originalUrl.substring(8)}?ssl=1`;
    }
    return originalUrl;
};

export const convertSpaceNumber = (value: number | string): string => {
    if (value.toString().includes('%') || value.toString().includes('px') || value === 'auto') {
        return value.toString();
    }

    return `${value}px`;
};

export const convertSpaceString = (value: string | number): number | undefined => {
    if (typeof value === 'number') {
        return value;
    }

    if (typeof value === 'string') {
        if (value.endsWith('px')) {
            return parseInt(value.slice(0, -2), 10);
        }
    }

    return undefined;
};

export const checkStringStartsWith = (originalString: string, searchString: string): boolean => {
    return originalString?.includes(searchString) || false;
};

export const getRandomNumber = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


export const deviceDetector = (): 'Mobile' | 'Desktop' => {
    let deviceType: 'Mobile' | 'Desktop';
    let hasTouchScreen = false;

    const navigatorObject: any = navigator;

    if ("maxTouchPoints" in navigatorObject) {
        hasTouchScreen = navigatorObject.maxTouchPoints > 0;
    }
    else if ("msMaxTouchPoints" in navigatorObject) {
        hasTouchScreen = navigatorObject.msMaxTouchPoints > 0;
    }
    else {
        const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        }
        else if ("orientation" in window) {
            hasTouchScreen = true; // deprecated, but good fallback
        }
        else {
            // Only as a last resort, fall back to user agent sniffing
            let UA = navigator.userAgent;
            hasTouchScreen =
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
        }
    }

    if (hasTouchScreen) {
        deviceType = "Mobile";
    }
    else {
        deviceType = "Desktop";
    }

    return deviceType;
};



export const getEnumName = (enumObj: any, value: string): string | undefined => {
    const values = Object.values(enumObj);
    const index = values.indexOf(value);

    if (index !== -1) {
        return Object.keys(enumObj)[index];
    }

    return undefined;
};

export const convertEnumValueToLabel = (enumValue: string): string => {
    return enumValue
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .split(' ')
        .map(word => (word.trim().toUpperCase() === 'AND') ? word.toLowerCase() : capitalizeFirstLetter(word))
        .join(' ');
};

export const capitalizeFirstLetter = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1)?.toLowerCase();
};
export const convertPlantTextFromInnerHTML = (innerHTML: string): string => {
    const element = document.createElement('div');
    element.innerHTML = innerHTML;
    return element.textContent;
};


export const getFileTypeFormFileInput = (inputFile: File): string => {
    if (inputFile.name.includes('.log')) {
        return 'log';
    }

    if (inputFile.name.includes('.psd')) {
        return 'psd';
    }

    return inputFile.type;
};


export const getFileTypeFormFileName = (fileName: string): string => {
    if (fileName) {
        const splitName = fileName?.split('.');
        return splitName[splitName.length - 1];
    }
    return '';
};

export const getFileNameWithoutFileType = (fileName: string): string => {
    const splitName = fileName?.split('.');
    if (splitName?.length === 1) {
        return splitName[0];
    }
    return splitName?.filter((_, index) => index < splitName.length - 1).join('');
};

export const getFormatObjectSortField = (field: string, sortType: any): string => {
    return `${field}:${sortType}`;
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


export const invertHex = (backgroundColor: string): string => {
    if (!backgroundColor || backgroundColor === 'ffffff') {
        return '#223354';
    }
    return '#ffffff';
};

export const generateUuidV4 = (): string => {
    return crypto.randomUUID();
};

export const generateFolderName = (mainFolder: string, subFolder?: string): string => {
    if (subFolder) {
        return `${mainFolder}/${subFolder}`;
    }

    return mainFolder;
};

type FieldType = any | undefined;
type ObjectType<T extends string> = {
    [key in T]?: FieldType;
};
type ResultType<T extends string> = { [K in T]?: FieldType[] };
/**
 * Convert array objects to object array
 *
 * @param {ObjectType[]} arr - array object to convert.
 * @returns {ResultType} object contains arrays of values ​​corresponding to each key.
 * 
 * Ex: [{a: 1, b: 2}, {a: 2, b: 3}]; --> {a: [1, 2], b: [2, 3]}
 */
export const transformArray = <T extends string>(arr: ObjectType<T>[]): ResultType<T> => {
    return arr.reduce((acc: ResultType<T>, obj) => {
        for (let key in obj) {
            if (acc[key]) {
                acc[key].push(obj[key]);
            } else {
                acc[key] = [obj[key]];
            }
        }
        return acc;
    }, {} as ResultType<T>);
};
export const FormValidateConfig = {
    Pattern: {
        Email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        Phone: /(7|8|9)\d{9}/,
        Url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    }
}; 