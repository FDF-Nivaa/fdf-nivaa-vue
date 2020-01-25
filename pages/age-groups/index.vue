<template>
  <article>
    <h1>Aldersgrupper</h1>
    <ul>
      <li v-for="group in ageGroups">
        <h3>
          <nuxt-link :to="'/age-groups/' + group._id">
            {{group.title}}
          </nuxt-link>
        </h3>
        <p v-if="group.intro">{{group.intro}}</p>
        <div v-else v-html="group.content"></div>
        <p v-if="group.intro && group.content"><nuxt-link :to="`/age-groups/${group._id}`">Læs mere</nuxt-link></p>
      </li>
    </ul>
  </article>
</template>

<script>
  export default {
    name: 'age-groups.index',
    computed: {
      ageGroups() {
        return this.$store.state['age-groups'].list
      }
    },
    async fetch({ store }) {
      store.dispatch('clearError')
      await store.dispatch('age-groups/fetchAll')
    },
  }
</script>
