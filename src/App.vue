<template>
  <div id="app">
    <NavBar />
    <Hero />
    <About />
    <Services />
    <Resume />
    <Contact />

    <FooterBar />
    <FLScrollTop />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Hero from "./components/Hero.vue";
import About from "./components/About.vue";
import Resume from "./components/Resume.vue";
import Services from "./components/Services.vue";
import Portfolio from "./components/Portfolio.vue";
import Contact from "./components/Contact.vue";
import FooterBar from "./components/FooterBar.vue";
import FLScrollTop from "./components/FLScrollTop.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Hero,
    About,
    Resume,
    Services,
    Portfolio,
    Contact,
    FooterBar,
    FLScrollTop,
  },
};
</script>

<style>
</style>