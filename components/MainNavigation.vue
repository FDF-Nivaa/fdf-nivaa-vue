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
        <li
          class="main-navigation-list-item"
          v-for="menuItem in menuItems"
          :key="menuItem.url"
        >
          <nuxt-link
            class="main-navigation-link"
            :to="menuItem.url"
          >
            <component
              :is="menuItem.icon"
              class="main-navigation-link-icon"
            />
            <span class="main-navigation-link-text">
              {{menuItem.title}}
            </span>
          </nuxt-link>
        </li>
        <li
          class="main-navigation-list-item"
        >
          <a href="javascript:void(0)" class="main-navigation-link">
          <MoreHorizontalIcon
            class="main-navigation-link-icon"
          />
          <span class="main-navigation-link-text">
              Mere
          </span>
          </a>
          <ul class="sub-navigation">
            <li v-for="menuItem in dynamicMenuItems" :key="menuItem._id" class="sub-navigation-list-item">
              <nuxt-link
                class="sub-navigation-link"
                :to="`/pages/${menuItem.slug}`"
              >
                {{menuItem.name}}
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {CalendarIcon, CompassIcon, MessageSquareIcon, MoreHorizontalIcon, RepeatIcon, UsersIcon} from 'vue-feather-icons'

  export default {
    components: { CalendarIcon, CompassIcon, MessageSquareIcon, MoreHorizontalIcon, RepeatIcon, UsersIcon },
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
    },
    computed: {
      dynamicMenuItems() {
        return this.$store.getters['menu-items/getAll']()
      }
    },
    mounted() {
      this.$store.dispatch('menu-items/fetchAll')
    },
    // TODO This doesn't work — we need another solution
    async fetch({ store }) {
      await store.dispatch('menu-items/fetchAll')
    },
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
    background: $navigationBackgroundColor;
    z-index: 1;

    @media (max-width: $largePhone) {
      position: fixed;
      top: auto;
      bottom: 0;
      font-size: .8125rem;
      padding-bottom: env(safe-area-inset-bottom);
    }
  }

  .main-navigation-inner {
    display: flex;
    flex-direction: row;
    max-width: $maxContentWidth;
    margin: auto;
    padding: 0 0 0 1.25em;

    @media (min-width: $largeDisplay) {
      max-width: $maxContentWidthLargeDisplay;
    }

    @supports (padding: env(safe-area-inset-bottom)) {
      padding-left: unquote('max(env(safe-area-inset-left), 1.25em)');
      padding-right: unquote('env(safe-area-inset-right)');
    }
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
    padding: 1em 3vw;
    text-decoration: none;
    margin: 0;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (min-width: 1066px) {
      padding: 1em 2rem;
    }

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

    @media (max-width: $largePhone) {
      font-size: 1.5em;
    }
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
    height: 4.25em;
  }

  .sub-navigation {
    position: absolute;
    right: 0;
    top: 3.4em;
    list-style: none;
    padding-left: 0;
    background: $navigationBackgroundColor;
    transition: all .2s ease-out;
  }

  .main-navigation-list-item:not(:hover) > .sub-navigation {
    pointer-events: none;
    transform:translateY(-.5em);
    opacity: 0;
  }

  .sub-navigation-list-item {

  }
  .sub-navigation-link {
    display: block;
    padding: .5em 1.5em;
  }
</style>
