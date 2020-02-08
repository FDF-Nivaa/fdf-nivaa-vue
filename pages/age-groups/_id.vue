<template>
  <article v-if="ageGroup">
    <h1>{{ageGroup.title}}</h1>
    <div
      v-html="ageGroup.description"
    ></div>
    <div class="staff-wrapper">
      <div class="staff">
        <h2>Ansvarlig leder</h2>
        <StaffCard :staff-id="ageGroup.primaryStaff._id" />
      </div>
      <div class="staff">
        <h2>Andre ledere</h2>
        <StaffCard
          v-for="person in ageGroup.staff"
          :staff-id="person._id"
          :key="person._id"
        />
      </div>
    </div>
  </article>
  <LoadingAnimation v-else />
</template>

<script>
  import LoadingAnimation from "../../components/LoadingAnimation"
  import StaffCard from "../../components/StaffCard"

  export default {
    components: { LoadingAnimation, StaffCard },
    data(params) {
      return { id: params.id }
    },
    computed: {
      ageGroup() {
        return this.$store.getters['age-groups/getById'](this.$route.params.id)
      }
    },
    async fetch({ params, store }) {
      store.dispatch('clearError')
      await store.dispatch('age-groups/fetchById', params.id)
    },
  }
</script>
<style
  lang="scss"
  scoped
>

  .staff-wrapper {
    margin-top: 2em;
    display: flex;
  }

  .staff {
    position: relative;
    flex: 1 1 15em;

    h2 {
      margin-top: 0;
    }

    &:first-child {
      flex-grow: 0;
      margin-right: 2.5em;

      &:after {
        content: "";
        position: absolute;
        display: block;
        height: 4em;
        bottom: 1em;
        right: 0;
        border-right: 1px solid mix($duskBlue, transparent);
      }
    }
  }
</style>
