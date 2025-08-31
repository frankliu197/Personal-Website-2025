<template lang="pug">
component(:is="href ? 'a' : 'div'"
          class="card fl-card h-100 shadow-sm transition"
          :href="href || undefined"
          :target="target || undefined"
          :rel="rel || undefined"
          role="article")
  .card-body
    .chip.mb-3(:style="{ '--chip': chipSize + 'px' }")
      component(:is="icon" :size="iconSize" stroke-width="2" aria-hidden="true" class="text-accent")
    h3.fw-bold.h5.mb-2 {{ title }}
    p.mb-0(v-if="desc") {{ desc }}
    <slot />
</template>

<script lang="ts">
import { defineComponent, type PropType, type Component } from 'vue'

export default defineComponent({
  name: 'FLCard',
  props: {
    icon:      { type: Object as PropType<Component>, required: true },
    title:     { type: String, required: true },
    desc:      { type: String, default: '' },
    href:      { type: String, default: '' },
    target:    { type: String, default: '' },
    rel:       { type: String, default: '' },
    chipSize:  { type: Number, default: 56 },
    iconSize:  { type: Number, default: 28 }
  }
})
</script>

<style lang="scss" scoped>
.fl-card {
  border: 1px solid color-mix(in srgb, var(--default-color), transparent 88%);
  border-radius: 12px;
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease, background-color .2s ease;

  .card-body { padding: 32px 24px; }

  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent-color) !important;
    box-shadow: 0 8px 26px rgba(0, 0, 0, 0.08);
    background-color: #fff;
  }
}

/* icon chip using a CSS var for size */
.chip {
  --chip: 56px;
  width: var(--chip);
  height: var(--chip);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
  background: color-mix(in srgb, var(--accent-color), transparent 92%);
  border: 1px solid color-mix(in srgb, var(--accent-color), transparent 70%);
}

.text-accent { color: var(--accent-color) !important; }
.transition { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
</style>
