<template lang="pug">
section#portfolio.portfolio.section
  // section title
  .container.section-header
    h2 Portfolio
    p Check my work

  .container
    // filters
    .portfolio-filters
      ul
        li(:class="{ 'filter-active': activeFilter === 'all' }" @click="setFilter('all')") All
        li(:class="{ 'filter-active': activeFilter === 'app' }" @click="setFilter('app')") App
        li(:class="{ 'filter-active': activeFilter === 'card' }" @click="setFilter('card')") Card
        li(:class="{ 'filter-active': activeFilter === 'web' }" @click="setFilter('web')") Web

    // grid
    .row.gy-4
      .col-lg-4.col-md-6(v-for="item in visibleItems" :key="item.id")
        .portfolio-item(:class="'filter-' + item.category")
          .portfolio-content
            img.img-fluid(:src="item.thumb", :alt="item.title")
            .portfolio-info
              h4 {{ item.title }}
              p {{ item.category.toUpperCase() }}
              .actions
                a.preview(href="#", @click.prevent="openLightbox(item)") 🔍
                a.details(:href="item.detailsHref || '#portfolio-details'") ➜

  // simple lightbox
  .lightbox(v-if="lightboxItem" @click.self="closeLightbox")
    .lightbox-inner
      img(:src="lightboxItem.full || lightboxItem.thumb", :alt="lightboxItem.title")
      button.close(@click="closeLightbox", aria-label="Close") ×
      .lightbox-caption
        h4 {{ lightboxItem.title }}
        p {{ lightboxItem.category.toUpperCase() }}
</template>

<script>
export default {
  name: 'Portfolio',
  props: {
    items: {
      type: Array,
      default: () => ([
        { id: 1, category: 'app',  title: 'App 1',  thumb: '/assets/img/portfolio/portfolio-1.jpg',  full: '/assets/img/portfolio/portfolio-1.jpg',  detailsHref: '' },
        { id: 2, category: 'web',  title: 'Web 1',  thumb: '/assets/img/portfolio/portfolio-2.jpg',  full: '/assets/img/portfolio/portfolio-2.jpg',  detailsHref: '' },
        { id: 3, category: 'card', title: 'Card 1', thumb: '/assets/img/portfolio/portfolio-3.jpg',  full: '/assets/img/portfolio/portfolio-3.jpg',  detailsHref: '' },
        { id: 4, category: 'app',  title: 'App 2',  thumb: '/assets/img/portfolio/portfolio-4.jpg',  full: '/assets/img/portfolio/portfolio-4.jpg',  detailsHref: '' },
        { id: 5, category: 'web',  title: 'Web 2',  thumb: '/assets/img/portfolio/portfolio-5.jpg',  full: '/assets/img/portfolio/portfolio-5.jpg',  detailsHref: '' },
        { id: 6, category: 'card', title: 'Card 2', thumb: '/assets/img/portfolio/portfolio-6.jpg',  full: '/assets/img/portfolio/portfolio-6.jpg',  detailsHref: '' }
      ])
    },
    defaultFilter: { type: String, default: 'all' } // 'all' | 'app' | 'card' | 'web'
  },
  data() {
    return {
      activeFilter: this.defaultFilter,
      lightboxItem: null
    }
  },
  computed: {
    visibleItems() {
      if (this.activeFilter === 'all') return this.items
      return this.items.filter(i => i.category === this.activeFilter)
    }
  },
  methods: {
    setFilter(f) { this.activeFilter = f },
    openLightbox(item) { this.lightboxItem = item },
    closeLightbox() { this.lightboxItem = null }
  }
}
</script>

<style lang="scss" scoped>
/* filters */
.portfolio-filters {
  text-align: center;
  margin-bottom: 24px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: inline-flex;
    gap: 14px;
    border: 1px solid color-mix(in srgb, var(--default-color), transparent 85%);
    border-radius: 50px;
    padding: 8px 12px;
    background: var(--surface-color);

    li {
      cursor: pointer;
      padding: 8px 14px;
      border-radius: 26px;
      font-weight: 600;
      color: var(--default-color);
      transition: background .2s ease, color .2s ease;

      &.filter-active,
      &:hover {
        background: var(--accent-color);
        color: var(--contrast-color);
      }
    }
  }
}

/* grid like template */
.row {
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px)  { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (min-width: 992px)  { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

.portfolio-item {
  .portfolio-content {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    border: 1px solid color-mix(in srgb, var(--default-color), transparent 88%);
    background: var(--surface-color);

    img {
      width: 100%;
      height: 100%;
      max-height: 360px;
      object-fit: cover;
      transition: transform .4s ease;
      display: block;
    }

    .portfolio-info {
      position: absolute;
      inset: auto 0 0 0;
      background: linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,0));
      color: #fff;
      padding: 16px 14px;
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 10px;

      h4 {
        margin: 0;
        font-size: 18px;
        font-weight: 700;
      }
      p {
        margin: 0;
        opacity: .9;
        font-size: 12px;
        letter-spacing: .08em;
      }

      .actions {
        display: inline-flex;
        gap: 8px;

        a {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #fff;
          background: color-mix(in srgb, var(--accent-color), transparent 20%);
          text-decoration: none;
          border: 1px solid color-mix(in srgb, #ffffff, transparent 70%);
          transition: transform .15s ease, filter .2s ease;

          &:hover { transform: translateY(-1px); filter: brightness(1.1); }
        }
      }
    }

    &:hover img { transform: scale(1.06); }
  }
}

/* lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,.8);
  display: grid;
  place-items: center;
  padding: 20px;

  .lightbox-inner {
    position: relative;
    max-width: min(92vw, 1280px);
    max-height: 86vh;
    background: #000;
    border-radius: 10px;
    overflow: hidden;
    display: grid;
    grid-template-rows: 1fr auto;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #000;
  }

  .lightbox-caption {
    color: #fff;
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    gap: 12px;

    h4 { margin: 0; font-size: 16px; }
    p  { margin: 0; font-size: 12px; opacity: .85; letter-spacing: .08em; }
  }

  .close {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,.14);
    border: 1px solid rgba(255,255,255,.2);
    color: #fff;
    font-size: 24px;
    line-height: 0;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: background .2s ease;

    &:hover { background: rgba(255,255,255,.24); }
  }
}
</style>
