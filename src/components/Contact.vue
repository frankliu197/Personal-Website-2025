<template lang="pug">
section#contact
  .section-header
    .title Contact
    .subtitle Let's build your next idea
  .container
    .row.g-4(ref="gridEl")
      .col-lg-4.col-md-6.contact-reveal(
        v-for="(c, i) in contacts"
        :key="i"
        :class="{ 'is-visible': visible[i] }"
        :style="{ '--dx': (i % 2 === 0 ? '18px' : '-18px'), transitionDelay: (i * 90) + 'ms' }"
      )
        FLCard.text-decoration-none.link-body-emphasis(
          :icon="c.icon"
          :title="c.title"
          :desc="c.label"
          :href="c.href"
          target="_blank"
          rel="noopener"
          :chip-size="44"
          :icon-size="22"
        )
</template>

<script lang="ts">
import FLCard from '@/components/FLCard.vue'
import { Linkedin, Mail, MessageCircle } from 'lucide-vue-next'

export default {
  name: 'Contact',
  components: { FLCard },
  data() {
    const email = 'frankliu197@gmail.com'
    const linkedinUrl = 'https://www.linkedin.com/in/frankliu197'
    const linkedinLabel = 'linkedin.com/in/frankliu197'
    const whatsapp = '+1 613 322 6347'
    const whatsappMessage = 'Hi Frank, I found your portfolio and would like to chat.'
    const whatsappHref = `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`

    return {
      contacts: [
        { icon: Linkedin, title: 'LinkedIn', label: linkedinLabel, href: linkedinUrl },
        { icon: Mail, title: 'Email', label: email, href: `mailto:${email}` },
        { icon: MessageCircle, title: 'WhatsApp', label: whatsapp, href: whatsappHref }
      ],
      gridEl: null as HTMLElement | null,
      visible: [] as boolean[],
      obs: null as IntersectionObserver | null
    }
  },
  mounted() {
    const items = (this.$refs.gridEl as HTMLElement)?.querySelectorAll<HTMLElement>('.contact-reveal')
    if (!items) return

    if (!('IntersectionObserver' in window)) {
      this.visible = this.contacts.map(() => true)
      return
    }

    this.obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number((entry.target as HTMLElement).dataset.index)
          if (!Number.isNaN(idx)) this.visible[idx] = true
          this.obs?.unobserve(entry.target)
        }
      })
    }, { threshold: 0.2 })

    items.forEach((el, i) => {
      el.dataset.index = String(i)
      this.obs!.observe(el)
    })
  },
  beforeUnmount() {
    this.obs?.disconnect()
  }
}
</script>

<style lang="scss">
#contact {
  .contact-reveal {
    opacity: 0;
    transform: translateX(var(--dx, 20px)) translateY(10px) scale(0.97);
    filter: blur(6px);
    transition:
      opacity .5s ease,
      transform .5s ease,
      filter .4s ease;
    will-change: opacity, transform, filter;
  }
  .contact-reveal.is-visible {
    opacity: 1;
    transform: translateX(0) translateY(0) scale(1);
    filter: blur(0);
  }
}
</style>
