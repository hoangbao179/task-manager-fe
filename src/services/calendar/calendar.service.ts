import { ICalendarEvent } from '../../models/Calendar/calendar-event';
import { IPaginator, IResponseData } from '../../models/IResponseData';
import { CalendarEventForm } from '../../models/Calendar/calendar-event.form';
import { ICalendarEventRequest } from '../../models/Calendar/calendar-event-range';
import { axiosRequest } from '../../utils/configs/axios.config';

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}`;
const API_URL = `${BASE_API}/calendar-events`;

const createCalendarEvent = (eventData: CalendarEventForm): Promise<IResponseData<ICalendarEvent>> => {
  return axiosRequest.post<any, IResponseData<ICalendarEvent>>(`${API_URL}`, eventData);
};

const getListCalendarEvents = (page: number = 1, pageSize: number = 10): Promise<IResponseData<IPaginator<ICalendarEvent>>> => {
  return axiosRequest.get<any, IResponseData<IPaginator<ICalendarEvent>>>(`${API_URL}?page=${page}&pageSize=${pageSize}`);
};

const getCalendarEventById = (eventId: string): Promise<IResponseData<ICalendarEvent>> => {
  return axiosRequest.get<any, IResponseData<ICalendarEvent>>(`${API_URL}/${eventId}`);
};

const update = (updateData: Partial<ICalendarEvent>, eventId: string): Promise<IResponseData<ICalendarEvent>> => {
  return axiosRequest.put<any, IResponseData<ICalendarEvent>>(`${API_URL}/${eventId}`, updateData);
};

const deleteEvent = (eventId: string): Promise<IResponseData<null>> => {
  return axiosRequest.delete<any, IResponseData<null>>(`${API_URL}/${eventId}`);
};

const getFilteredCalendarEvents = (request: ICalendarEventRequest): Promise<IResponseData<ICalendarEvent[]>> => {
  return axiosRequest.post<any, IResponseData<ICalendarEvent[]>>(`${API_URL}/query`, request);
};

export const CalendarEventService = {
  createCalendarEvent,
  getListCalendarEvents,
  getCalendarEventById,
  update,
  deleteEvent,
  getFilteredCalendarEvents,
};
