<template>
  <article v-if="ageGroup">
    <h1 :style="{ color: ageGroup.color }">{{ ageGroup.title }}</h1>
    <AgeGroupMeta :age-group="ageGroup" />
    <div v-html="ageGroup.description"></div>
    <template v-if="ageGroup.staff">
      <h2>Dine leder</h2>
      <StaffList
        :staff="ageGroup.staff"
        :primary-staff="ageGroup.primaryStaff"
      />
    </template>
  </article>
  <LoadingAnimation v-else />
</template>

<script>
import AgeGroupMeta from '../../components/AgeGroupMeta'
import LoadingAnimation from '../../components/LoadingAnimation'
import StaffList from '../../components/StaffList'

export default {
  components: { AgeGroupMeta, LoadingAnimation, StaffList },
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
