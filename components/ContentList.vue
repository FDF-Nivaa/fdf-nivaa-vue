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

<style lang="scss" scoped>
  .content-list {
    max-width: 40em;
    list-style: none;
    padding: 0 1.75em 1em;

  }

  .content-list-item {
    position: relative;

    &:not(:last-child) {
      margin-bottom: 3em;

    }

    h2 {
      margin-bottom: .667em;

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
