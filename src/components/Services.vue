<template lang="pug">
section#services.services.section
  .container.section-title
    h2 Services
    p What I can help you with

  .container
    .row.gy-4
      .col-lg-4.col-md-6(
        v-for="(s, i) in services"
        :key="i"
      )
        .service-item.position-relative
          .icon
            component(:is="s.icon" size="28" stroke-width="2" aria-hidden="true")
          a.stretched-link(href="#")
            h3 {{ s.title }}
          p {{ s.desc }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Activity, Box, Presentation, MapPin, Camera, MessageSquareText } from "lucide-vue-next"

// All services in one object
const services = [
  {
    icon: Activity,
    title: 'Scalable Web Apps',
    desc: 'Building performant, scalable, and maintainable frontend and backend systems.'
  },
  {
    icon: Box,
    title: 'System Design',
    desc: 'Architecting distributed systems with efficiency, security, and resilience in mind.'
  },
  {
    icon: Presentation,
    title: 'Product Demos',
    desc: 'Creating interactive product presentations and prototypes to validate ideas quickly.'
  },
  {
    icon: MapPin,
    title: 'Remote Collaboration',
    desc: 'Helping teams deliver across time zones with async-first workflows and processes.'
  },
  {
    icon: Camera,
    title: 'Creative Media',
    desc: 'Designing visuals, animations, and digital assets to support brand identity.'
  },
  {
    icon: MessageSquareText,
    title: 'Consulting & Mentorship',
    desc: 'Guiding teams in best practices for software engineering, DevOps, and accessibility.'
  }
]

export default defineComponent({
  name: 'Services',
  data() {
    return { services }
  }
})
</script>

<style lang="scss">
#services {
  .row {
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

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

}
</style>
