<template lang="pug">
.fl-scroll-top(v-show="isVisible")
  button.btn.btn-primary.rounded-circle.shadow(
    @click="scrollToTop"
    aria-label="Scroll to top"
  )
    ArrowUp(:size="20" stroke-width="2" aria-hidden="true")
</template>

<script lang="ts">
import { ArrowUp } from 'lucide-vue-next'

export default {
  name: 'FLScrollTop',
  components: { ArrowUp },
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.toggleVisibility, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.toggleVisibility)
  },
  methods: {
    toggleVisibility() {
      this.isVisible = window.scrollY > 200
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style lang="scss">
.fl-scroll-top {
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 99999;

  button {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    background-color: var(--accent-color) !important;
    color: var(--contrast-color, #fff) !important;
    border: 0;

    opacity: 0.9;
    transition: opacity .3s ease, transform .2s ease;

    &:hover {
      background-color: color-mix(in srgb, var(--accent-color), transparent 20%);
      transform: translateY(-2px);
      opacity: 1;
    }
  }
}
</style>
