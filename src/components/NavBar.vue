<template lang="pug">
#navbar.fixed-top(:class="{ 'mobile-nav-active': isMobileOpen }")
  header.header.bg-black.text-white.px-3(  
    ref="headerEl"
    :class="{ 'shadow-sm': hasShadow }"
  )
    .container-lg.px-4.d-flex.align-items-center.justify-content-between.h-100
      a.logo.d-flex.align-items-center.text-decoration-none.text-white(href="#hero")
        h1.sitename.fw-bold.mb-0(style="font-size:30px") Frank Liu

      nav.navmenu(position="navigation")
        // desktop
        ul.d-none.d-xl-flex.list-unstyled.mb-0.gap-4.align-items-center(ref="menuList")
          li(v-for="item in menuItems" :key="item.href")
            a.nav-link.px-1.pb-1.d-inline-flex.align-items-center.text-white.text-decoration-none.position-relative(
              style="font-size:15px"
              :href="item.href"
              :class="{ active: item.href === '#hero' }"
            ) {{ item.key }}

        // mobile toggle
        button.mobile-nav-toggle.btn.btn-link.text-white.d-inline-flex.d-xl-none.ms-2(
          type="button"
          @click="toggleMobile"
          :aria-expanded="isMobileOpen.toString()"
          aria-controls="navmenu"
        )
          Menu(:size="28" aria-hidden="true")

  // backdrop
  div.position-fixed.top-0.start-0.w-100.h-100.bg-dark(
    v-if="isMobileOpen"
    style="opacity:.8; z-index:1040;"
    @click="toggleMobile"
    aria-hidden="true"
  )

  ul.d-xl-none.list-unstyled.position-fixed.start-0.end-0.mx-3.mt-5.p-2.bg-white.rounded.border(
    v-if="isMobileOpen"
    ref="menuList"
    :style="{ top: 'var(--nav-h, 72px)', zIndex: 1041 }"
  )
    li(v-for="item in menuItems" :key="item.href")
      a.d-flex.align-items-center.justify-content-between.px-3.py-2.text-decoration-none(
        :href="item.href"
        :class="[ item.href === '#hero' ? 'text-primary' : 'text-dark' ]"
      ) {{ item.key }}
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { Menu } from 'lucide-vue-next'

const menuItems = [
  { key: 'Home', href: '#hero' },
  { key: 'About', href: '#about' },
  { key: 'Services', href: '#services' },
  { key: 'Resume', href: '#resume' },
  //{ key: 'Portfolio', href: '#portfolio' },
  { key: 'Contact', href: '#contact' }
]

interface SectionLink { a: HTMLAnchorElement; el: HTMLElement }

const SCROLL_OFFSET = 200
const HEADER_SHADOW_OFFSET = 100

export default defineComponent({
  name: 'NavBar',
  components: { Menu },
  data() {
    return {
      isMobileOpen: false,
      hasShadow: false,
      menuItems,
      sections: [] as SectionLink[],
      onScrollHeader: null as (() => void) | null,
      onScrollSpy: null as (() => void) | null,
      onResizeSpy: null as (() => void) | null,
      onLoadSpy: null as (() => void) | null
    }
  },
  mounted() {
    const header = this.$refs.headerEl as HTMLElement | undefined
    const menuList = this.$refs.menuList as HTMLElement

    // shadow toggle
    this.onScrollHeader = () => {
      if (!header) return
      if (window.scrollY > HEADER_SHADOW_OFFSET) header.classList.add('scrolled')
      else header.classList.remove('scrolled')
    }
    window.addEventListener('scroll', this.onScrollHeader, { passive: true })
    this.onScrollHeader()

    // helpers
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
        const home = getLinks().find(l => l.getAttribute('href') === '#hero')
        if (home) {
          getLinks().forEach(l => l.classList.remove('active'))
          home.classList.add('active')
        }
      }
    }

    this.onScrollSpy = () => spy()
    this.onLoadSpy = () => { buildSections(); spy() }
    this.onResizeSpy = () => { buildSections(); spy() }

    window.addEventListener('scroll', this.onScrollSpy, { passive: true })
    window.addEventListener('load', this.onLoadSpy)
    window.addEventListener('resize', this.onResizeSpy)

    // close mobile on anchor click
    menuList.addEventListener('click', e => {
      const a = (e.target as HTMLElement).closest('a')
      if (a && (a.getAttribute('href') || '').startsWith('#')) this.isMobileOpen = false
    })
  },
  beforeUnmount() {
    const listeners: [string, (() => void) | null][] = [
      ['scroll', this.onScrollHeader],
      ['scroll', this.onScrollSpy],
      ['resize', this.onResizeSpy],
      ['load', this.onLoadSpy]
    ]
    listeners.forEach(([event, handler]) => { if (handler) window.removeEventListener(event, handler) })
  },
  methods: {
    toggleMobile() {
      this.isMobileOpen = !this.isMobileOpen
    }
  }
})
</script>

<style lang="scss">
#navbar { --nav-h: 72px; }
@media (min-width: 1200px) {
  #navbar { --nav-h: 94px; } 
}

#navbar .header {
  height: var(--nav-h, 72px);
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
}

#navbar .header .container-lg { height: 100%; }

// brand and links do not inflate height
#navbar .sitename { line-height: 1; }
.navmenu .nav-link {
  color: #fff;
  line-height: 1;
  padding-top: 0;
  padding-bottom: 0;
  display: inline-flex;
  align-items: center;
}

// underline effect
.navmenu .nav-link::before {
  content: "";
  position: absolute;
  left: 0; bottom: -6px;
  height: 2px; width: 0;
  background: currentColor;
  transition: width .25s ease;
  visibility: hidden;
}
.navmenu .nav-link:hover::before,
.navmenu .nav-link.active::before {
  width: 100%;
  visibility: visible;
}

// lock body scroll when mobile menu open
#navbar.mobile-nav-active { overflow: hidden; }
</style>

