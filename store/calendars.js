import {
  getEvents,
  calendars,
  googleCalendarDateObjectToDate,
  googleCalendarDateObjectContainsTime
} from '~/apis/google-calendar'
import Vue from 'vue'

export function state() {
  return { calendars: {} }
}

export const getters = {
  getCalendarById: state => id => {
    return state.calendars[id]
  },
  getNextEvent: state => id => {
    return state.calendars[id] && state.calendars[id].events[0] || null
  },
  isCalendarLoading: state => id => {
    return state.calendars[id] && state.calendars[id].isLoading
  }
}

export const mutations = {
  setEvents(state, { calendarId, events }) {
    state.calendars[calendarId].events = events.map(event => {
      return {
        ...event,
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
    Vue.set(state.calendars, calendarId, { startDate, endDate, events: [], isLoading: true })
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
  async fetchAll({ commit, dispatch }) {
    return Promise.all(calendars.map(calendar => {
      dispatch('fetchEvents', { calendarId: calendar.id })
    })).catch((error) => {
      commit('setError', {
        source: 'Google Calendar',
        statusCode: error.response.status,
        message: error.response.data.error.message
      }, { root: true })
    })
  },
}
