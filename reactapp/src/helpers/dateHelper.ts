class DateHelper {
  // Gets the current datetime
  static getCurrentDateTime = (): Date => {
    return new Date();
  };

  // Convert datetime to ISO string
  static toISOString = (dateTime: string | Date): string => {
    const isoString: string = new Date(dateTime).toISOString();
    const dotIndex: number = isoString.indexOf('.');
    const dateTimeString: string = isoString.slice(0, dotIndex);
    return dateTimeString;
  };

  // Formats a date to YYYY-MM-DD
  static toDateString = (dateTimeString: string | Date): string => {
    const dateTime = new Date(dateTimeString);

    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // Formats a date to YYYY-MM-DD
  static toTimeString = (dateTimeString: string | Date): string => {
    const dateTime = new Date(dateTimeString);

    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  // Formats a date to YYYY-MM-DD HH:mm:ss
  static toDateTimeString = (dateTimeString: string | Date): string => {
    const dateString = this.toDateString(dateTimeString);
    const timeString = this.toTimeString(dateTimeString);

    return `${dateString} ${timeString}`;
  };

  // Formats a date to locale date string
  static toMessageSendDateTimeString = (isoString: string | Date): string => {
    const isoDate: Date = new Date(isoString);
    const currentTime: Date = this.getCurrentDateTime();

    const dateDifference = currentTime.getDate() - isoDate.getDate();
    let options: Intl.DateTimeFormatOptions;

    if (dateDifference === 0) {
      options = { hour: 'numeric', minute: 'numeric', hour12: true };
      return isoDate.toLocaleTimeString('en-US', options);
    }

    options = { month: 'short', day: 'numeric' };
    return isoDate.toLocaleDateString('en-US', options);
  };
}

export default DateHelper;
