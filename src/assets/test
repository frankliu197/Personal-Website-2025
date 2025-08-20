<template lang="pug">
section#contact.contact.section
  .container.section-title
    h2 Contact
    p Reach out to me

  .container
    .row.gy-4
      // LinkedIn
      .col-lg-4.col-md-6
        .info-item
          .icon
            // linkedin icon
            svg(viewBox="0 0 24 24" width="22" height="22" aria-hidden="true")
              path(fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v15H0zM8 8h4.8v2.1h.07c.67-1.2 2.3-2.47 4.73-2.47C21.4 7.63 24 9.7 24 14.1V23H19v-7.6c0-1.82-.03-4.16-2.53-4.16-2.53 0-2.92 1.98-2.92 4.03V23H8z")
          h3 LinkedIn
          p
            a(:href="linkedinUrl" target="_blank" rel="noopener") {{ linkedinLabel }}

      // Email
      .col-lg-4.col-md-6
        .info-item
          .icon
            // mail icon
            svg(viewBox="0 0 24 24" width="22" height="22" aria-hidden="true")
              path(fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z")
          h3 Email
          p
            a(:href="'mailto:' + email") {{ email }}

      // WhatsApp
      .col-lg-4.col-md-6
        .info-item
          .icon
            // whatsapp icon
            svg(viewBox="0 0 24 24" width="22" height="22" aria-hidden="true")
              path(fill="currentColor" d="M20 3.9A10 10 0 0 0 12 2a10 10 0 0 0-8.7 14.7L2 22l5.4-1.3A10 10 0 1 0 20 3.9Zm-8 16.1a8 8 0 0 1-4.1-1.1l-.3-.2-3 .7.6-2.9-.2-.3A8 8 0 1 1 12 20Zm4.6-5.3c-.3-.2-1.7-.9-1.9-1-.2-.1-.4-.2-.6.2-.2.3-.7 1-.8 1.1-.1.1-.3.1-.6 0a6.7 6.7 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.8c-.2-.3 0-.5.1-.7l.4-.6c.1-.2 0-.3 0-.6s-.5-1.3-.7-1.7c-.2-.4-.4-.3-.6-.3h-.5c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.6s1.1 3 1.2 3.1c.1.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.7.6.7.2 1.3.1 1.8.1.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4 0-.1-.3-.2-.6-.3Z")
          h3 WhatsApp
          p
            a(:href="whatsappHref" target="_blank" rel="noopener") {{ whatsapp }}
</template>

<script>
export default {
  name: 'Contact',
  props: {
    linkedinUrl: { type: String, default: 'https://www.linkedin.com/in/your-handle' },
    linkedinLabel: { type: String, default: 'linkedin.com/in/your-handle' },
    email: { type: String, default: 'you@example.com' },
    whatsapp: { type: String, default: '+1 555 123 4567' },
    whatsappMessage: { type: String, default: 'Hi, I found your portfolio and would like to chat.' }
  },
  computed: {
    whatsappHref() {
      const digits = (this.whatsapp || '').replace(/\D/g, '')
      const q = this.whatsappMessage ? '?text=' + encodeURIComponent(this.whatsappMessage) : ''
      return `https://wa.me/${digits}${q}`
    }
  }
}
</script>

<style lang="scss" scoped>
/* responsive 3 up grid like the template */
.row {
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (min-width: 992px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

/* info card style */
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
</style>
