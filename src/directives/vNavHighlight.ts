import type { ObjectDirective, DirectiveBinding } from 'vue'

/**
 * Options for v-nav-highlight
 * ----------------------------
 * - linksSelector: CSS selector to find nav links (default: 'a[href^="#"]')
 * - activeClass: CSS class to apply to the active link (default: 'active')
 * - defaultHash: fallback hash if nothing is visible (default: '#hero')
 */
type Options = {
  linksSelector?: string
  activeClass?: string
  defaultHash?: string
}

type State = {
  opts: Required<Options>
  io: IntersectionObserver | null
  activeHash: string
}

export const vNavHighlight: ObjectDirective<HTMLElement, Options> = {
  mounted(el, binding: DirectiveBinding<Options>) {
    // Merge user options with defaults
    const opts: Required<Options> = {
      linksSelector: binding.value?.linksSelector ?? 'a[href^="#"]',
      activeClass: binding.value?.activeClass ?? 'active',
      defaultHash: binding.value?.defaultHash ?? '#hero',
    }

    // Grab all links inside the nav
    const links = Array.from(el.querySelectorAll<HTMLAnchorElement>(opts.linksSelector))

    // For each link, get the target section element by ID
    const sections = links
      .map(link => document.getElementById(link.getAttribute('href')?.slice(1) ?? ''))
      .filter((s): s is HTMLElement => !!s)

    // Store directive state on the element
    const state: State = { opts, io: null, activeHash: opts.defaultHash }
    ;(el as any)._navHighlight = state

    // Helper to apply active class to the correct link
    const setActive = (hash: string) => {
      state.activeHash = hash
      links.forEach(l => {
        if (l.getAttribute('href') === hash) l.classList.add(opts.activeClass)
        else l.classList.remove(opts.activeClass)
      })
    }

    // IntersectionObserver watches when sections come into view
    state.io = new IntersectionObserver(
      entries => {
        // Find the most visible section (highest intersectionRatio)
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          // Update active link if a section is visible
          setActive(`#${visible.target.id}`)
        } else if (window.scrollY < 120) {
          // Near the top → fallback to default hash
          setActive(opts.defaultHash)
        }
      },
      {
        root: null,
        // rootMargin shrinks/grows the "viewport" used for intersection checks
        rootMargin: '-40% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1], // trigger at different visibility levels
      }
    )

    // Start observing each section
    sections.forEach(sec => state.io!.observe(sec))
  },
  beforeUnmount(el) {
    // Cleanup observer when directive is unmounted
    const state: State | undefined = (el as any)._navHighlight
    if (state?.io) state.io.disconnect()
  }
}
