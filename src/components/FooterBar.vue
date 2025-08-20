<template lang="pug">
footer#footer.footer
  .container
    .copyright
      p
        | © 
        strong.sitename MyPortfolio
        |  All Rights Reserved
    .social-links
      a(href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter / X")
        svg(viewBox="0 0 24 24" width="20" height="20" aria-hidden="true")
          path(fill="currentColor" d="M18.244 2H21l-6.5 7.43L22 22h-6.828l-5.34-6.476L3.86 22H1l7.07-8.08L2 2h6.828l4.84 6.01L18.244 2Zm-1.2 18h1.53L7.08 4h-1.53L17.044 20Z")
      a(href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook")
        svg(viewBox="0 0 24 24" width="20" height="20" aria-hidden="true")
          path(fill="currentColor" d="M13 22v-8h3l1-4h-4V7a2 2 0 0 1 2-2h2V2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4Z")
      a(href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram")
        svg(viewBox="0 0 24 24" width="20" height="20" aria-hidden="true")
          path(fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm6.5-.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z")
    .credits
      | Designed by 
      a(href="https://bootstrapmade.com/" target="_blank" rel="noopener") BootstrapMade
</template>

<script>
export default { name: 'FooterBar' }
</script>

<style lang="scss" scoped>
.footer {
  color: var(--default-color, #4e4e4e);
  background-color: var(--background-color, #fff);
  font-size: 14px;
  padding: 40px 0;
  position: relative;

  .container { text-align: center; }

  .copyright {
    p { margin-bottom: 0; }

    .sitename { padding-inline: 6px; }
  }

  .social-links {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;

    a {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid color-mix(in srgb, var(--default-color, #4e4e4e), transparent 30%);
      color: color-mix(in srgb, var(--default-color, #4e4e4e), transparent 40%);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: .2s ease;

      &:hover {
        color: var(--default-color, #4e4e4e);
        border-color: var(--default-color, #4e4e4e);
      }
    }
  }

  .credits {
    margin-top: 10px;
    font-size: 13px;

    a { color: color-mix(in srgb, var(--default-color, #4e4e4e), transparent 30%); }
  }
}
</style>
