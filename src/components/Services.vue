<template lang="pug">
section#services
  .section-header
    .title Services
    .subtitle What I bring to the table

  .container
    .row.g-4
      .col-lg-4.col-md-6.service-reveal(
        v-for="(s, i) in services"
        :key="i"
        v-reveal="{ idx: i, step: 80 }"
      )
        FLCard(:icon="s.icon" :title="s.title" :desc="s.desc")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FLCard from '@/components/FLCard.vue'
import { Code, Layers, Database, Globe, Users, Lightbulb } from 'lucide-vue-next'

const services = [
  { icon: Code,      title: 'Programming Languages',         desc: 'TypeScript, JavaScript, Python, Java, C, SQL.' },
  { icon: Layers,    title: 'Frameworks & Libraries',        desc: 'Vue, React, Angular, Spring Boot, Flask, Express, Node.js.' },
  { icon: Database,  title: 'Systems & Databases',           desc: 'Docker, Kubernetes, RabbitMQ, Redis, PostgreSQL, SQL, MongoDB.' },
  { icon: Globe,     title: 'Human Languages',               desc: 'English, Mandarin. Intermediate Portuguese, French, Spanish.' },
  { icon: Users,     title: 'Communication & Collaboration', desc: 'Mentoring, async-first workflows, clear writing and speaking.' },
  { icon: Lightbulb, title: 'Creative & Problem Solving',    desc: 'Debugging, architecture, rapid prototyping, UX empathy.' }
]

export default defineComponent({
  name: 'Services',
  components: { FLCard },
  data() { return { services } },
})
</script>

<style lang="scss">
#services {
  .service-reveal {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
    transition:
      opacity .5s ease,
      transform .5s ease,
      box-shadow .2s ease;
    will-change: opacity, transform;
  }
  
  .service-reveal.is-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  
  .service-reveal.no-anim {
    transition: none !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .service-reveal,
    .service-reveal.is-visible {
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
}
</style>
