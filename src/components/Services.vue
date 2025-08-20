<template lang="pug">
section#services.services.section
  // section title (same structure as template)
  .container.section-title
    h2 Services
    p Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit

  .container
    .row.gy-4
      .col-lg-4.col-md-6(
        v-for="(s, i) in services"
        :key="i"
      )
        .service-item.position-relative
          .icon
            svg(viewBox="0 0 24 24" width="28" height="28" aria-hidden="true")
              path(
                :d="iconPath(s.icon)"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              )
          a.stretched-link(href="#")
            h3 {{ s.title }}
          p {{ s.desc }}
</template>

<script>
export default {
  name: 'Services',
  props: {
    services: {
      type: Array,
      default: () => ([
        { icon: 'activity',       title: 'Nesciunt Mete',    desc: 'Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempora.' },
        { icon: 'bounding-box',   title: 'Eosle Commodi',    desc: 'Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non.' },
        { icon: 'easel',          title: 'Ledo Markt',       desc: 'Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Vel qui id voluptas adipisci eos earum.' },
        { icon: 'geo-alt',        title: 'Asperiores Commodi', desc: 'Non et temporibus minus omnis sed dolor esse consequatur. Cupiditate sed error ea fuga sit provident.' },
        { icon: 'camera',         title: 'Velit Doloremque', desc: 'Cumque et suscipit saepe. Est maiores autem enim facilis ut aut ipsam corporis aut.' },
        { icon: 'chat-square-text', title: 'Dolori Architecto', desc: 'Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque non et debitis iure.' }
      ])
    }
  },
  methods: {
    // minimal set of inline icon paths so you do not need Bootstrap Icons
    iconPath(name) {
      switch (name) {
        case 'activity':          return 'M22 12h-4l-3 8-6-16-3 8H2';
        case 'bounding-box':      return 'M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z';
        case 'easel':             return 'M4 4h16v10H4zM6 18l6-4 6 4M12 14v-2';
        case 'geo-alt':           return 'M12 22s7-5 7-11a7 7 0 1 0-14 0c0 6 7 11 7 11zM12 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z';
        case 'camera':            return 'M4 7h16v12H4zM8 7l2-3h4l2 3M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z';
        case 'chat-square-text':  return 'M20 3H4v14h4v4l6-4h6zM7 7h10M7 11h7';
        default:                  return 'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z'; // circle fallback
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* responsive grid mapping to the template’s .row .col-lg-4 .col-md-6 */
.row {
  display: grid;
  gap: 1.5rem;

  /* md ≥ 768px = 2 columns */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /* lg ≥ 992px = 3 columns */
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* service item card */
.service-item {
  height: 100%;
  background: var(--surface-color);
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 88%);
  border-radius: 12px;
  padding: 32px 24px;
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;

  .icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-bottom: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color);
    background: color-mix(in srgb, var(--accent-color), transparent 92%);
    border: 1px solid color-mix(in srgb, var(--accent-color), transparent 70%);
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 10px;
    color: var(--heading-color);
  }

  p {
    margin: 0;
    color: var(--default-color);
    line-height: 1.7;
  }

  /* stretched-link behavior */
  .stretched-link {
    position: static;
    h3 { position: relative; z-index: 1; }
  }

  &:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--accent-color), transparent 65%);
    box-shadow: 0 8px 26px rgba(0, 0, 0, 0.08);

    .icon {
      background: color-mix(in srgb, var(--accent-color), transparent 88%);
    }
  }
}
</style>
