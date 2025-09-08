<template lang="pug">
section#about
  .container
    .card.about-card 
      .card-body.p-4.p-md-5
        .row.gy-4.gx-5
          // top row: profile + about
          .col-xl-6
            .row.gy-4.align-items-start
              .col-md-5
                img.img-fluid(:src="profileImage", alt="")
              .col-md-7
                p
                  strong Name: 
                  span {{ translations.name }}
                p
                  strong Profile: 
                  span {{ translations.profile }}
                p
                  strong Email: 
                  span {{ translations.email }}
                p
                  strong Phone: 
                  span {{ translations.phone }}

          .col-xl-6.mt-5.mt-xl-0
            .about-me
              .section-title About me
              p {{ translations.about.p1 }}
              p {{ translations.about.p2 }}

        // new row: skills
        .row.mt-5.gx-5
          .col-md-6
            .skills
              .header.mb-3 Skills
              .mb-4(
                v-for="(s, i) in firstColSkills"
                :key="s.area"
                v-reveal="{ idx: i, step: 80 }"
              )
                .d-flex.justify-content-between.align-items-center.mb-1
                  .text-uppercase.fw-semibold.small {{ s.area }}
                  .badge.level(:class="'level-' + s.level.toLowerCase()") {{ s.level }}
                .toolbox.mt-1
                  span.badge.tool(v-for="t in s.tools" :key="t") {{ t }}
                p.proof.mt-2(v-if="s.proof") {{ s.proof }}

          .col-md-6
            .skills
              .header.mb-3.d-none.d-md-block &nbsp; <!-- empty header for alignment -->
              .mb-4(
                v-for="(s, i) in secondColSkills"
                :key="s.area"
                v-reveal="{ idx: i + firstColSkills.length, step: 80 }"
              )
                .d-flex.justify-content-between.align-items-center.mb-1
                  .text-uppercase.fw-semibold.small {{ s.area }}
                  .badge.level(v-if="s.level" :class="'level-' + s.level.toLowerCase()") {{ s.level }}
                .toolbox.mt-1
                  span.badge.tool(v-for="t in s.tools" :key="t") {{ t }}
                p.proof.mt-2(v-if="s.proof") {{ s.proof }}
</template>

<script>
import { defineComponent } from 'vue'
import profileImage from '@/assets/img/profile.jpg'

const translations = {
  name: 'Frank Liu',
  profile: 'Full Stack Developer',
  email: 'frankliu197@gmail.com',
  phone: '+1 (613) 322 6347',
  about: {
    p1: "I turn messy systems into fast, predictable products. I hunt bugs, remove bottlenecks, and ship clean interfaces that survive real users.",
    p2: "Recent work: scaled a crawler with RabbitMQ and safe restarts, built a Vue proctoring UI with live terminal streaming, and tightened auth and caching for noisy traffic. If your roadmap is ambitious, I can help you land it."
  },
  skillGroups: [
    {
      area: 'Front End',
      level: 'Expert',
      tools: ['Vue', 'React', 'Angular', 'TypeScript', 'Pinia'],
      proof: 'Built proctoring UI with live terminal streaming and custom perf fixes.'
    },
    {
      area: 'Back End',
      level: 'Expert',
      tools: ['Node', 'Python', 'Flask', 'PostgreSQL', 'Redis', 'RabbitMQ', 'GraphQL'],
      proof: 'Orchestrated distributed crawler jobs with safe restarts and queueing.'
    },
    {
      area: 'Architecture',
      level: 'Expert',
      tools: ['Microservices', 'WebSockets', 'RabbitMq', 'Caching', 'Observability'],
      proof: 'Turned monolith features into scalable services with metrics in place.'
    },
    {
      area: 'DevOps',
      level: 'Working',
      tools: ['Docker', 'Kubernetes', 'Nginx', 'CI', 'Linux'],
      proof: 'Containerized apps and tightened build times with sane caching.'
    },
    {
      area: 'Accessibility',
      tools: ['WCAG 2.1', 'VPAT'],
      proof: 'Audited web apps, analyzed VPAT reports, and fixed 30+ accessibility bugs end-to-end.'
    }
  ]
}

export default defineComponent({
  name: 'AboutSection',
  data() {
    return { translations, profileImage }
  },
  computed: {
    // Split skills evenly into two columns
    firstColSkills() {
      const mid = Math.ceil(this.translations.skillGroups.length / 2)
      return this.translations.skillGroups.slice(0, mid)
    },
    secondColSkills() {
      const mid = Math.ceil(this.translations.skillGroups.length / 2)
      return this.translations.skillGroups.slice(mid)
    }
  }
})
</script>

<style lang="scss">
#about {
  .about-card {
    border: 1px solid color-mix(in srgb, var(--default-color, #000), transparent 88%);
    border-radius: 6px;
    box-shadow: 0 6px 18px rgba(0,0,0,.06);
  }

  .img-fluid {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 4px;
    object-fit: cover;
  }

  .skills {
    .badge.level {
      font-size: .7rem;
      padding: .25rem .5rem;
      border-radius: 999px;
    }
    .level-expert   { background: #e7f1ff; color: #0d6efd; }
    .level-advanced { background: #eef9f0; color: #198754; }
    .level-working  { background: #fff7e6; color: #fd7e14; }

    .toolbox {
      display: flex;
      flex-wrap: wrap;
      gap: .35rem .5rem;
    }
    .badge.tool {
      background: #f1f3f5;
      color: #495057;
      font-weight: 600;
      border-radius: 999px;
      padding: .3rem .6rem;
      font-size: .72rem;
    }
    .proof {
      font-size: .85rem;
      color: #6c757d;
      margin: 0;
    }
  }

  .section-title::after { margin: 0; }
}
</style>
