<template>
  <article v-if="ageGroup">
    <h1 :style="{ color: ageGroup.color }">{{ ageGroup.title }}</h1>
    <div v-html="ageGroup.description"></div>
    <h2>Dine leder</h2>
    <StaffList
      :staff="ageGroup.staff || []"
      :primary-staff="ageGroup.primaryStaff"
    />
  </article>
  <LoadingAnimation v-else />
</template>

<script>
import LoadingAnimation from '../../components/LoadingAnimation'
import StaffList from '../../components/StaffList'

export default {
  components: { LoadingAnimation, StaffList },
  data(params) {
    return { id: params.id }
  },
  async fetch({ params, store }) {
    store.dispatch('clearError')
    await store.dispatch('age-groups/fetchById', params.id)
  },
  computed: {
    ageGroup() {
      return this.$store.getters['age-groups/getById'](this.$route.params.id)
    },
  },
}
</script>
