import { createStore } from './store-factory'

const store = createStore('posts', 'opslag', 'opslag')

store.mutations.setList = (state, list) => {
  state.list = list.sort((a, b) => b._created - a._created)
}

export default store
