<template lang="pug">
section#hero.position-relative.d-flex.align-items-center.justify-content-center.text-center.overflow-hidden.text-white(
  :class="{ 'animate': isMounted }"
  :style="{ minHeight: `calc(100dvh - var(--header-h, 0px))`, '--header-h': headerOffset + 'px' }"
)
  img.bg.position-absolute.top-0.start-0.w-100.h-100.object-fit-cover(
    :src="heroImage"
    alt=""
    style="z-index:1;"
  )

  .position-absolute.top-0.start-0.w-100.h-100.bg-black(
    style="--bs-bg-opacity:.7; z-index:2;"
  )

  .hero-center.position-relative(style="z-index:3;")
    h1.display-3.fw-bold.mb-2.text-white Frank Liu
    p.fs-2.fw-semibold.mb-0.text-white
      span.typed {{ typedText }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import heroImage from '@/assets/img/hero.jpg'

export default defineComponent({
  name: 'Hero',
  data() {
    return {
      heroImage,
      typedItems: ['Full Stack Engineer', 'Freelancer', 'Software Sales Representative'],
      headerOffset: 0,
      isMounted: false,
      typedText: '',
      wordIndex: 0,
      charIndex: 0,
      isDeleting: false,
      timer: undefined
    }
  },
  mounted() {
    this.isMounted = true
    this.typeTick()
  },
  beforeUnmount() {
    if (this.timer !== undefined) {
      window.clearTimeout(this.timer)
    }
  },
  methods: {
    typeTick(): void {
      const words = this.typedItems
      const i = this.wordIndex % words.length
      const full = words[i]

      if (this.isDeleting) {
        this.typedText = full.substring(0, this.charIndex - 1)
        this.charIndex = this.charIndex - 1
      } else {
        this.typedText = full.substring(0, this.charIndex + 1)
        this.charIndex = this.charIndex + 1
      }

      let delta = this.isDeleting ? 60 : 90

      if (!this.isDeleting && this.typedText === full) {
        delta = 1000
        this.isDeleting = true
      } else if (this.isDeleting && this.typedText === '') {
        this.isDeleting = false
        this.wordIndex = this.wordIndex + 1
        delta = 300
      }

      this.timer = window.setTimeout(() => {
        this.typeTick()
      }, delta)
    }
  }
})
</script>

<style lang="scss">
#hero {
  // animations toggle
  &.animate {
    .hero-center { animation: fade-up 600ms ease forwards 120ms; }
    > .bg { animation: kenburns 14s ease-out both; }
  }

  // type caret
  .typed {
    position: relative;
    padding-right: 6px;

    &::after {
      content: "";
      display: inline-block;
      width: 2px;
      height: 1em;
      vertical-align: -0.15em;
      margin-left: 4px;
      background: currentColor;
      animation: caret 0.9s steps(1) infinite;
    }
  }

  @keyframes caret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
  @keyframes fade-up { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes kenburns { from { transform: scale(1) } to { transform: scale(1.06) } }

  // reduced motion
  @media (prefers-reduced-motion: reduce) {
    &.animate {
      .hero-center, > .bg { animation: none !important; opacity: 1; transform: none; }
    }
  }
}
</style>
