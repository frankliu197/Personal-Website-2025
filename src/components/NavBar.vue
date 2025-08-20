<template>
  <!-- wrapper so mobile overlay styles stay inside the component -->
  <div :class="['nav-root', { 'mobile-nav-active': isMobileOpen }]">
    <header id="header" class="header">
      <div class="container-xl">
        <a href="#hero" class="logo">
          <h1 class="sitename">DevFolio</h1>
        </a>

        <nav id="navmenu" class="navmenu">
          <ul ref="menuList">
            <li><a href="#hero" class="active">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>

            <!-- Dropdown -->
            <li class="dropdown">
              <a href="#">
                <span>Dropdown</span>
                <button class="toggle-dropdown" type="button" @click.prevent="toggleDropdown($event)" aria-label="Toggle submenu">
                  <!-- chevron icon -->
                  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M1.5 5l6.5 6 6.5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                </button>
              </a>
              <ul>
                <li><a href="#">Dropdown 1</a></li>

                <!-- Deep dropdown -->
                <li class="dropdown">
                  <a href="#">
                    <span>Deep Dropdown</span>
                    <button class="toggle-dropdown" type="button" @click.prevent="toggleDropdown($event)" aria-label="Toggle submenu">
                      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M1.5 5l6.5 6 6.5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                    </button>
                  </a>
                  <ul>
                    <li><a href="#">Deep Dropdown 1</a></li>
                    <li><a href="#">Deep Dropdown 2</a></li>
                    <li><a href="#">Deep Dropdown 3</a></li>
                    <li><a href="#">Deep Dropdown 4</a></li>
                    <li><a href="#">Deep Dropdown 5</a></li>
                  </ul>
                </li>

                <li><a href="#">Dropdown 2</a></li>
                <li><a href="#">Dropdown 3</a></li>
                <li><a href="#">Dropdown 4</a></li>
              </ul>
            </li>

            <li><a href="#contact">Contact</a></li>
          </ul>

          <!-- mobile hamburger -->
          <button class="mobile-nav-toggle" type="button" @click="toggleMobile" :aria-expanded="isMobileOpen.toString()" aria-controls="navmenu">
            <!-- burger icon -->
            <svg v-if="!isMobileOpen" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            <!-- close icon -->
            <svg v-else viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isMobileOpen: false,
    };
  },
  mounted() {
    // add shadow once scrolled like the template
    this.onScroll = () => {
      const h = this.$el.querySelector("#header");
      if (!h) return;
      if (window.scrollY > 10) h.classList.add("scrolled");
      else h.classList.remove("scrolled");
    };
    window.addEventListener("scroll", this.onScroll, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    toggleMobile() {
      this.isMobileOpen = !this.isMobileOpen;
    },
    toggleDropdown(e) {
      // works for both first-level and deep dropdowns on mobile
      // find the nearest LI.dropdown then its UL submenu
      const li = e.currentTarget.closest("li.dropdown");
      if (!li) return;
      const sub = li.querySelector(":scope > ul");
      if (!sub) return;
      sub.classList.toggle("dropdown-active");
    },
  },
};
</script>

<style lang="scss" scoped>
/* local variables to match the template look */
.header {
  /* header color set */
  --background-color: #000000;
  --default-color: #ffffff;
  --heading-color: #ffffff;
}

.navmenu {
  /* nav system tokens */
  --nav-font: "Poppins", sans-serif;
  --nav-color: #ffffff;
  --nav-hover-color: #ffffff;
  --nav-mobile-background-color: #ffffff;
  --nav-dropdown-background-color: #ffffff;
  --nav-dropdown-color: #212529;
  --nav-dropdown-hover-color: #0078ff;
}

/* layout helpers to mimic container-xl without Bootstrap */
.container-xl {
  max-width: 1200px;
  padding-inline: 16px;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* =========================
   Header
========================= */
.header {
  color: var(--default-color);
  background-color: var(--background-color);
  padding: 20px 0;
  transition: all 0.5s;
  z-index: 997;
  position: sticky;
  top: 0;

  &.scrolled {
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.1);
  }

  .logo {
    line-height: 1;
    display: flex;
    align-items: center;
    text-decoration: none;

    img {
      max-height: 32px;
      margin-right: 8px;
    }

    .sitename {
      font-size: 30px;
      margin: 0;
      font-weight: 700;
      color: var(--heading-color);
    }
  }
}

/* =========================
   Desktop Navigation
========================= */
@media (min-width: 1200px) {
  .navmenu {
    padding: 0;

    ul {
      margin: 0;
      padding: 0;
      display: flex;
      list-style: none;
      align-items: center;
    }

    li { position: relative; }

    > ul > li {
      white-space: nowrap;
      padding: 15px 14px;

      &:last-child { padding-right: 0; }
    }

    a {
      color: var(--nav-color);
      font-size: 15px;
      padding: 0 2px;
      font-family: var(--nav-font);
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;
      transition: 0.3s;
      position: relative;
      text-decoration: none;
    }

    /* underline hover effect */
    > ul > li > a::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -6px;
      left: 0;
      background-color: var(--nav-hover-color);
      visibility: hidden;
      width: 0;
      transition: all 0.3s ease-in-out;
    }

    a:hover::before,
    li:hover > a::before,
    .active::before {
      visibility: visible;
      width: 100%;
    }

    li:hover > a,
    .active {
      color: var(--nav-hover-color);
    }

    /* dropdown */
    .dropdown {
      > a {
        display: flex;
        align-items: center;
        gap: 6px;

        .toggle-dropdown {
          background: transparent;
          border: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          cursor: pointer;
          color: currentColor;
        }
      }

      ul {
        margin: 0;
        padding: 10px 0;
        background: var(--nav-dropdown-background-color);
        display: block;
        position: absolute;
        visibility: hidden;
        left: 14px;
        top: 130%;
        opacity: 0;
        transition: 0.3s;
        border-radius: 4px;
        z-index: 99;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
        list-style: none;

        li { min-width: 200px; }

        a {
          padding: 10px 20px;
          font-size: 15px;
          text-transform: none;
          color: var(--nav-dropdown-color);

          svg { width: 12px; height: 12px; }
        }

        a:hover,
        .active:hover,
        li:hover > a {
          color: var(--nav-dropdown-hover-color);
        }
      }

      &:hover > ul {
        opacity: 1;
        top: 100%;
        visibility: visible;
      }

      /* deep dropdown (desktop) */
      .dropdown {
        ul {
          top: 0;
          left: -90%;
          visibility: hidden;
        }

        &:hover > ul {
          opacity: 1;
          top: 0;
          left: -100%;
          visibility: visible;
        }
      }
    }

    .mobile-nav-toggle { display: none; }
  }
}

/* =========================
   Mobile Navigation
========================= */
@media (max-width: 1199px) {
  .navmenu {
    padding: 0;
    z-index: 9997;
    position: relative;

    .mobile-nav-toggle {
      color: var(--nav-color);
      background: transparent;
      border: 0;
      font-size: 28px;
      line-height: 0;
      margin-left: 8px;
      cursor: pointer;
      transition: color 0.3s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    ul {
      display: none;
      list-style: none;
      position: absolute;
      inset: 60px 20px 20px 20px;
      padding: 10px 0;
      margin: 0;
      border-radius: 6px;
      background-color: var(--nav-mobile-background-color);
      border: 1px solid color-mix(in srgb, #000, transparent 90%);
      box-shadow: none;
      overflow-y: auto;
      transition: 0.3s;
      z-index: 9998;
    }

    a {
      color: var(--nav-dropdown-color);
      padding: 10px 20px;
      font-family: var(--nav-font);
      font-size: 17px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;
      transition: 0.3s;
      text-decoration: none;

      .toggle-dropdown {
        margin-left: 6px;
        width: 30px;
        height: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: 0.3s;
        background-color: color-mix(in srgb, var(--nav-dropdown-hover-color), transparent 90%);

        &:hover {
          background-color: var(--nav-dropdown-hover-color);
          color: #fff;
        }
      }
    }

    a:hover,
    .active {
      color: var(--nav-dropdown-hover-color);
    }

    /* nested ul hidden by default on mobile */
    .dropdown > ul {
      position: static;
      display: none;
      z-index: 99;
      padding: 10px 0;
      margin: 10px 20px;
      background-color: var(--nav-dropdown-background-color);
      transition: all 0.5s ease-in-out;

      ul { background-color: rgba(33, 37, 41, 0.1); }
    }

    /* shown when toggled by JS */
    .dropdown > ul.dropdown-active {
      display: block;
      background-color: rgba(33, 37, 41, 0.03);
    }
  }

  /* full-screen overlay + slide-in menu container when menu open */
  .mobile-nav-active {
    overflow: hidden;

    .mobile-nav-toggle {
      color: #fff;
      position: absolute;
      font-size: 32px;
      top: 15px;
      right: 15px;
      z-index: 9999;
    }

    .navmenu {
      position: static;

      /* overlay */
      &::before {
        content: "";
        position: fixed;
        inset: 0;
        background: rgba(33, 37, 41, 0.8);
        z-index: 9996;
      }

      > ul {
        display: block;
      }
    }
  }
}
</style>
