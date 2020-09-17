import queryString from "query-string"

import axios from 'axios'
import config from '~/site.config'

const apiKey = process.env.googleCalendarApiKey
export const calendars = config.googleCalendars

export function getEvents(calendarId, startDate, endDate, limit) {
  const options = {
    orderBy: 'startTime',
    singleEvents: true,
  }

  if (startDate) {
    options.timeMin = startDate.toISOString()

  }

  if (endDate) {
    options.timeMax = endDate.toISOString()

  }

  if (limit) {
    options.maxResults = limit
  }

  const headers = {}

  if (!process.client) {
    headers.Referer = req.headers.referer
  }

  return axios
    .get(buildApiUrl(calendarId, options), { headers })
    .then(response => {
      return response.data.items
    })
}

/**
 * Converts a Google Calendar date object to a JS Date instance.
 * @param {Object<string, string>} dateObject
 * @return {Date}
 */
export function googleCalendarDateObjectToDate(dateObject) {
  return new Date(dateObject.date || dateObject.dateTime)
}

/**
 * Returns true if the given Google Calendar date object contains time of day.
 * @param {Object<string, string>} dateObject
 * @return {boolean}
 */
export function googleCalendarDateObjectContainsTime(dateObject) {
  return !!dateObject.dateTime
}

/**
 * Builds and returns a API URL for Google Calendar following the spec described here:
 * https://developers.google.com/calendar/v3/reference/events/list#examples
 *
 * @param {string} calendarId
 * @param {Object<string, string|number>} options
 * @returns {string}
 */
function buildApiUrl(calendarId, options) {
  const parameters = queryString.stringify({
    ...options,
    key: apiKey,
  })

  return (
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${parameters}`
  )
}
