<template lang="pug">
section#resume.resume.section
  // section title like the template
  .container.section-title
    h2 Resume
    p Check my resume

  // content with two columns, no card wrapper
  .container
    .row.gy-4
      // left column
      .col-lg-6
        h3.resume-title Summary
        .resume-item
          h4 {{ summaryName.toUpperCase() }}
          p
            em {{ summaryAbout }}
          ul
            li {{ summaryAddress }}
            li
              | Phone:
              = ' '
              a(:href="'tel:' + summaryPhone") {{ summaryPhone }}
            li
              | Email:
              = ' '
              a(:href="'mailto:' + summaryEmail") {{ summaryEmail }}

        h3.resume-title Education
        .resume-item(v-for="(edu, i) in education" :key="'edu-'+i")
          h4 {{ edu.title.toUpperCase() }}
          h5.years {{ edu.years }}
          p
            em {{ edu.school }}
          p(v-if="edu.desc") {{ edu.desc }}

      // right column
      .col-lg-6
        h3.resume-title Professional Experience
        .resume-item(v-for="(job, j) in experience" :key="'job-'+j")
          h4 {{ job.title.toUpperCase() }}
          h5.years {{ job.years }}
          p
            em {{ job.company }}
          ul
            li(v-for="(pt, k) in job.points" :key="k") {{ pt }}
</template>

<script>
export default {
  name: 'Resume',
  props: {
    summaryName:   { type: String, default: 'Brandon Johnson' },
    summaryAbout:  { type: String, default: 'Innovative and deadline-driven Graphic Designer with 3+ years of experience designing and developing user-centered digital and print marketing material from initial concept to final deliverable.' },
    summaryAddress:{ type: String, default: 'Portland par 127, Orlando, FL' },
    summaryPhone:  { type: String, default: '(123) 456-7891' },
    summaryEmail:  { type: String, default: 'alice.barkley@example.com' },

    education: {
      type: Array,
      default: () => ([
        { title: 'Master of Fine Arts & Graphic Design', years: '2015 - 2016', school: 'Rochester Institute of Technology, Rochester, NY', desc: 'Qui deserunt veniam. Et sed aliquam labore tempore sed quisquam iusto autem sit.' },
        { title: 'Bachelor of Fine Arts & Graphic Design', years: '2010 - 2014', school: 'Rochester Institute of Technology, Rochester, NY', desc: 'Quia nobis sequi est occaecati aut. Repudiandae et iusto quae reiciendis.' }
      ])
    },

    experience: {
      type: Array,
      default: () => ([
        { title: 'Senior Graphic Design Specialist', years: '2019 - Present', company: 'Experion, New York, NY', points: [
          'Lead in the design, development, and implementation of the graphic, layout, and production communication materials.',
          'Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project.',
          'Supervise the assessment of all graphic materials to ensure quality and accuracy of the design.',
          'Oversee the efficient use of project budgets ranging from $2,000 - $25,000.'
        ]},
        { title: 'Graphic Design Specialist', years: '2017 - 2018', company: 'Stepping Stone Advertising, New York, NY', points: [
          'Developed numerous marketing programs such as logos, brochures, presentations, and ads.',
          'Managed up to 5 projects or tasks at a time under pressure.',
          'Recommended design solutions that met client goals.',
          'Created 4+ design presentations and proposals a month for clients and managers.'
        ]}
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
/* two-column layout */
.row { display: grid; gap: 1.75rem; }
@media (min-width: 992px) {
  .row.gy-4 { grid-template-columns: 1fr 1fr; }
}

/* headings */
.resume-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--heading-color);
  margin: 20px 0;
}

/* timeline items like the template: thin blue rail with round markers */
.resume-item {
  position: relative;
  padding: 0 0 24px 24px;
  margin-top: -2px;
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
    margin: 0 0 10px;
    color: var(--heading-color);
    text-transform: uppercase;
  }

  .years, h5.years {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 10px;
    color: var(--heading-color);
  }

  p { margin: 0 0 10px; }
  ul { margin: 0; padding-left: 18px; li { margin: 8px 0; } }

  a { color: inherit; text-decoration: none; &:hover { color: var(--accent-color); } }
}

/* slightly larger marker for the first item in each column */
.col-lg-6 > .resume-item:first-of-type::before { width: 16px; height: 16px; left: -10px; }
</style>
