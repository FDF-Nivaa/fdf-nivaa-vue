import format from 'date-fns/format'
import daLocale from 'date-fns/locale/da'

const globalFormattingOptions = { locale: daLocale }

/**
 * Formats the given date in a human readable way.
 * @param {Date} date
 * @param {boolean=} includeTime
 * @return {string}
 */
export function formatDate(date, includeTime) {
  let outputFormat = 'do MMMM'

  if (!isCurrentYear(date)) {
    outputFormat += ' y'
  }

  if (includeTime) {
    outputFormat += ` 'kl.' k:mm`
  }

  return format(date, outputFormat, globalFormattingOptions)
}

/**
 * Formats the given date span in a human readable way.
 * @param {Date} date1
 * @param {Date} date2
 * @param {boolean=} includeTime
 * @return {string}
 */
export function formatDateSpan(date1, date2, includeTime) {
  if (isSameDay(date1, date2)) {
    if (includeTime) {
      return `${formatDate(date1)} kl. ${format(date1, 'k:mm', globalFormattingOptions)} - ${format(date2, 'k:mm', globalFormattingOptions)}`
    }

    return formatDate(date1)
  }

  let outputFormat1 = 'do'
  let outputFormat2 = 'do MMMM'

  if (includeTime) {
    outputFormat1 = outputFormat2
  }

  if (isSameYear(date1, date2)) {
    if (!isCurrentYear(date2)) {
      outputFormat2 += ' y'
    }
  } else {
    outputFormat1 += ' y'
    outputFormat2 += ' y'
  }

  if (includeTime) {
    outputFormat1 += ` 'kl.' k:mm`
    outputFormat2 += ` 'kl.' k:mm`
  }

  const formattedDate1 = format(date1, outputFormat1, globalFormattingOptions)
  const formattedDate2 = format(date2, outputFormat2, globalFormattingOptions)

  return `${formattedDate1} - ${formattedDate2}`
}

/**
 * Returns true if the given date is in the current year
 * @param {Date} date
 * @return {boolean}
 */
export function isCurrentYear(date) {
  return date.getFullYear() === new Date().getFullYear()
}

/**
 * Returns true if the given dates are in the same year
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean}
 */
export function isSameYear(date1, date2) {
  return date1.getFullYear() === date2.getFullYear()
}

/**
 * Returns true if the given dates are in the same month
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean}
 */
export function isSameMonth(date1, date2) {
  return date1.getMonth() === date2.getMonth()
}

/**
 * Returns true if the given dates are on the same date
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean}
 */
export function isSameDate(date1, date2) {
  return date1.getDate() === date2.getDate()
}

/**
 * Returns true if the given dates are in the same day
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean}
 */
export function isSameDay(date1, date2) {
  return isSameYear(date1, date2) && isSameMonth(date1, date2) && isSameDate(date1, date2)
}

