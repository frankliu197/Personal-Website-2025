<template lang="pug">
section#about
  .container
    .card.about-card 
      .card-body.p-4.p-md-5
        .row.gy-4.gx-5
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

            .skills
              .header.mb-3.mt-5 Skills
              .mb-3.skill-reveal(
                v-for="(s, i) in translations.skills"
                :key="s.label"
                v-reveal="{ idx: i, step: 80 }"
                :style="{ '--target': s.value + '%' }"
              )
                .d-flex.justify-content-between.align-items-center.text-uppercase.mb-1.fw-semibold
                  span {{ s.label }}
                  span.fw-bold {{ s.value }}%
                .progress.skill-progress
                  .progress-bar(
                    role="progressbar"
                    :aria-valuenow="s.value"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  )

          .col-xl-6.mt-5.mt-xl-0
            .about-me
              .section-title About me
              p {{ translations.about.p1 }}
              p {{ translations.about.p2 }}
              p {{ translations.about.p3 }}
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
    p1: "Coding is wild and unpredictable. Things break, things get messy, but that’s part of the charm. I like unraveling tangled problems and turning them into something clean, fast, and satisfying. It feels like playing detective, chasing down the pieces until everything clicks into place. That’s what makes coding fun for me. Whether it’s frontend, backend, architecture, or something algorithm heavy, I have the experience to handle it.",
    p2: "Over the years, I’ve worked in several startups where I picked up a wide range of tools. I’ve used React, Vue, and Angular on the frontend, and Spring, Flask, and Node on the backend. I’ve worked with all kinds of people, in all kinds of conditions. Whether it’s a 2am emergency or a group session trying to keep a system from falling apart, it’s just another day in an engineer’s life",
    p3: "You’ve got ambitious plans? Whether it’s full stack, architecture focused, machine learning, or even something technically sales driven, I’m in.",
  },
  skills: [
    { label: 'Front End Engineering', value: 98 },
    { label: 'Back End Engineering', value: 95 },
    { label: 'Full Stack Engineering', value: 95 },
    { label: 'Data Engineering', value: 80 },
    { label: 'Dev Ops', value: 60 }
  ]
}
export default {
  name: 'Frank Liu',
  
  data() {
    return { translations, profileImage }
  }
}
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

  .skill-progress {
    --bs-progress-height: 8px;
    --bs-progress-bg: #e9ecef;
    --bs-progress-border-radius: 0;

    border-radius: 0;
    box-shadow: none;

    .progress-bar {
      background-color: var(--accent-color, #0d6efd);
      border-radius: 0;
      box-shadow: none;

      /* start at 0 until .is-visible arrives from directive */
      width: 0%;
      transition: width .8s ease;
    }
  }

  /* When visible (down-scroll), animate width to target */
  .skill-reveal.is-visible .progress-bar {
    width: var(--target, 0%);
  }

  /* Up-scroll re-entry shows instantly (no transition) */
  .skill-reveal.no-anim .progress-bar {
    transition: none !important;
  }

  .skills {
    .d-flex span:first-child {
      font-size: 0.75rem;
      color: #6c757d;
      font-weight: 600;
    }
    .d-flex span:last-child {
      font-size: 0.75rem;
      color: var(--heading-color);
      font-weight: 700;
    }
  }

  p {
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .section-title::after { margin: 0; }
}
</style>
