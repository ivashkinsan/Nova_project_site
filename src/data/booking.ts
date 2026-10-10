/** Booking form configuration — used by Booking.tsx */

export interface EventType {
  value: string;
  label: string;
}

export const eventTypes: EventType[] = [
  { value: 'corporate', label: 'Корпоратив' },
  { value: 'banquet', label: 'Банкет' },
  { value: 'wedding', label: 'Свадьба' },
  { value: 'reception', label: 'Закрытый приём' },
  { value: 'festival', label: 'Фестиваль' },
  { value: 'presentation', label: 'Презентация / выставка' },
  { value: 'other', label: 'Другое' },
];

export interface FormatOption {
  value: string;
  label: string;
}

export const formatOptions: FormatOption[] = [
  { value: 'main', label: 'Основная программа (2 отделения по 30 минут)' },
  { value: 'background', label: 'Фоновый сет (до 60 минут)' },
];

export interface BookingFormFields {
  eventType: string;
  date: string;
  location: string;
  format: string;
  email: string;
  phone: string;
  message: string;
}

export const initialBookingForm: BookingFormFields = {
  eventType: '',
  date: '',
  location: '',
  format: 'main',
  email: '',
  phone: '',
  message: '',
};
