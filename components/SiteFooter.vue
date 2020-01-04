<template>
  <footer class="page-footer">
    <div class="footer-inner">
      <div class="some-links">
        <h2>Sociale medier</h2>
        <ul class="some-links-list">
          <li class="some-links-list-item">
            <a
              :href="config.facebookUrl"
              class="some-link"
              title="Besøg os på Facebook"
            ><FacebookIcon
            /></a>
          </li>
          <li class="some-links-list-item">
            <a
              :href="config.instagramUrl"
              class="some-link"
              :title="`Besøg os på Instagram`"
            ><InstagramIcon
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
  import { FacebookIcon, InstagramIcon } from 'vue-feather-icons'

  import config from '~/site.config'

  export default {
    name: 'SiteFooter',
    components: { FacebookIcon, InstagramIcon },
    data() {
      return { config }
    }
  }
</script>

<style lang="less" scoped>
  .page-footer {
    color: @backgroundColor;
    background: @nightBlue;

    h2,
    a {
      color: rgba(255, 255, 255, 0.85);
    }

    h2 {
      font-size: 1.2em;
    }
  }
  .footer-inner {
    margin: auto;
    max-width: @maxContentWidth;
    font-size: 0.8em;
  }

  .some-links {
    text-align: right;
  }

  .some-links-list {
    list-style: none;
    display: inline-block;
    white-space: nowrap;
  }

  .some-links-list-item {
    display: inline-block;
    margin: 0;
  }

  .some-link {
    display: inline-block;
    padding: 0.5em;

    &:last-child {
      margin-right: -0.5em;
    }
  }

  svg.feather {
    height: 2em;
  }
</style>
