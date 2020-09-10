import {
  getEvents,
  calendars,
  googleCalendarDateObjectToDate,
  googleCalendarDateObjectContainsTime
} from '~/apis/google-calendar'
import Vue from 'vue'
import siteConfig from '../site.config'
import isSameDay from "date-fns/isSameDay"

const googleCalendars = siteConfig.googleCalendars

export function getCalendarConfig(id) {
  return googleCalendars.find(calendar => calendar.id === id)
}

export function sortEvents(events) {
  return events.sort((a, b) => {
    return a.parsedDates.startDate.getTime() - b.parsedDates.startDate.getTime()
  })
}

export function joinEvents(calendars) {
  return Object.values(calendars)
    .map(calendar => calendar.events)
    .reduce((a, b) => a.concat(b), [])
}

export function state() {
  return { calendars: {} }
}

export const getters = {
  getCalendarById: state => id => {
    return state.calendars[id]
  },
  getNextEvent: (state, getters) => () => {
    return getters.getAllEvents()[0]
  },
  getNextEvents: (state, getters) => () => {
    const allEvents = getters.getAllEvents()
    const firstEventStartDate = allEvents[0].parsedDates.startDate
    const eventsOnSameDate = allEvents.filter(event => isSameDay(event.parsedDates, firstEventStartDate))
    return eventsOnSameDate
  },
  getAllEvents: state => () => {
    return sortEvents(joinEvents(state.calendars))
  },
  getAllEventsForCalendar: state => id => {
    return state.calendars[id] || null
  },
  getNextEventForCalendar: state => id => {
    return state.calendars[id] && state.calendars[id].events[0] || null
  },
  isCalendarLoading: state => id => {
    return state.calendars[id] && state.calendars[id].isLoading
  }
}

export const actions = {
  async fetchEvents({ commit, state }, { calendarId, startDate, endDate, limit }) {
    if (!state.calendars[calendarId]) {
      commit('initCalendar', { calendarId, startDate, endDate })
    }
    await getEvents(calendarId, startDate, endDate, limit).then(events => {
      commit('setEvents', { calendarId, events })
    }).catch((error) => {
      commit('setError', {
        source: 'Google Calendar',
        statusCode: error.response.status,
        message: error.response.data.error.message
      }, { root: true })
    })
  },
  async fetchAll({ commit, dispatch }, {startDate, endDate, limit}) {
    return Promise.all(calendars.map(calendar => {
      dispatch('fetchEvents', { calendarId: calendar.id, startDate, endDate, limit })
    })).catch((error) => {
      commit('setError', {
        source: 'Google Calendar',
        statusCode: error.response.status,
        message: error.response.data.error.message
      }, { root: true })
    })
  },
}

export const mutations = {
  setEvents(state, { calendarId, events }) {
    const calendarWrapper = state.calendars[calendarId]
    calendarWrapper.events = events.map(event => {
      return {
        ...event,
        calendar: calendarWrapper.calendar,
        parsedDates: {
          startDate: googleCalendarDateObjectToDate(event.start),
          endDate: googleCalendarDateObjectToDate(event.end),
          displayTimeOfDay: googleCalendarDateObjectContainsTime(event.start)
        }
      }
    })
    state.calendars[calendarId].isLoading = false
  },
  initCalendar(state, { calendarId, startDate, endDate }) {
    Vue.set(
      state.calendars,
      calendarId,
      {
        calendar: getCalendarConfig(calendarId),
        events: [],
        isLoading: true,
        startDate,
        endDate,
      }
    )
  }

}
