<template lang="pug">
section#hero.hero.section.dark-background(
  :class="{ animate: isMounted }"
  :style="{ '--header-h': headerOffset + 'px' }"
)
  img.bg(:src="heroImage" alt="" )

  .hero-center
    h2 Frank Liu
    p
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
      typedItems: ['Full Stack Engineer', 'Freelancer'],
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

<style lang="scss" scoped>
#hero {
  width: 100%;
  /* modern full-height viewport handling */
  min-height: calc(100vh  - var(--header-h, 0px));
  min-height: calc(100svh - var(--header-h, 0px));
  min-height: calc(100dvh - var(--header-h, 0px));

  position: relative;
  padding: 60px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  > .bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: color-mix(in srgb, var(--background-color, #0a0a0a), transparent 30%);
    z-index: 2;
  }

  .hero-center {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    opacity: 0;
    transform: translateY(12px);

    h2 {
      margin: 0 0 8px;
      font-size: 64px;
      font-weight: 700;
      color: var(--heading-color, #ffffff);
    }

    p {
      margin: 5px 0 0 0;
      font-size: 36px;
      font-weight: 600;
      color: var(--default-color, #ffffff);

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
    }
  }

  &.animate {
    .hero-center { animation: fade-up 600ms ease forwards 120ms; }
    > .bg { animation: kenburns 14s ease-out both; }
  }

  @media (max-width: 992px) {
    .hero-center {
      h2 { font-size: 42px; }
      p  { font-size: 22px; }
    }
  }
  @media (max-width: 600px) {
    padding: 40px 0;
    .hero-center {
      h2 { font-size: 34px; }
      p  { font-size: 18px; }
    }
  }

  @keyframes caret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
  @keyframes fade-up { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes kenburns { from { transform: scale(1) } to { transform: scale(1.06) } }

  @media (prefers-reduced-motion: reduce) {
    .hero.animate {
      .hero-center, > .bg { animation: none !important; opacity: 1; transform: none; }
    }
  }
}
</style>
