<template>
  <nav class="sub-navigation">
    <div class="sub-navigation-inner">
      <ul class="sub-navigation-list">
        <li
          class="sub-navigation-list-item"
          v-for="menuItem in menuItems"
          :key="menuItem.url"
        >
          <nuxt-link
            class="sub-navigation-link"
            :class="{'is-top-level': menuItem.isTopLevel}"
            :to="menuItem.url"
          >
            <component :is="menuItem.icon" />
            <span class="sub-navigation-link-text">
              {{menuItem.title}}
            </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {CalendarIcon, CompassIcon, MessageSquareIcon, RepeatIcon, UsersIcon} from 'vue-feather-icons'

  export default {
    components: { CalendarIcon, CompassIcon, MessageSquareIcon, RepeatIcon, UsersIcon },
    props: {
      menuItems: {
        type: Array,
        required: true
      }
    },
  }
</script>

<style
  lang="scss"
  scoped
>
  $borderWidth: .1em;

  .sub-navigation {
    font-size: .8125em;
    margin-bottom: 1em;
  }

  .sub-navigation-inner {
    display: flex;
    flex-direction: row;
    margin: auto;
  }

  .sub-navigation-list {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    padding: 0;
    list-style: none;
    align-items: stretch;
  }

  .sub-navigation-list-item {
    display: flex;
    flex: 1 auto 0;
    margin: 0;

    &:first-child .sub-navigation-link {
      border-top-left-radius: $defaultBorderRadius;
      border-bottom-left-radius: $defaultBorderRadius;
    }

    &:last-child .sub-navigation-link {
      border-top-right-radius: $defaultBorderRadius;
      border-bottom-right-radius: $defaultBorderRadius;
      border-right-width: $borderWidth;
    }
  }

  .sub-navigation-link {
    position: relative;
    display: flex;
    vertical-align: middle;
    padding: .5em .66em;
    text-decoration: none;
    margin: 0;
    flex-direction: row;
    align-items: center;
    text-align: center;
    border: $borderWidth solid currentColor;
    border-right-width: 0;
    color: $duskBlue;
    transition: all .2s ease-out;

    &.nuxt-link-exact-active,
    &:not(.is-top-level).nuxt-link-active {
      background: $duskBlue;
      border-color: $duskBlue;
      color: $backgroundColor;

      @media (hover: hover) {
        &:hover {
          background: mix($duskBlue, $backgroundColor, 90%);
        }
      }
    }

    @media (hover: hover) {
      &:hover {
        background: mix($duskBlue, $backgroundColor, 10%);
      }
    }
  }

  .sub-navigation-link-icon {
    display: block;
    width: 1em;
    height: 1em;
  }

  .sub-navigation-link-text {
    display: block;
    margin-left: .33em;
  }

  .sub-navigation-logo-link {
    padding: 0;
    flex-grow: 1;
  }
</style>
