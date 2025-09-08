<template lang="pug">
section#resume
  .section-header
    .title Resume

  .container-fluid
    .row.justify-content-center
      .col-xxl-11.col-12.px-3.px-md-4
        .timeline(position="relative")
          .timeline-line

          .timeline-item.resume-reveal(
            v-for="(item, i) in timeline"
            :key="i"
            :class="[{ left: i % 2 === 0, right: i % 2 === 1 }]"
            v-reveal="{ idx: i, step: 90 }"
            :style="{ transitionDelay: (i * 90) + 'ms' }"
          )
            .dot
            component.shadow-sm.card-link-wrapper(
              :is="item.link ? 'a' : 'div'"
              :href="item.link || undefined"
              target="_blank"
              rel="noopener"
            )
              .card.shadow-sm
                .tooltip-hover(v-if="item.link") Visit website

                .card-body
                  .year.text-uppercase.fw-bold.mb-2 {{ item.years }}
                  h4.item-title.mb-1 {{ item.title }}
                  p.item-subtitle.mb-2(v-if="item.subtitle") {{ item.subtitle }}

                  p.mb-3(v-if="item.text") {{ item.text }}

                  ul.mb-0.ps-3(v-if="item.points && item.points.length")
                    li(v-for="(pt, k) in item.points" :key="k") {{ pt }}
</template>

<script lang="ts">
type TimelineItem = {
  years: string
  title: string
  subtitle?: string
  text?: string
  points?: string[]
  link?: string
}

const experience: TimelineItem[] = [
  {
    years: '12/2024 – Present',
    title: 'Lead Full Stack Engineer',
    subtitle: 'Remote Technology Solutions – Remote',
    points: [
      'Accelerated canvas display and resize performance by 9× by throttling and resolving layout bottlenecks in a WebSocket terminal handling 15+ concurrent Telnet sessions.',
      'Stabilized cross-platform Docker deployments by fixing 4 critical configuration/runtime bugs, ensuring consistent behavior on Chrome, Firefox, and Edge.',
      'Optimized and redesigned the Pinia store in Vue to fix an asynchronous race condition between API data and UI rendering, boosting stability, reliability, and performance for real-time data flows.'
    ]
  },
  {
    years: '05/2022 – 09/2024',
    title: 'Full Stack Engineer',
    subtitle: 'Level Access – Ottawa, ON',
    points: [
      'Achieved full WCAG 2.2 compliance and improved accessibility for thousands of users by resolving 20+ blockers in partnership with auditors and product teams in an Agile SaaS startup environment.',
      'Scaled enterprise web crawler capacity 10× (1K → 10K pages per job) by overhauling architecture with RabbitMQ task orchestration, Redis caching, and failure recovery for large-scale audits.',
      'Cut MongoDB query latency from 30s to <1s by diagnosing production bottlenecks with monitoring and observability tools (AWS logs, Datadog) and optimizing database queries on 700M+ record datasets.',
      'Built and tested Angular components for responsive, mobile-friendly UIs using RxJS and reactive forms, Figma mockups, and automated unit tests (Jasmine/Karma) plus end-to-end tests (Cypress).',
      'Designed secure Express REST APIs in a microservice architecture with authentication, authorization, and role-based access, enabling public APIs while ensuring data integrity.'
    ]
  },
  {
    years: '05/2021 – 08/2021',
    title: 'Full Stack Engineer',
    subtitle: 'Red Canari – Ottawa, ON',
    points: [
      'Architected a proxy-layer database in a React front-end, applying the SQL hook design pattern and efficient data structures with live schema enforcement, uncovering 40+ critical data integrity failures.'
    ]
  },
  {
    years: '05/2020 – 04/2021',
    title: 'Software Engineer',
    subtitle: 'Ericsson – Ottawa, ON',
    points: [
      'Accelerated 5G validation cycles by 53% and improved failure detection by engineering a network traffic simulator backed by PostgreSQL and Spring Boot, for high-fidelity system testing.',
      'Uncovered 5,000+ structural inconsistencies by developing Python tooling to validate JSON schemas in Kubernetes, integrated into DevOps CI/CD pipelines.'
    ]
  },
  {
    years: '05/2019 – 08/2019',
    title: 'Software Developer',
    subtitle: 'Kinaxis – Ottawa, ON',
    points: [
      'Developed a full-stack web dashboard (Vue, Express, SQLite) integrated with Elastic Stack APIs, enabling real-time graph generation and analytics for large-scale datasets.',
      'Automated REST API testing with Mocha/Chai, improving backend reliability and cutting manual QA effort by 40%.'
    ]
  },
  {
    years: '05/2018 – 08/2018',
    title: 'Software Developer',
    subtitle: 'Carleton University – Ottawa, ON',
    points: [
      'Engineered a Java interoperability layer that enabled seamless dataset transfers between DL4J and Keras machine learning frameworks, expanding cross-platform research capabilities.',
      'Refactored and optimized the Java Learning by Observation Framework, improving runtime speed, scalability, and modularity for academic and research use cases.'
    ]
  }
]

const education: TimelineItem[] = [
  {
    years: '09/2017 – 04/2022',
    title: 'Bachelor of Engineering: Software Engineer, Co-op',
    subtitle: 'Carleton University – Ottawa, Ontario 3.8 GPA',
    link: 'https://carleton.ca/',
  }
]

const timeline: TimelineItem[] = [...experience, ...education]

export default {
  name: 'Resume',
  data() {
    return { timeline }
  }
}
</script>

<style lang="scss">
#resume {
  .title {
    text-align: center;
    margin-bottom: 1.5rem;
  }
}

.timeline {
  position: relative;
  width: 100%;
  padding: 1rem 0 2rem;

  .timeline-line {
    position: absolute;
    inset: 0;
    margin: 0 auto;
    width: 4px;
    background: color-mix(in srgb, var(--accent-color, #0d6efd), transparent 65%);
    border-radius: 999px;
  }

  .timeline-item {
    position: relative;
    width: 50%;
    padding: 0 2rem;
    margin: 1.25rem 0;
    opacity: 0;
    transform: translateY(14px) scale(.98);
    transition: opacity .5s ease, transform .5s ease;

    &.is-visible {
      opacity: 1;
      transform: none;
    }

    &.left {
      margin-right: auto;

      .card {
        margin-left: auto;
      }

      .dot {
        left: 100%;
        transform: translate(-50%, -50%);
      }
    }

    &.right {
      margin-left: auto;

      .card {
        margin-right: auto;
      }

      .dot {
        left: 0;
        transform: translate(-50%, -50%);
      }
    }

    .card-link-wrapper {
      text-decoration: none;
      display: block;

      .tooltip-hover {
        position: absolute;
        top: -8px;
        right: 12px;
        background: rgba(50, 50, 50, 0.85);
        color: #fff;
        font-size: 0.75rem;
        padding: 4px 10px;
        border-radius: 6px;
        font-weight: 500;
        pointer-events: none;
        white-space: nowrap;

        opacity: 0;
        transform: translateY(-4px);
        transition: opacity .15s ease-in, transform .15s ease-in;
      }

      &:hover .tooltip-hover {
        opacity: 1;
        transform: translateY(-8px);
      }

      .card {
        border: 2px solid transparent;
        transition: border-color .25s ease, box-shadow .25s ease;
      }

      &:hover .card {
        border-color: var(--accent-color, #0d6efd);
        box-shadow: 0 10px 28px rgba(0, 0, 0, .28);
      }

      &:focus-visible .card {
        outline: 0;
        border-color: var(--accent-color, #0d6efd);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color), transparent 65%);
      }
    }

    .year {
      letter-spacing: .04em;
    }

    .item-subtitle {
      opacity: .85;
    }

    .dot {
      position: absolute;
      top: 50%;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--accent-color, #0d6efd);
      border: 2px solid color-mix(in srgb, var(--accent-color), transparent 30%);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-color), transparent 80%);
    }
  }
}

@media (max-width: 992px) {
  .timeline {
    .timeline-line {
      left: 24px;
      margin: 0;
    }

    .timeline-item {
      width: 100%;
      padding-left: 3.25rem;
      padding-right: 0;

      &.left,
      &.right {
        .card-link-wrapper .card {
          margin: 0;
        }

        .dot {
          left: 24px;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .timeline .timeline-item {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
