export function formatDateWithoutYear(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      weekday: "short",
    };
  
    return date.toLocaleString("ja-JP", options);
  }
  
  export function formatYear(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}年`;
  }
  
  export function formatTime(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
  
    return date.toLocaleString("ja-JP", options).replace("午前12:00", "終日");
  }
  