/**
 * Formats the given date in a human readable way.
 * @param {Date} date
 * @param {boolean=} includeTime
 * @return {string}
 */
export function formatDate(date, includeTime) {
  const formattedDate = date.toLocaleDateString(
    'da',
    {
      dateStyle: 'long',
    }
  )

  if (includeTime) {
    return formattedDate + ' kl. ' + date.toLocaleDateString(
      'da',
      {
        timeStyle: 'short'
      }
    )
  }

  return formattedDate

}
