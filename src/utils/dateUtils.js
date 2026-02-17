// Format ISO datetime string to IST
export const formatISTDateTime = (isoString) => {
  if (!isoString) return 'Input is empty';

  const parsedDate = Date.parse(isoString);
  if (isNaN(parsedDate)) return `Invalid Date: ${isoString}`;

  try {
    const date = new Date(parsedDate);

    // Format options for IST
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    };

    return new Intl.DateTimeFormat('en-IN', options).format(date);
  } catch (e) {
    console.error('Date formatting error:', e);
    return 'Error Formatting Date';
  }
};

// Format to just date (DD-MMM-YYYY)
export const formatISTDate = (isoString) => {
  if (!isoString) return 'Input is empty';

  const parsedDate = Date.parse(isoString);
  if (isNaN(parsedDate)) return `Invalid Date: ${isoString}`;

  try {
    const date = new Date(parsedDate);
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      timeZone: 'Asia/Kolkata',
    };

    return new Intl.DateTimeFormat('en-IN', options).format(date);
  } catch (e) {
    console.error('Date formatting error:', e);
    return 'Error Formatting Date';
  }
};

// Format to just time (HH:MM:SS AM/PM)
export const formatISTTime = (isoString) => {
  if (!isoString) return 'Input is empty';

  const parsedDate = Date.parse(isoString);
  if (isNaN(parsedDate)) return `Invalid Time: ${isoString}`;

  try {
    const date = new Date(parsedDate);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    };

    return new Intl.DateTimeFormat('en-IN', options).format(date);
  } catch (e) {
    console.error('Date formatting error:', e);
    return 'Error Formatting Time';
  }
};
