import axios from 'axios';
import { ICalendarEvent } from '../../models/Calendar/CalendarEvent';
import { IPaginator, IResponseData } from '../../models/IResponseData';
import { CalendarEventForm } from '../../models/Calendar/CalendarEventForm';

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}`;
const API_URL = `${BASE_API}/calendar`;

export class CalendarEventService {
  static async createCalendarEvent(eventData: CalendarEventForm): Promise<IResponseData<ICalendarEvent>> {
    const response = await axios.post<IResponseData<ICalendarEvent>>(API_URL, eventData);
    return response.data;
  }

  static async getListCalendarEvents(page: number = 1, pageSize: number = 10): Promise<IResponseData<IPaginator<ICalendarEvent>>> {
    const response = await axios.get<IResponseData<IPaginator<ICalendarEvent>>>(`${API_URL}?page=${page}&pageSize=${pageSize}`);
    return response.data;
  }

  static async getCalendarEventById(eventId: string): Promise<IResponseData<ICalendarEvent>> {
    const response = await axios.get<IResponseData<ICalendarEvent>>(`${API_URL}/${eventId}`);
    return response.data;
  }

  static async update( updateData: Partial<ICalendarEvent>, eventId?: string): Promise<IResponseData<ICalendarEvent>> {
    const response = await axios.put<IResponseData<ICalendarEvent>>(`${API_URL}/${eventId}`, updateData);
    return response.data;
  }

  static async delete(eventId: string): Promise<IResponseData<null>> {
    const response = await axios.delete<IResponseData<null>>(`${API_URL}/${eventId}`);
    return response.data;
  }
}