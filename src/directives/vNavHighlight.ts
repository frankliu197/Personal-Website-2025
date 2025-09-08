import type { ObjectDirective, DirectiveBinding } from 'vue'

type Options = {
  linksSelector?: string
  activeClass?: string
  defaultHash?: string
  offsetPx?: number    // distance from top used as the reference line
}

type State = {
  opts: Required<Options>
  links: HTMLAnchorElement[]
  sections: HTMLElement[]
  ticking: boolean
  onScroll: () => void
  onResize: () => void
  ro?: ResizeObserver
}

function getHash(a: HTMLAnchorElement) {
  const href = a.getAttribute('href') || ''
  return href.startsWith('#') ? href : ''
}

export const vNavHighlight: ObjectDirective<HTMLElement, Options> = {
  mounted(el, binding: DirectiveBinding<Options>) {
    const opts: Required<Options> = {
      linksSelector: binding.value?.linksSelector ?? 'a[href^="#"]',
      activeClass: binding.value?.activeClass ?? 'active',
      defaultHash: binding.value?.defaultHash ?? '#hero',
      offsetPx: binding.value?.offsetPx ?? 100,  // tweak for your navbar height
    }

    const links = Array.from(
      el.querySelectorAll<HTMLAnchorElement>(opts.linksSelector)
    ).filter(a => !!getHash(a))

    const sections: HTMLElement[] = links
      .map(a => document.getElementById(getHash(a).slice(1) || ''))
      .filter((n): n is HTMLElement => !!n)

    // Pre-sort by document order (offsetTop ascending)
    sections.sort((a, b) => a.offsetTop - b.offsetTop)

    const state: State = {
      opts, links, sections, ticking: false,
      onScroll: () => {},
      onResize: () => {},
    }
    ;(el as any)._navHighlight = state

    const setActive = (hash: string) => {
      for (const a of links) {
        if (getHash(a) === hash) a.classList.add(opts.activeClass)
        else a.classList.remove(opts.activeClass)
      }
      // Sync mobile sheet links too (if you attached directive there as well)
    }

    const computeActive = () => {
      const line = window.scrollY + opts.offsetPx
      // Find the last section whose top is above the line
      let chosenHash = opts.defaultHash
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= line) {
          chosenHash = `#${sections[i].id}`
        } else {
          break
        }
      }
      setActive(chosenHash)
    }

    const raf = (fn: () => void) => {
      if (state.ticking) return
      state.ticking = true
      requestAnimationFrame(() => {
        state.ticking = false
        fn()
      })
    }

    state.onScroll = () => raf(computeActive)
    state.onResize = () => raf(() => {
      // Re-sort in case layout changed
      sections.sort((a, b) => a.offsetTop - b.offsetTop)
      computeActive()
    })

    window.addEventListener('scroll', state.onScroll, { passive: true })
    window.addEventListener('resize', state.onResize)

    // Keep positions up to date for content changes
    if ('ResizeObserver' in window) {
      state.ro = new ResizeObserver(() => state.onResize())
      sections.forEach(sec => state.ro!.observe(sec))
    }

    // Initial highlight
    computeActive()
  },

  beforeUnmount(el) {
    const state = (el as any)._navHighlight as State | undefined
    if (!state) return
    window.removeEventListener('scroll', state.onScroll)
    window.removeEventListener('resize', state.onResize)
    state.ro?.disconnect()
  }
}
