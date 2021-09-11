import format from "date-fns/format";
import daLocale from "date-fns/locale/da";

const globalFormattingOptions = { locale: daLocale };

/**
 * Formats the given date in a human readable way.
 * @param {Date} date
 * @param {boolean=} includeTime
 * @return {string}
 */
export function formatDate(date, includeTime) {
  let outputFormat = "do MMMM";

  if (!isCurrentYear(date)) {
    outputFormat += " y";
  }

  if (includeTime) {
    outputFormat += ` 'kl.' k:mm`;
  }

  return format(date, outputFormat, globalFormattingOptions);
}

/**
 * Formats the given date span in a human readable way.
 * @param {Date} date1
 * @param {Date} date2
 * @param {boolean=} includeTime
 * @return {string}
 */
export function formatDateSpan(date1, date2, includeTime) {
  const dates = formatDateSpanAsObject(date1, date2, includeTime);
  const output = [dates.start];

  if (dates.end) {
    output.push("-");
    output.push(dates.end);
  }

  return output.join(" ");
}

export function formatDateSpanAsObject(startDate, endDate, includeTime) {
  let outputFormatStart = "do";
  let outputFormatEnd = "do MMMM";

  if (includeTime) {
    outputFormatStart = outputFormatEnd;
  }

  if (isSameYear(startDate, endDate)) {
    if (!isCurrentYear(endDate)) {
      if (isSameDay(startDate, endDate)) {
        outputFormatStart += " y";
      } else {
        outputFormatEnd += " y";
      }
    }
  } else {
    outputFormatStart += " y";
    outputFormatEnd += " y";
  }

  if (includeTime) {
    outputFormatStart += ` 'kl.' k:mm`;
    outputFormatEnd += ` 'kl.' k:mm`;
  }

  let startDateFormatted = [
    format(startDate, outputFormatStart, globalFormattingOptions),
  ];
  let endDateFormatted = [];

  if (isSameDay(startDate, endDate)) {
    endDateFormatted.push(format(endDate, "k:mm", globalFormattingOptions));
  } else {
    endDateFormatted.push(
      format(endDate, outputFormatEnd, globalFormattingOptions)
    );
  }

  return {
    start: startDateFormatted.join(" "),
    end: endDateFormatted.join(" "),
  };
}

/**
 * Returns true if the given date is in the current year
 * @param {Date} date
 * @return {boolean}
 */
export function isCurrentYear(date) {
  return date.getFullYear() === new Date().getFullYear();
}

/**
 * Returns true if the given dates are in the same year
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean}
 */
export function isSameYear(date1, date2) {
  return date1.getFullYear() === date2.getFullYear();
}

/**
 * Returns true if the given dates are in the same month
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean}
 */
export function isSameMonth(date1, date2) {
  return date1.getMonth() === date2.getMonth();
}

/**
 * Returns true if the given dates are on the same date
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean}
 */
export function isSameDate(date1, date2) {
  return date1.getDate() === date2.getDate();
}

/**
 * Returns true if the given dates are in the same day
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean}
 */
export function isSameDay(date1, date2) {
  return (
    isSameYear(date1, date2) &&
    isSameMonth(date1, date2) &&
    isSameDate(date1, date2)
  );
}
