const axios = require('axios')

import config from '~/site.config'

export function createCollectionUrl(collection) {
  return `${config.cockpitUrl}/api/collections/get/${collection}?token=${process.env.cockpitToken}`
}

export default class CockpitApi {
  #axiosInstance = null

  get(collection, config) {
    return this.axiosInstance.get(createCollectionUrl(collection), config)
  }

  post(collection, data, config) {
    return this.axiosInstance.post(
      createCollectionUrl(collection),
      data,
      config
    )
  }

  get axiosInstance() {
    if (!this.#axiosInstance) {
      this.#axiosInstance = axios.create({
        baseURL: this.baseUrl,
      })
    }

    return this.#axiosInstance
  }
}
