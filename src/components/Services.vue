<template lang="pug">
section#services
  .section-header
    .title Services

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
import { Code, Layers, Database, Globe, Users, Lightbulb, Zap, Shield } from 'lucide-vue-next'

const services = [
  { icon: Code,     title: 'Web Development',          desc: 'Responsive, accessible, and fast websites built with modern frameworks.' },
  { icon: Layers,   title: 'System Design',            desc: 'Scalable backends with microservices, queues, and caching strategies.' },
  { icon: Zap,      title: 'Performance Optimization', desc: 'Profiling and tuning apps to eliminate bottlenecks across the stack.' },
  { icon: Shield,   title: 'Accessibility Audits',     desc: 'Fixing WCAG issues and delivering inclusive user experiences.' },
  { icon: Users,    title: 'Collaboration & Mentorship', desc: 'Leading projects, mentoring developers, async-first workflows.' },
  { icon: Globe,    title: 'Multilingual Communication', desc: 'English, Mandarin, Portuguese, French, and Spanish for global collaboration.' }
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
