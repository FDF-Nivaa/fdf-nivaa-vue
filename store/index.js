import {cockpit as cockpitConfig} from '~/cockpit-config'

const buildCockpitUrl = (collection) => {
  return `${cockpitConfig.url}/api/collections/get/${collection}?token=${cockpitConfig.token}`
}

export const state = () => ({
  events: [],
  repeatedEvents: [],
  error: { message: '', statusCode: 0 }
})

export const mutations = {
  setEvents(state, events) {
    state.events = events
  },
  setRepeatedEvents(state, repeatedEvents) {
    state.repeatedEvents = repeatedEvents
  },
  setError(state, error) {
    state.error = error
  }
}

export const actions = {
  clearError({ commit }) {
    commit('setError', { statusCode: 0, messsage: '' })
  },
  async fetchEvents({ commit }) {
    await this.$axios
      .get(buildCockpitUrl('events'))
      .then(response => {
        if (response.status === 200) {
          commit('setEvents', response.data.entries)
        } else {
          commit('setError', { statusCode: response.status, message: 'Ingen arrangementer fundet' })
        }
      }).catch((error) => {
        commit('setError', { statusCode: error.response.status, message: error.response.data.error })
      })
  },
  async fetchRepeatedEvents({ commit }) {
    await this.$axios
      .get(buildCockpitUrl('repeatedEvents'))
      .then(response => {
        if (response.status === 200) {
          commit('setRepeatedEvents', response.data.entries)
        } else {
          commit('setError', { statusCode: response.status, message: 'Ingen arrangementer fundet' })
        }
      }).catch(() => {
        commit('setError', { statusCode: error.response.status, message: error.response.data.error })
      })
  }
}