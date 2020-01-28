<template>
  <nav class="main-navigation">
    <div class="main-navigation-inner">
      <nuxt-link
        class="main-navigation-logo-link"
        to="/"
      >
        <img
          alt="FDF Nivå"
          class="main-navigation-logo"
          src="/logo.svg"
        >
      </nuxt-link>
      <ul class="main-navigation-list">
        <li class="main-navigation-list-item" v-for="menuItem in menuItems" :key="menuItem.url">
          <nuxt-link
            class="main-navigation-link"
            :to="menuItem.url"
          >
            <component :is="menuItem.icon"/>
            <span class="main-navigation-link-text">
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
    data() {
      return {
        menuItems: [
          {
            title: 'Opslag',
            url: '/posts',
            icon: MessageSquareIcon
          },
          {
            title: 'Aldersgrupper',
            url: '/age-groups',
            icon: UsersIcon
          },
          {
            title: 'Kalender',
            url: '/calendar',
            icon: CalendarIcon
          },
          {
            title: 'Mød lederne',
            url: '/staff',
            icon: UsersIcon
          },
        ]
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .main-navigation {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background: white;
    z-index: 1;
  }

  .main-navigation-inner {
    display: flex;
    flex-direction: row;
    max-width: $maxContentWidth;
    margin: auto;
    padding: 0 1.25em;
  }

  .main-navigation-list {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    list-style: none;
    align-items: stretch;
  }

  .main-navigation-list-item {
    display: flex;
    flex: 1 auto 0;
    margin: 0;
  }

  .main-navigation-link {
    --underline-scale: 0;

    position: relative;
    display: flex;
    vertical-align: middle;
    padding: 1em .5em;
    text-decoration: none;
    margin: 0;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &:after {
      content: '';
      position: absolute;
      display: block;
      left: 25%;
      bottom: .5em;
      width: 50%;
      border-top: 0.125em solid $duskBlue;
      transition: all 0.2s ease-out;
      transform: scaleX(var(--underline-scale));
    }

    &.nuxt-link-active {
      --underline-scale: 1;
    }

    @media (hover: hover) {
      &:hover {
        --underline-scale: 0.5;
      }
    }
  }

  .main-navigation-link-icon {
    display: block;
    font-size: 1.25em;
    width: 1em;
    height: 1em;
  }

  .main-navigation-link-text {
    display: block;
    margin-top: .33em;
    font-size: .75em;
  }

  .main-navigation-logo-link {
    padding: 0;
    flex-grow: 1;
  }

  .main-navigation-logo {
    display: block;
    height: 4em;
  }
</style>
