/**
 * v-reveal
 * --------
 * A Vue directive for scroll-based "reveal" animations.
 *
 * How it works:
 *  - Watches scroll direction globally ("down" vs "up").
 *  - Uses IntersectionObserver to detect when each element enters or exits.
 *  - When entering while scrolling down:
 *      -> Adds `is-visible` (with transition).
 *  - When entering while scrolling up:
 *      -> Adds `is-visible` AND `no-anim`, so it becomes visible instantly.
 *         Then removes `no-anim` on the next frame, so the element
 *         is "armed" to animate again when scrolling down later.
 *  - When exiting:
 *      -> Removes `is-visible` depending on the exit edge + direction,
 *         so that the element can replay its animation on the next pass.
 *
 * Binding options (all optional):
 *  - idx: number   → index of the element in a v-for (for stagger delay).
 *  - step: number  → ms delay step per index (default 90).
 *  - delay: number → explicit ms delay, overrides idx*step.
 *  - threshold: number[] → IntersectionObserver thresholds (default [0, 0.15]).
 *  - rootMargin: string  → IO rootMargin (default '0px 0px -10% 0px').
 *  - visibleClass: string → class to add when visible (default 'is-visible').
 *  - noAnimClass: string  → class to add on up-scroll re-entry (default 'no-anim').
 *
 * Usage:
 *  <div
 *    class="resume-reveal"
 *    v-reveal="{ idx: i, step: 80 }"
 *  >
 *    Content here
 *  </div>
 *
 * CSS requirements:
 *  - Base state (e.g. .resume-reveal): define opacity/transform before visible.
 *  - .is-visible: final state with transitions.
 *  - .no-anim: disables transitions (use `transition: none !important`).
 *
 * Example CSS:
 *  .resume-reveal {
 *    opacity: 0;
 *    transform: translateY(14px);
 *    transition: opacity .5s, transform .5s;
 *  }
 *  .resume-reveal.is-visible {
 *    opacity: 1;
 *    transform: translateY(0);
 *  }
 *  .resume-reveal.no-anim {
 *    transition: none !important;
 *  }
 */

import type { DirectiveBinding } from 'vue'

type RevealOptions = {
  idx?: number            // index for stagger
  delay?: number          // custom delay in ms (overrides idx*step)
  step?: number           // default 90
  threshold?: number[]    // default [0, 0.15]
  rootMargin?: string     // default '0px 0px -10% 0px'
  visibleClass?: string   // default 'is-visible'
  noAnimClass?: string    // default 'no-anim'
}

type ElEx = HTMLElement & {
  __revealCleanup__?: () => void
}

let lastY = 0
let scrollDir: 'down' | 'up' = 'down'
let scrollAttached = false
const onScroll = () => {
  const y = window.scrollY || 0
  if (y > lastY) {
    scrollDir = 'down'
  } else if (y < lastY) {
    scrollDir = 'up'
  }
  lastY = y
}

function attachScrollListener() {
  if (scrollAttached) {
    return
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  scrollAttached = true
}
function detachScrollListener() {
  if (!scrollAttached) {
    return
  }
  window.removeEventListener('scroll', onScroll)
  scrollAttached = false
}

export const vReveal = {
  mounted(el: ElEx, binding: DirectiveBinding<RevealOptions>) {
    attachScrollListener()

    const opts = binding.value || {}
    const step = typeof opts.step === 'number' ? opts.step : 90
    const threshold = opts.threshold ?? [0, 0.15]
    const rootMargin = opts.rootMargin ?? '0px 0px -10% 0px'
    const visibleClass = opts.visibleClass ?? 'is-visible'
    const noAnimClass = opts.noAnimClass ?? 'no-anim'

    // Stagger
    const idx = typeof opts.idx === 'number' ? opts.idx : 0
    const delay = typeof opts.delay === 'number' ? opts.delay : idx * step
    if (delay && delay > 0) {
      el.style.transitionDelay = `${delay}ms`
    }

    el.dataset.idx = String(idx)

    // Fallback when IO not available
    if (!('IntersectionObserver' in window)) {
      el.classList.add(visibleClass)
      return
    }

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        // Enter
        if (entry.isIntersecting) {
          if (scrollDir === 'down') {
            el.classList.remove(noAnimClass)
            el.classList.add(visibleClass)
          } else {
            // Up
            el.classList.add(noAnimClass)
            el.classList.add(visibleClass)
            requestAnimationFrame(() => {
              el.classList.remove(noAnimClass)
            })
          }
        } else {
          // Exit. Hide depending on which edge is leaving based on direction
          if (scrollDir === 'down') {
            const topEdge = entry.rootBounds ? entry.rootBounds.top : 0
            if (entry.boundingClientRect.top <= topEdge) {
              el.classList.remove(visibleClass)
            }
          } else {
            const bottomEdge = entry.rootBounds ? entry.rootBounds.bottom : window.innerHeight
            if (entry.boundingClientRect.bottom >= bottomEdge) {
              el.classList.remove(visibleClass)
            }
          }
        }
      }
    }, { root: null, rootMargin, threshold })

    io.observe(el)

    el.__revealCleanup__ = () => {
      io.disconnect()
    }
  },

  unmounted(el: ElEx) {
    if (el.__revealCleanup__) { 
      el.__revealCleanup__()
      // Optional. If you register globally and use many instances, keep the scroll listener.
      // If you register locally and know when all are unmounted, you could call detachScrollListener().
      // detachScrollListener()
    }
  }
}
