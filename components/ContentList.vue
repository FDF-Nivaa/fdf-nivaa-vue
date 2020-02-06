<template>
  <ul class="content-list">
    <li
      v-for="item in items"
      class="content-list-item"
      :key="item._id"
    >
      <slot :item="item" />
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'ContentList',
    props: {
      items: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .content-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    grid-gap: 1em 3em;
    list-style: none;
    padding: 0 1.75em 1em;

    @media (max-width: 30rem) {
      grid-template-columns: calc(100vw - 6em);
    }
  }

  .content-list-item {
    position: relative;

    h2 {
      margin: 0 0 .667em;

      > a {
        text-decoration: none;
      }

    }

    &:after {
      content: "";
      position: absolute;
      display: block;
      height: .5em;
      width: .5em;
      background: $duskBlue;
      top: .5em;
      left: -1em;
      opacity: .5;
      transform: translateX(-50%) rotate(-45deg) skew(18deg, 18deg);
    }
  }
</style>
