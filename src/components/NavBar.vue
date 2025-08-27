<template lang="pug">
#navbar(class="nav-root" :class="{ 'mobile-nav-active': isMobileOpen }")
  header.header(ref="headerEl")
    .container-xl
      a.logo(href="#hero")
        h1.sitename Frank Liu
      nav.navmenu
        ul(ref="menuList")
          li(v-for="item in menuItems" :key="item.href")
            a(:href="item.href" :class="{ active: item.href === '#hero' }") {{ item.key }}
        // button.mobile-nav-toggle(
          type="button"
          @click="toggleMobile"
          :aria-expanded="isMobileOpen.toString()"
          aria-controls="navmenu"
        //)
          Menu(v-if="!isMobileOpen" :size="28" aria-hidden="true")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Menu } from 'lucide-vue-next'

const menuItems =  [
  { key: 'Home', href: '#hero' },
  { key: 'About', href: '#about' },
  { key: 'Services', href: '#services' },
  { key: 'Resume', href: '#resume' },
  { key: 'Portfolio', href: '#portfolio' },
  { key: 'Contact', href: '#contact' }
]

interface SectionLink {
  a: HTMLAnchorElement
  el: HTMLElement
}

const SCROLL_OFFSET = 200
const HEADER_SHADOW_OFFSET = 100

export default defineComponent({
  name: 'NavBar',
  data() {
    return {
      isMobileOpen: false,
      menuItems,
      onScrollHeader: null as (() => void) | null,
      onScrollSpy: null as (() => void) | null,
      onResizeSpy: null as (() => void) | null,
      onLoadSpy: null as (() => void) | null,
      sections: [] as SectionLink[]
    }
  },
  components: {
    Menu
  },
  mounted() {
    const header = this.$refs.headerEl as HTMLElement | undefined
    const menuList = this.$refs.menuList as HTMLElement

    // HEADER SHADOW
    this.onScrollHeader = () => {
      if (!header) {
        return
      }
      if (window.scrollY > HEADER_SHADOW_OFFSET) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', this.onScrollHeader, { passive: true })
    this.onScrollHeader()

    // Helpers
    const getLinks = (): HTMLAnchorElement[] =>
      Array.from(menuList.getElementsByTagName('a')).filter(a =>
        (a.getAttribute('href') || '').startsWith('#')
      )

    const buildSections = () => {
      this.sections = getLinks()
        .map(a => {
          const href = a.getAttribute('href')
          if (!href) return null
          const id = href.slice(1)
          const el = document.getElementById(id)
          return el ? { a, el } : null
        })
        .filter((x): x is SectionLink => x !== null)
    }

    const spy = () => {
      const links = getLinks()
      const pos = window.scrollY + SCROLL_OFFSET
      let hit = false

      this.sections.forEach(({ a, el }) => {
        const top = el.offsetTop
        const height = el.offsetHeight
        if (pos >= top && pos <= top + height) {
          links.forEach(l => l.classList.remove('active'))
          a.classList.add('active')
          hit = true
        }
      })

      if (!hit && window.scrollY < 120) {
        links.forEach(l => l.classList.remove('active'))
        const home = links.find(l => l.getAttribute('href') === '#hero')
        if (home) home.classList.add('active')
      }
    }

    // Attach listeners
    this.onScrollSpy = () => spy()
    this.onLoadSpy = () => { buildSections(); spy() }
    this.onResizeSpy = () => { buildSections(); spy() }

    window.addEventListener('scroll', this.onScrollSpy, { passive: true })
    window.addEventListener('load', this.onLoadSpy)
    window.addEventListener('resize', this.onResizeSpy)

    // Close mobile menu on anchor click
    menuList.addEventListener('click', e => {
      const a = (e.target as HTMLElement).closest('a')
      if (a && (a.getAttribute('href') || '').startsWith('#')) {
        this.isMobileOpen = false
      }
    })
  },

  beforeUnmount() {
    const listeners: [string, (() => void) | null][] = [
      ['scroll', this.onScrollHeader],
      ['scroll', this.onScrollSpy],
      ['resize', this.onResizeSpy],
      ['load', this.onLoadSpy]
    ]
    listeners.forEach(([event, handler]) => {
      if (handler) window.removeEventListener(event, handler)
    })
  },

  methods: {
    toggleMobile() {
      this.isMobileOpen = !this.isMobileOpen
    }
  }
})
</script>

<style lang="scss">
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-h, 72px);
  z-index: 1000;

  .header {
    --background-color: #000000;
    --default-color: #ffffff;
    --heading-color: #ffffff;
  }

  .navmenu {
    --nav-font: "Poppins", sans-serif;
    --nav-color: #ffffff;
    --nav-hover-color: #ffffff;
    --nav-mobile-background-color: #ffffff;
    --nav-dropdown-background-color: #ffffff;
    --nav-dropdown-color: #212529;
    --nav-dropdown-hover-color: #0078ff;
  }

  .container-xl {
    max-width: 1200px;
    padding-inline: 16px;
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header {
    color: var(--default-color);
    background-color: var(--background-color);
    padding: 20px 0;
    transition: all .5s;
    z-index: 997;
    position: sticky;
    top: 0;

    &.scrolled {
      box-shadow: 0 0 18px rgba(0, 0, 0, .1);
    }

    .logo {
      line-height: 1;
      display: flex;
      align-items: center;
      text-decoration: none;

      img {
        max-height: 32px;
        margin-right: 8px;
      }

      .sitename {
        font-size: 30px;
        margin: 0;
        font-weight: 700;
        color: var(--heading-color);
      }
    }
  }

  @media (min-width: 1200px) {
    .navmenu {
      padding: 0;

      ul {
        margin: 0;
        padding: 0;
        display: flex;
        list-style: none;
        align-items: center;
      }

      li {
        position: relative;
      }

      >ul>li {
        white-space: nowrap;
        padding: 15px 14px;

        &:last-child {
          padding-right: 0;
        }
      }

      a {
        color: var(--nav-color);
        font-size: 15px;
        padding: 0 2px;
        font-family: var(--nav-font);
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: space-between;
        white-space: nowrap;
        transition: .3s;
        position: relative;
        text-decoration: none;
      }

      >ul>li>a::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -6px;
        left: 0;
        background-color: var(--nav-hover-color);
        visibility: hidden;
        width: 0;
        transition: all .3s ease-in-out;
      }

      a:hover::before,
      li:hover>a::before,
      .active::before {
        visibility: visible;
        width: 100%;
      }

      li:hover>a,
      .active {
        color: var(--nav-hover-color);
      }

      .mobile-nav-toggle {
        display: none;
      }
    }
  }

  @media (max-width: 1199px) {
    .navmenu {
      padding: 0;
      z-index: 9997;
      position: relative;

      .mobile-nav-toggle {
        color: var(--nav-color);
        background: transparent;
        border: 0;
        font-size: 28px;
        line-height: 0;
        margin-left: 8px;
        cursor: pointer;
        transition: color .3s;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      ul {
        display: none;
        list-style: none;
        position: absolute;
        inset: 60px 20px 20px 20px;
        padding: 10px 0;
        margin: 0;
        border-radius: 6px;
        background-color: var(--nav-mobile-background-color);
        border: 1px solid color-mix(in srgb, #000, transparent 90%);
        box-shadow: none;
        overflow-y: auto;
        transition: .3s;
        z-index: 9998;
      }

      a {
        color: var(--nav-dropdown-color);
        padding: 10px 20px;
        font-family: var(--nav-font);
        font-size: 17px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: space-between;
        white-space: nowrap;
        transition: .3s;
        text-decoration: none;

        .toggle-dropdown {
          margin-left: 6px;
          width: 30px;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: .3s;
          background-color: color-mix(in srgb, var(--nav-dropdown-hover-color), transparent 90%);

          &:hover {
            background-color: var(--nav-dropdown-hover-color);
            color: #fff;
          }
        }
      }

      a:hover,
      .active {
        color: var(--nav-dropdown-hover-color);
      }

      .dropdown>ul {
        position: static;
        display: none;
        z-index: 99;
        padding: 10px 0;
        margin: 10px 20px;
        background-color: var(--nav-dropdown-background-color);
        transition: all .5s ease-in-out;

        ul {
          background-color: rgba(33, 37, 41, .1);
        }
      }

      .dropdown>ul.dropdown-active {
        display: block;
        background-color: rgba(33, 37, 41, .03);
      }
    }

    .mobile-nav-active {
      overflow: hidden;

      .mobile-nav-toggle {
        color: #fff;
        position: absolute;
        font-size: 32px;
        top: 15px;
        right: 15px;
        z-index: 9999;
      }

      .navmenu {
        position: static;

        &::before {
          content: "";
          position: fixed;
          inset: 0;
          background: rgba(33, 37, 41, .8);
          z-index: 9996;
        }

        >ul {
          display: block;
        }
      }
    }
  }
}
</style>