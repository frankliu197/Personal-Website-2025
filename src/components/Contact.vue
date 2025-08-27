<template lang="pug">
section#contact.contact.section
  .container.section-title
    h2 Contact
    p Reach out to me

  .container
    .row.gy-4
      .col-lg-4.col-md-6(
        v-for="(c, i) in contacts"
        :key="i"
      )
        .info-item
          .icon
            component(:is="c.icon" size="22" stroke-width="2" aria-hidden="true")
          h3 {{ c.title }}
          p
            a(:href="c.href" target="_blank" rel="noopener") {{ c.label }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Linkedin, Mail, MessageCircle } from "lucide-vue-next"

export default defineComponent({
  name: 'Contact',
  components: { Linkedin, Mail, MessageCircle },
  data() {
    const email = 'frankliu197@gmail.com'
    const linkedinUrl = 'https://www.linkedin.com/in/frankliu197'
    const linkedinLabel = 'linkedin.com/in/frankliu197'
    const whatsapp = '+1 613 322 6347'
    const whatsappMessage = 'Hi Frank, I found your portfolio and would like to chat.'
    const whatsappHref = `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
      whatsappMessage
    )}`

    return {
      contacts: [
        {
          icon: Linkedin,
          title: 'LinkedIn',
          label: linkedinLabel,
          href: linkedinUrl
        },
        {
          icon: Mail,
          title: 'Email',
          label: email,
          href: `mailto:${email}`
        },
        {
          icon: MessageCircle,
          title: 'WhatsApp',
          label: whatsapp,
          href: whatsappHref
        }
      ]
    }
  }
})
</script>

<style lang="scss">
#contact {
  .row {
    display: grid;
    gap: 1.5rem;

    @media (min-width: 768px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    @media (min-width: 992px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  .info-item {
    background: var(--surface-color);
    border: 1px solid color-mix(in srgb, var(--default-color), transparent 88%);
    border-radius: 12px;
    padding: 22px 20px;
    height: 100%;
    transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;

    .icon {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      color: var(--accent-color);
      background: color-mix(in srgb, var(--accent-color), transparent 92%);
      border: 1px solid color-mix(in srgb, var(--accent-color), transparent 70%);
    }

    h3 {
      font-size: 18px;
      font-weight: 700;
      color: var(--heading-color);
      margin: 0 0 6px;
    }

    p {
      margin: 0;
      a {
        color: var(--default-color);
        text-decoration: none;
        word-break: break-word;

        &:hover { color: var(--accent-color); }
      }
    }

    &:hover {
      transform: translateY(-3px);
      border-color: color-mix(in srgb, var(--accent-color), transparent 65%);
      box-shadow: 0 8px 26px rgba(0, 0, 0, 0.08);
    }
  }
}
</style>
