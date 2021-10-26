import { format } from 'date-fns';

export function parseLocalDate(date) {
  const currentDate = new Date(date);
  
  return format(currentDate, "dd-MM-yyyy");
}