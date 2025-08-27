<template lang="pug">
section#about.about.section
  .container
    .row.gy-4
      // left column
      .col-md-6
        .row.justify-content-between.gy-4
          .col-lg-5
            img.img-fluid(:src="profileImage", alt="")
          .col-lg-7.about-info
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

        // Skills
        .skills-content.skills-animation
          h5 Skills
          .progress(v-for="s in translations.skills" :key="s.label")
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
          p {{ translations.about.p1 }}
          p {{ translations.about.p2 }}
          p {{ translations.about.p3 }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import profileImage from '@/assets/img/profile.jpg'

const translations = {
        name: 'Frank Liu',
        profile: 'Full Stack Developer',
        email: 'frankliu197@gmail.com',
        phone: '+1 (613) 322 6347',
        about: {
          p1: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
          p2: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt.',
          p3: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
        },
        skills: [
          { label: 'HTML', value: 100 },
          { label: 'CSS', value: 90 },
          { label: 'JAVASCRIPT', value: 75 },
          { label: 'VUE', value: 80 }
        ]
      }

export default defineComponent({
  name: 'About',
  data() {
    return {
      profileImage,
      translations,
      skillsAnimated: false,
      obs: null as IntersectionObserver | null
    }
  },
  mounted() {
    const el = (this.$el as HTMLElement).querySelector('.skills-content')
    if (!el) return
    this.obs = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        this.skillsAnimated = true
        this.obs?.disconnect()
      }
    }, { threshold: 0.25 })
    this.obs.observe(el)
  },
  beforeUnmount() {
    this.obs?.disconnect()
  }
})
</script>

<style lang="scss">
/* same SCSS you had, unchanged */
#about {
  .container {
    background-color: var(--surface-color);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    padding: 30px;
    border-radius: 12px;
  }
  .row {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 992px) {
  .row.gy-4 { grid-template-columns: 1fr 1fr; }
}

.row.justify-content-between {
  display: grid;
  gap: 1rem 1.5rem;

  .col-lg-5,
  .col-lg-7 { min-width: 0; }
}
@media (min-width: 992px) {
  .row.justify-content-between { grid-template-columns: 5fr 7fr; align-items: start; }
}

.img-fluid {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 6px;
  object-fit: cover;
}

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

@media (max-width: 576px) {
  .about .container { padding: 20px; }
}
}
</style>
