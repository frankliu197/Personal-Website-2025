<template lang="pug">
section#contact
  .section-header
    .title Contact
    .subtitle Let's build your next idea
  .container
    .row.g-4
      .col-lg-4.col-md-6.contact-reveal(
        v-for="(c, i) in contacts"
        :key="i"
        v-reveal="{ idx: i, step: 90 }"
        :style="{ '--dx': i % 2 === 0 ? '18px' : '-18px', transitionDelay: `${i * 90}ms` }"
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
        { icon: Linkedin, title: 'LinkedIn', titleShort: 'LinkedIn', label: linkedinLabel, href: linkedinUrl },
        { icon: Mail, title: 'Email', label: email, href: `mailto:${email}` },
        { icon: MessageCircle, title: 'WhatsApp', label: whatsapp, href: whatsappHref }
      ]
    }
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
  /* v-reveal should toggle this class on intersect */
  .contact-reveal.is-visible {
    opacity: 1;
    transform: translateX(0) translateY(0) scale(1);
    filter: blur(0);
  }

  .contact-reveal.no-anim {
    transition: none; // no animation
  }
}
</style>
