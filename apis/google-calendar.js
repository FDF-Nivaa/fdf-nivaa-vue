import queryString from "query-string"

import axios from 'axios'
import config from '../google-calendar-config'

const apiKey = config.key
const calendars = config.calendars

function getEvents(calendarId, startDate, endDate, limit) {
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

  return axios
    .get(buildApiUrl(calendarId, options))
    .then(response => {
      return response.data.items
    })
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

export default {
  getEvents, calendars
}
