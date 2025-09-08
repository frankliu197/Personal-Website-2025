import type { ObjectDirective } from 'vue'

/**
 * v-lock-scroll
 * Locks scrolling when the bound value is truthy.
 *
 * Usage:
 *  - Lock the whole page (recommended for mobile sheets):
 *      <div v-lock-scroll.body="isMobileOpen">...</div>
 *  - Lock just this element's scroll:
 *      <div class="sheet" v-lock-scroll="isOpen">...</div>
 *
 * Modifier:
 *  - .body  → locks document.body instead of the element
 */
type Target = HTMLElement | HTMLBodyElement

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth
}

function applyLock(target: Target) {
  // Save originals so we can restore later
  const prevOverflow = target.style.overflow
  const prevPaddingRight = target.style.paddingRight

  // Prevent layout shift by compensating for the missing scrollbar
  const sbw = getScrollbarWidth()
  if (sbw > 0) target.style.paddingRight = `${sbw}px`

  target.style.overflow = 'hidden'

  // Store to restore on unlock
  ;(target as any)._lockScroll_prev = { prevOverflow, prevPaddingRight }

  // iOS inertia scroll guard
  const prevent = (e: TouchEvent) => e.preventDefault()
  document.addEventListener('touchmove', prevent, { passive: false })
  ;(target as any)._lockScroll_te = prevent
}

function removeLock(target: Target) {
  const saved = (target as any)._lockScroll_prev as
    | { prevOverflow: string; prevPaddingRight: string }
    | undefined

  if (saved) {
    target.style.overflow = saved.prevOverflow
    target.style.paddingRight = saved.prevPaddingRight
    ;(target as any)._lockScroll_prev = undefined
  } else {
    // fallback
    target.style.overflow = ''
    target.style.paddingRight = ''
  }

  const te = (target as any)._lockScroll_te as ((e: TouchEvent) => void) | undefined
  if (te) {
    document.removeEventListener('touchmove', te)
    ;(target as any)._lockScroll_te = undefined
  }
}

export const vLockScroll: ObjectDirective<HTMLElement, boolean> = {
  mounted(el, binding) {
    const target: Target = binding.modifiers.body ? document.body : el
    ;(el as any)._lockScroll_target = target

    if (binding.value) applyLock(target)
  },
  updated(el, binding) {
    const target: Target = (el as any)._lockScroll_target || (binding.modifiers.body ? document.body : el)
    const shouldLock = Boolean(binding.value)

    // Only toggle when value actually changes
    if (shouldLock && !(target as any)._lockScroll_prev) {
      applyLock(target)
    } else if (!shouldLock && (target as any)._lockScroll_prev) {
      removeLock(target)
    }
  },
  beforeUnmount(el) {
    const target: Target = (el as any)._lockScroll_target || el
    removeLock(target)
  }
}
