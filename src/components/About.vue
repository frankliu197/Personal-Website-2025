<template lang="pug">
section#about.about.section
  .container
    .row.gy-4
      // left column
      .col-md-6
        .row.justify-content-between.gy-4
          .col-lg-5
            img.img-fluid(:src="photo", alt="")
          .col-lg-7.about-info
            p
              strong Name:
              span {{ name }}
            p
              strong Profile:
              span {{ profile }}
            p
              strong Email:
              span {{ email }}
            p
              strong Phone:
              span {{ phone }}

        // Skills
        .skills-content.skills-animation
          h5 Skills
          .progress(v-for="s in skills" :key="s.label")
            span.skill
              span {{ s.label }}
              i.val {{ s.value }}%
            .progress-bar-wrap
              .progress-bar(
                role="progressbar"
                :aria-valuenow="s.value"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{ width: skillsAnimated ? s.value + '%' : '1px' }"
              )

      // right column
      .col-md-6
        .about-me
          h4 About me
          p {{ aboutP1 }}
          p {{ aboutP2 }}
          p {{ aboutP3 }}
</template>

<script>
export default {
  name: 'About',
  props: {
    photo:   { type: String, default: '/assets/img/profile-img.jpg' },
    name:    { type: String, default: 'Morgan Freeman' },
    profile: { type: String, default: 'full stack developer' },
    email:   { type: String, default: 'contact@example.com' },
    phone:   { type: String, default: '(617) 557-0089' },
    aboutP1: { type: String, default: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.' },
    aboutP2: { type: String, default: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt.' },
    aboutP3: { type: String, default: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.' },
    skills: {
      type: Array,
      default: () => ([
        { label: 'HTML', value: 100 },
        { label: 'CSS', value: 90 },
        { label: 'JAVASCRIPT', value: 75 },
        { label: 'VUE', value: 80 }
      ])
    }
  },
  data() {
    return { skillsAnimated: false, obs: null }
  },
  mounted() {
    const el = this.$el.querySelector('.skills-content')
    if (!el) return
    this.obs = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        this.skillsAnimated = true
        this.obs.disconnect()
      }
    }, { threshold: 0.25 })
    this.obs.observe(el)
  },
  beforeUnmount() { this.obs && this.obs.disconnect() }
}
</script>

<style lang="scss" scoped>
/* card container like the template */
.about {
  .container {
    background-color: var(--surface-color);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    padding: 30px;
    border-radius: 12px;
  }
}

/* minimal grid system for this section (so Bootstrap classes actually do something) */
.row {
  display: grid;
  gap: 1.5rem;
}

/* outer two columns: 1fr 1fr from md and up */
.col-md-6 { /* marker only for semantics */ }
@media (min-width: 992px) {
  .row.gy-4 { grid-template-columns: 1fr 1fr; }
}

/* inner left split: 5/7 from lg and up */
.row.justify-content-between {
  display: grid;
  gap: 1rem 1.5rem;

  .col-lg-5,
  .col-lg-7 { min-width: 0; }
}
@media (min-width: 992px) {
  .row.justify-content-between { grid-template-columns: 5fr 7fr; align-items: start; }
}

/* image */
.img-fluid {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 6px;
  object-fit: cover;
}

/* info list */
.about-info {
  p {
    margin: 0 0 10px 0;
    color: var(--default-color);

    strong {
      color: var(--heading-color);
      margin-right: 6px;
    }
  }
}

/* skills block */
.skills-content {
  h5 {
    font-size: 18px;
    font-weight: 700;
    margin: 30px 0 15px;
  }

  .progress {
    height: 36px;
    margin-top: 15px;

    .skill {
      color: var(--default-color);
      margin-bottom: 6px;
      text-transform: uppercase;
      font-weight: 600;
      font-family: var(--heading-font);

      .val { float: right; font-style: normal; }
    }

    .progress-bar-wrap {
      height: 10px;
      background: color-mix(in srgb, var(--default-color), transparent 90%);
      border-radius: 4px;
      overflow: hidden;

      .progress-bar {
        height: 10px;
        width: 1px;
        background-color: var(--accent-color);
        transition: width .9s ease;
      }
    }
  }
}

/* right column text */
.about-me {
  h4 {
    font-size: 28px;
    font-weight: 700;
    position: relative;
    padding-bottom: 10px;
    margin-bottom: 30px;

    &::after {
      content: "";
      position: absolute;
      width: 64px;
      height: 3px;
      left: 0;
      bottom: 0;
      background: var(--accent-color);
    }
  }

  p { font-size: 18px; line-height: 1.8; }
}

/* small-screen padding like template */
@media (max-width: 576px) {
  .about .container { padding: 20px; }
}
</style>
