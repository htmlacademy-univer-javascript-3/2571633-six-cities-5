type FormatType = 'fullDate' | 'monthWithYear'
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function dateFormatter(dateStr: string, format?: FormatType): string {
  const date = new Date(dateStr);
  if(!date?.getDate()) {
    return '';
  }
  if(format === 'fullDate') {
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${date.getFullYear()}-${month }-${day}`;
  } else {
    return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  }

}
