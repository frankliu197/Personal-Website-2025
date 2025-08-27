<template lang="pug">
section#resume.resume.section
  .container.section-title
    h2 Resume
    p Check my resume

  .container
    .row.gy-4
      // left column
      .col-lg-6
        h3.resume-title Summary
        .resume-item
          h4 {{ translations.summary.name.toUpperCase() }}
          p
            em {{ translations.summary.about }}
          ul
            li {{ translations.summary.address }}
            li
              | Phone:
              = ' '
              a(:href="'tel:' + translations.summary.phone") {{ translations.summary.phone }}
            li
              | Email:
              = ' '
              a(:href="'mailto:' + translations.summary.email") {{ translations.summary.email }}

        h3.resume-title Education
        .resume-item(v-for="(edu, i) in translations.education" :key="'edu-'+i")
          h4 {{ edu.title.toUpperCase() }}
          h5.years {{ edu.years }}
          p
            em {{ edu.school }}
          p(v-if="edu.desc") {{ edu.desc }}

      // right column
      .col-lg-6
        h3.resume-title Professional Experience
        .resume-item(v-for="(job, j) in translations.experience" :key="'job-'+j")
          h4 {{ job.title.toUpperCase() }}
          h5.years {{ job.years }}
          p
            em {{ job.company }}
          ul
            li(v-for="(pt, k) in job.points" :key="k") {{ pt }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const translations = {
  summary: {
    name: 'Frank Liu',
    about:
      'Innovative and deadline-driven Software Engineer with 4+ years of experience designing, building, and optimizing scalable applications.',
    address: 'Toronto, Canada',
    phone: '+1 (613) 322-6347',
    email: 'frankliu197@gmail.com'
  },
  education: [
    {
      title: 'Bachelor of Computer Science',
      years: '2016 - 2020',
      school: 'Carleton University, Ottawa, Canada',
      desc: 'Focused on software engineering, distributed systems, and machine learning.'
    },
    {
      title: 'High School Diploma',
      years: '2012 - 2016',
      school: 'Lisgar Collegiate Institute, Ottawa, Canada',
      desc: ''
    }
  ],
  experience: [
    {
      title: 'Software Engineer',
      years: '2022 - Present',
      company: 'Remote Technology Solutions',
      points: [
        'Led frontend development of a proctoring/terminal-streaming platform using Vue, Xterm.js, WebSockets, and Pinia.',
        'Implemented performance tuning, custom throttling, and cross-browser debugging solutions.',
        'Collaborated with distributed teams to deliver secure and scalable features.'
      ]
    },
    {
      title: 'Accessibility Engineer',
      years: '2020 - 2022',
      company: 'Level Access',
      points: [
        'Scaled a web crawler from 1K → 10K pages using RabbitMQ orchestration.',
        'Performed WCAG 2 audits, VPAT analysis, and fixed 30+ accessibility bugs across client sites.',
        'Built accessibility dashboards to track compliance and testing results.'
      ]
    }
  ]
}

export default defineComponent({
  name: 'Resume',
  data() {
    return { translations }
  }
})
</script>

<style lang="scss">
#resume {
  .row { display: grid; gap: 1.75rem; }
  @media (min-width: 992px) {
    .row.gy-4 { grid-template-columns: 1fr 1fr; }
  }

  .resume-title {
    font-size: 26px;
    font-weight: 700;
    color: var(--heading-color);
    margin: 20px 0 16px;
  }

  .resume-item {
    position: relative;
    padding: 0 0 24px 24px;
    border-left: 3px solid color-mix(in srgb, var(--accent-color), transparent 70%);

    &::before {
      content: "";
      position: absolute;
      left: -9px;
      top: 0;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--surface-color);
      border: 3px solid var(--accent-color);
    }

    h4 {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 8px;
      color: var(--heading-color);
      text-transform: uppercase;
    }

    .years {
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 10px;
      color: var(--heading-color);
    }

    p { margin: 0 0 10px; }
    ul { margin: 0; padding-left: 18px; li { margin: 8px 0; } }

    a {
      color: inherit;
      text-decoration: none;
      &:hover { color: var(--accent-color); }
    }
  }

  .col-lg-6 > .resume-item:first-of-type::before {
    width: 16px;
    height: 16px;
    left: -10px;
  }

}
</style>
