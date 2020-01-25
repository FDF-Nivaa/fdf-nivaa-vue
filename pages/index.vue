<template>
  <article>
    <h1>Velkommen til FDF Nivå</h1>
    <p>FDF er en masse sjov og ballade: Bål, udfordring, fantasi, løb, leg, fællesskab, ildaktiviter, overskridelse af
      grænser, weekendture og gode kammerater er præcis hvad FDF handler om!</p>
    <p>Vi holder til i
      <a href="https://www.google.dk/maps/dir/''/Lerhytten,+Niv%C3%A5vej+2,+2990+Niv%C3%A5/@55.9356791,12.4392635,12z/">Lerhytten,
        Nivåvej 2, 2990 Nivå</a> — lige ved stationen. Her har vi masser af natur og plads til hygge og udfordring.</p>
    <p><small><strong>FDF Nivå</strong> hed tidligere <strong>FDF Karlebo</strong>. Vi skiftede navn i august 2017, da
      det gamle navn skabte forvirring i forhold til vores fysiske placering.</small></p>
    <aside>
      <h1>Det skal vi næste gang</h1>
      <NextCalendarEvents />
      <p><nuxt-link to="/calendar">Se mere i kalenderen</nuxt-link></p>
    </aside>
  </article>
</template>

<script>
  import NextCalendarEvents from "../components/NextCalendarEvents"

  export default {
    name: 'index',
    components: { NextCalendarEvents },
    mounted() {
      this.$store.dispatch('clearError')
    },
  }
</script>

<style scoped>
  aside {
    margin-top: 3em;
  }
</style>
