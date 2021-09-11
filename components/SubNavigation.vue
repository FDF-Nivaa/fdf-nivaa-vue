<template>
  <nav class="sub-navigation">
    <div class="sub-navigation-inner">
      <ul class="sub-navigation-list">
        <li
          v-for="menuItem in menuItems"
          :key="menuItem.url"
          class="sub-navigation-list-item"
        >
          <nuxt-link
            class="sub-navigation-link"
            :class="{ 'is-top-level': menuItem.isTopLevel }"
            :to="menuItem.url"
          >
            <component :is="menuItem.icon" />
            <span class="sub-navigation-link-text">
              {{ menuItem.title }}
            </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {
  CalendarIcon,
  CompassIcon,
  MessageSquareIcon,
  RepeatIcon,
  UsersIcon,
} from 'vue-feather-icons'

export default {
  components: {
    CalendarIcon,
    CompassIcon,
    MessageSquareIcon,
    RepeatIcon,
    UsersIcon,
  },
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
$borderWidth: 0.1em;

.sub-navigation {
  font-size: 0.8125em;
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
    border-radius: $defaultBorderRadius 0 0 $defaultBorderRadius;
  }

  &:last-child .sub-navigation-link {
    border-radius: 0 $defaultBorderRadius $defaultBorderRadius 0;
    border-right-width: $borderWidth;
  }
}

.sub-navigation-link {
  position: relative;
  display: flex;
  vertical-align: middle;
  padding: 0.5em 0.66em;
  text-decoration: none;
  margin: 0;
  flex-direction: row;
  align-items: center;
  text-align: center;
  background: $navigationBackgroundColor;
  border: $borderWidth solid currentColor;
  border-right-width: 0;
  color: $duskBlue;
  transition: all 0.2s ease-out;

  &.nuxt-link-exact-active,
  &:not(.is-top-level).nuxt-link-active {
    background: $duskBlue;
    border-color: $duskBlue;
    color: $backgroundColor;

    @media (hover: hover) {
      &:hover {
        background: mix($duskBlue, $navigationBackgroundColor, 90%);
      }
    }
  }

  @media (hover: hover) {
    &:hover {
      background: mix($duskBlue, $navigationBackgroundColor, 10%);
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
  margin-left: 0.33em;
}

.sub-navigation-logo-link {
  padding: 0;
  flex-grow: 1;
}

@media (max-width: $largePhone) {
  .sub-navigation-list {
    flex-direction: column;
    align-items: stretch;
  }
  .sub-navigation-list-item {
    &:first-child .sub-navigation-link {
      border-radius: $defaultBorderRadius $defaultBorderRadius 0 0;
    }

    &:last-child .sub-navigation-link {
      border-radius: 0 0 $defaultBorderRadius $defaultBorderRadius;
    }

    &:not(:last-child) {
      .sub-navigation-link {
        border-bottom: none;
      }
    }
  }
  .sub-navigation-link {
    border-right-width: $borderWidth;
    flex-grow: 1;
  }
}
</style>
