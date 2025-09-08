<template lang="pug">
#navbar.fixed-top(:class="{ 'mobile-nav-active': isMobileOpen }")
  header.header.bg-black.text-white.px-3(
    ref="headerEl"
    :class="{ 'shadow-sm': hasShadow }"
  )
    .container-lg.px-4.d-flex.align-items-center.justify-content-between.h-100
      a.logo.d-flex.align-items-center.text-decoration-none.text-white(href="#hero")
        h1.sitename.fw-bold.mb-0(style="font-size:30px") Frank Liu

      nav.navmenu(position="navigation" v-nav-highlight)
        // desktop
        ul.d-none.d-xl-flex.list-unstyled.mb-0.gap-4.align-items-center
          li(v-for="item in menuItems" :key="item.href")
            a.nav-link.px-1.pb-1.d-inline-flex.align-items-center.text-white.text-decoration-none.position-relative(
              style="font-size:15px"
              :href="item.href"
              :class="{ active: isActive(item.href) }"
            )
              span.label {{ item.key }}

        // mobile toggle
        button.mobile-nav-toggle.btn.btn-link.text-white.d-inline-flex.d-xl-none.ms-2(
          type="button"
          @click="toggleMobile"
          :aria-expanded="isMobileOpen.toString()"
          aria-controls="navmenu"
        )
          component(:is="isMobileOpen ? 'X' : 'Menu'" :size="28" aria-hidden="true")

  // full-width sheet below navbar
  transition(name="slide-right")
    .mobile-sheet.d-xl-none(
      v-if="isMobileOpen"
      role="dialog"
      aria-modal="true"
      :style="{ top: 'var(--nav-h, 72px)' }"
    )
      nav.sheet-links
        ul.list-unstyled.mb-0
          li(v-for="item in menuItems" :key="item.href")
            a.sheet-link.d-flex.align-items-center.px-4.py-3.text-decoration-none.text-white(
              :href="item.href"
              :class="{ active: isActive(item.href) }"
              @click="closeMobile"
            )
              span.label {{ item.key }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Menu, X } from 'lucide-vue-next'

type MenuItem = { key: string; href: string }

const menuItems: MenuItem[] = [
  { key: 'Home', href: '#hero' },
  { key: 'About', href: '#about' },
  { key: 'Services', href: '#services' },
  { key: 'Resume', href: '#resume' },
  // { key: 'Projects',  href: '#portfolio' },
  { key: 'Contact', href: '#contact' }
]

const HEADER_SHADOW_OFFSET = 100

export default defineComponent({
  name: 'NavBar',
  components: { Menu, X },
  data() {
    return {
      isMobileOpen: false,
      hasShadow: false,
      menuItems,
      activeHash: '#hero' as string,
      io: null as IntersectionObserver | null
    }
  },
  mounted() {
    // header shadow
    const header = this.$refs.headerEl as HTMLElement | undefined
    const onScroll = () => {
      if (!header) return
      if (window.scrollY > HEADER_SHADOW_OFFSET) header.classList.add('scrolled')
      else header.classList.remove('scrolled')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // intersection observer for sections
    const targets = this.menuItems
      .map(i => document.getElementById(i.href.slice(1)))
      .filter((el): el is HTMLElement => !!el)

    this.io = new IntersectionObserver(
      entries => {
        // choose the most visible entry
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          this.activeHash = `#${visible.target.id}`
        } else {
          // near top fallback
          if (window.scrollY < 120) this.activeHash = '#hero'
        }
      },
      { root: null, rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    targets.forEach(el => this.io!.observe(el))
  },
  beforeUnmount() {
    this.io?.disconnect()
    this.io = null
  },
  methods: {
    toggleMobile() { this.isMobileOpen = !this.isMobileOpen },
    closeMobile() { this.isMobileOpen = false },
    isActive(href: string) { return this.activeHash === href }
  }
})
</script>

<style lang="scss">
#navbar {
  --nav-h: 72px;
  @media (min-width: 1200px) { --nav-h: 94px; }

  .header {
    height: var(--nav-h, 72px);
    display: flex;
    align-items: center;
    padding-top: 0;
    padding-bottom: 0;
  }
  .header .container-lg { height: 100%; }
  .sitename { line-height: 1; }

  /* desktop links */
  .navmenu .nav-link {
    color: #fff;
    line-height: 1;
    padding-top: 0;
    padding-bottom: 0;
    display: inline-flex;
    align-items: center;

    .label {
      position: relative;
      display: inline-block;
      line-height: 1.2;
    }
    .label::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -6px;
      height: 2px;
      width: 0;
      background: #fff;
      transition: width .25s ease;
    }
    &:hover .label::after { width: 100%; }
    &.active .label::after { width: 100%; }
  }

  /* full-width mobile sheet below navbar */
  .mobile-sheet {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100vh - var(--nav-h, 72px));
    background: #0f0f10;
    color: #fff;
    z-index: 1041;
    display: flex;
    flex-direction: column;
    box-shadow: 0 -6px 24px rgba(0,0,0,.35);
  }

  .sheet-links { overflow-y: auto; -webkit-overflow-scrolling: touch; }

  .sheet-link {
    color: #fff;
    display: flex;
    align-items: center;
    padding: .9rem 1rem;
    text-decoration: none;

    .label {
      position: relative;
      display: inline-block;
      line-height: 1.2;
    }
    .label::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -6px;
      height: 2px;
      width: 0;
      background: #fff;
      transition: width .25s ease;
    }
    &:hover .label::after { width: 100%; }
    &.active .label::after { width: 100%; }
  }

  /* slide from right */
  .slide-right-enter-from { opacity: 0; transform: translateX(100%); }
  .slide-right-enter-to   { opacity: 1; transform: translateX(0); }
  .slide-right-enter-active { transition: opacity .2s ease, transform .2s ease; }
  .slide-right-leave-from { opacity: 1; transform: translateX(0); }
  .slide-right-leave-to   { opacity: 0; transform: translateX(100%); }
  .slide-right-leave-active { transition: opacity .18s ease, transform .18s ease; }

  /* lock body scroll when open */
  &.mobile-nav-active { overflow: hidden; }
}
</style>
